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
    }
}


//main function for get notes
const getNotesByUserId = async (values) => {
    // console.log('values=====>', values)
    const { ti, ctr, num, srt, srhtxt } = values;  // Deconstruct values
    const PageNumber = Number(num)//convert string to number
    const query = { ti };
    const _sort = {};

    if (ctr) {
        query.ctr = ctr;  // Filter by category if provided
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
        query.$or = [
            { tit: { $regex: srhtxt, $options: "i" } },
            { des: { $regex: srhtxt, $options: "i" } },
        ];
    }
    console.log('query===>', query);

    //Pagination set
    let _pageNo = PageNumber;
    let _pageSize = env.PAGE_SIZE;
    let _skip = (parseInt(_pageNo) - 1) * parseInt(_pageSize);
    let _take = parseInt(_pageSize);

    const queryPromise = PageNumber
        ? modalForNote.find(query).skip(_skip).limit(_take).sort(_sort)
        : modalForNote.find(query).sort(_sort);

    // Fetch count and notes in parallel to optimize performance
    const [count, notes] = await Promise.all([
        modalForNote.countDocuments(query),
        queryPromise,
    ]);

    return { count, notes };
};
