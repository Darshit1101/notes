const { Parser } = require('json2csv');
const fs = require('fs');
const path = require('path');

module.exports = {
    addNote: async (values) => {
        try {
            let { ti } = values.decoded;
            const { tit, des, uid, ctr } = values.body;

            // Create a new note instance
            const newNote = new modalForNote({ tit, des, uid, ctr, cdt: new Date(), upd: new Date(), ti });

            // Save the new note to the database
            await newNote.save();

            //get all notes
            const { count, notes } = await getNotesByUserId({ ti });

            return ({
                status: 200,
                data: {
                    status: 'success',
                    m: 'Note added successfully',
                    data: notes,
                    count: count
                }
            });
        } catch (error) {
            console.error('addNote===>', error);
            return ({ status: 500, data: { status: 'error', m: msgObj.ERROR } });
        }
    },

    getAllNotes: async (values) => {
        try {
            const { ctr, num, srt, srhtxt } = values.body
            const { ti } = values.decoded
            const { count, notes } = await getNotesByUserId({ ti, ctr, num, srt, srhtxt });

            return {
                status: 200,
                data: {
                    status: 'success',
                    data: notes,
                    count: count
                },
            };
        } catch (error) {
            console.error('addNote===>', error);
            return ({ status: 500, data: { status: 'error', m: msgObj.ERROR } });
        }
    },

    deleteCard: async (values) => {
        try {
            const { ti } = values.decoded;
            const { id, num } = values.query;
            // Find and delete the note
            await modalForNote.deleteOne({ _id: id });     //0 or 1 based on success or failure(sucess=>1, failure=>0)
            //or
            // await modalForNote.findByIdAndDelete(id);   //Deletes a document by its _id and also returns the deleted document.      

            // Fetch all notes from the database
            const { count, notes } = await getNotesByUserId({ ti, num });

            return {
                status: 200,
                data: {
                    status: 'success',
                    m: 'Note deleted successfully',
                    data: notes,
                    count: count
                },
            };
        } catch (error) {
            console.log('deleteCard===>', error);
            return ({ status: 500, data: { status: 'error', m: msgObj.ERROR } });
        }
    },

    deleteBulkNotes: async (values) => {
        try {
            const { ti } = values.decoded;
            const { arr_id, typ } = values.body;

            if (typ == 'delete') {
                //remove data from mongoDB
                await modalForNote.deleteMany({ _id: { $in: arr_id } });
            }

            // Fetch all notes from the database
            const { count, notes } = await getNotesByUserId({ ti });

            return {
                status: 200,
                data: {
                    status: 'success',
                    m: 'Note deleted successfully',
                    data: notes,
                    count: count
                },
            };
        } catch (error) {
            console.log('deleteCard===>', error);
            return ({ status: 500, data: { status: 'error', m: msgObj.ERROR } });
        }
    },

    editNote: async (values) => {
        try {
            const { ti } = values.decoded;
            const { nid, tit, des, ctr } = values.body;
            await modalForNote.findByIdAndUpdate(nid, { tit, des, ctr, upd: new Date() });

            // Fetch all notes from the database
            const { count, notes } = await getNotesByUserId({ ti });

            return {
                status: 200,
                data: {
                    status: 'success',
                    m: 'Note updated successfully',
                    data: notes,
                    count: count
                },
            }
        }
        catch (error) {
            console.error('addNote===>', error);
            return ({ status: 500, data: { status: 'error', m: msgObj.ERROR } });
        }
    },
    exportNote: async (values) => {
        try {
            const { ti } = values.decoded;

            // get user review data
            let noteData = await modalForNote.find({ ti: ti }).sort({ cdt: -1 });
            // console.log('noteData', noteData);
            if (!noteData || noteData.length === 0) {
                return {
                    status: 404,
                    data: {
                        status: 'error',
                        m: 'No notes found',
                    },
                };
            }

            // Add index to each row
            noteData = noteData.map((note, index) => ({
                index: index + 1, // Start index from 1
                _id: note._id,
                tit: note.tit,
                des: note.des,
                ctr: note.ctr,
            }));

            // Convert JSON data to CSV format
            const fields = [
                { label: 'Index', value: 'index' },
                { label: 'Note ID', value: '_id' },
                { label: 'Title', value: 'tit' },
                { label: 'Description', value: 'des' },
                { label: 'Category', value: 'ctr' }
            ];
            const opts = { fields };
            const parser = new Parser(opts);
            const csv = parser.parse(noteData);

            // Define file path
            const exportDir = path.join(__dirname, 'exports');
            if (!fs.existsSync(exportDir)) {
                fs.mkdirSync(exportDir, { recursive: true });
            }
            const filePath = path.join(exportDir, `notes_${ti}.csv`);
            fs.writeFileSync(filePath, csv);

            return {
                status: 200,
                data: {
                    status: 'success',
                    m: 'CSV file generated successfully',
                    filePath,
                },
            }
        }
        catch (error) {
            console.error('exportNote===>', error);
            return ({ status: 500, data: { status: 'error', m: msgObj.ERROR } });
        }
    }
    // exportNote: async (values) => {
    //     try {
    //         const { ti } = values.decoded;

    //         // Get user review data
    //         let noteData = await modalForNote.find({ ti: ti }).sort({ cdt: -1 });

    //         if (!noteData || noteData.length === 0) {
    //             return {
    //                 status: 404,
    //                 data: {
    //                     status: 'error',
    //                     message: 'No notes found',
    //                 },
    //             };
    //         }

    //         // Add index to each row
    //         noteData = noteData.map((note, index) => ({
    //             index: index + 1, // Start index from 1
    //             _id: note._id,
    //             tit: note.tit,
    //             des: note.des,
    //             ctr: note.ctr,
    //         }));

    //         // Convert JSON data to CSV format
    //         const fields = [
    //             { label: 'Index', value: 'index' },
    //             { label: 'Note ID', value: '_id' },
    //             { label: 'Title', value: 'tit' },
    //             { label: 'Description', value: 'des' },
    //             { label: 'Category', value: 'ctr' }
    //         ];
    //         const opts = { fields };
    //         const parser = new Parser(opts);
    //         const csv = parser.parse(noteData);

    //         // Convert CSV data to Buffer (so it can be sent directly)
    //         const csvBuffer = Buffer.from(csv, 'utf-8');

    //         return {
    //             status: 200,
    //             data: {
    //                 status: 'success',
    //                 message: 'CSV file generated successfully',
    //                 filename: `notes_${ti}.csv`,
    //                 csvData: csvBuffer.toString('base64'), // Send as base64 string
    //             },
    //         };
    //     } catch (error) {
    //         console.error('exportNote===>', error);
    //         return {
    //             status: 500,
    //             data: {
    //                 status: 'error',
    //                 message: 'Internal server error',
    //             },
    //         };
    //     }
    // }
}

