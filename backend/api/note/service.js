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
            const { totalCount, notes } = await getNotesByUserId({ ti });

            return ({
                status: 200,
                data: {
                    status: 'success',
                    m: 'Note added successfully',
                    data: notes,
                    Count: totalCount
                }
            });
        } catch (error) {
            console.error('addNote===>', error);
            return ({ status: 500, data: { status: 'error', m: msgObj.ERROR } });
        }
    },

    getAllNotes: async (values) => {
        try {
            const { ctr } = values.body
            const { ti } = values.decoded
            const { totalCount, notes } = await getNotesByUserId({ ti, ctr });

            return {
                status: 200,
                data: {
                    status: 'success',
                    data: notes,
                    Count: totalCount
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
            const { id } = values.query;
            // Find and delete the note
            await modalForNote.deleteOne({ _id: id });     //0 or 1 based on success or failure(sucess=>1, failure=>0)
            //or
            // await modalForNote.findByIdAndDelete(id);   //Deletes a document by its _id and also returns the deleted document.      

            // Fetch all notes from the database
            const { totalCount, notes } = await getNotesByUserId({ ti });

            return {
                status: 200,
                data: {
                    status: 'success',
                    m: 'Note deleted successfully',
                    data: notes,
                    Count: totalCount
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
            const { totalCount, notes } = await getNotesByUserId({ ti });

            return {
                status: 200,
                data: {
                    status: 'success',
                    m: 'Note updated successfully',
                    data: notes,
                    Count: totalCount
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
    console.log('values=====>', values)
    const { ti, ctr } = values;  // Deconstruct values

    const query = { ti };
    if (ctr) {
        query.ctr = ctr;  // Filter by category if provided
    }
    console.log('query=====>', query)

    // Fetch count and notes in parallel to optimize performance
    const [totalCount, notes] = await Promise.all([
        modalForNote.countDocuments(query),
        modalForNote.find(query).sort({ cdt: -1 }),
    ]);

    return { totalCount, notes };
};