//main function for get notes
const getNotesByUserId = async (values) => {
    // console.log('values=====>', values)
    const { ti, ctr, num, srt, srhtxt } = values;  // Deconstruct values
    const PageNumber = Number(num)//convert string to number
    const _searchQRY = { ti };
    let _sort = {};

    if (ctr) {
        _searchQRY.ctr = ctr;  // Filter by category if provided
    }

    //sort filter condition 
    if (srt) {
        let sortAry = srt.split(" ");
        _sort[sortAry[0]] = JSON.parse(sortAry[1]);
    } else {
        _sort = { cdt: -1 };  // Default sorting by created date in descending order
    }

    //search filter condition
    if (srhtxt) {
        _searchQRY.$or = [
            { tit: { $regex: srhtxt, $options: "i" } },
            { des: { $regex: srhtxt, $options: "i" } },
        ];
    }
    // console.log('_searchQRY===>', _searchQRY);
    // console.log('_sort===>', _sort);

    //Pagination set
    let _pageNo = PageNumber;
    let _pageSize = env.PAGE_SIZE;
    let _skip = (parseInt(_pageNo) - 1) * parseInt(_pageSize);
    let _take = parseInt(_pageSize);

    const queryPromise = PageNumber
        ? modalForNote.find(_searchQRY).skip(_skip).limit(_take).sort(_sort)
        : modalForNote.find(_searchQRY).sort(_sort);

    // Fetch count and notes in parallel to optimize performance
    const [count, notes] = await Promise.all([
        modalForNote.countDocuments(_searchQRY),
        queryPromise,
    ]);

    return { count, notes };
};
