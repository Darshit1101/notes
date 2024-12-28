module.exports = {
    addNote: async (values) => {
        try {
            const { tit, des, uid, ctr } = values.body;

            // Create a new note instance
            const newNote = new modalForNote({ tit, des, uid, ctr, cdt: new Date(), upd: new Date() });

            // Save the new note to the database
            await newNote.save();

            //get all notes
            const notes = await getNotesByUserId(uid);

            return ({
                status: 200,
                data: {
                    status: 'success',
                    m: 'Note added successfully',
                    data: notes
                }
            });
        } catch (error) {
            console.error('addNote===>', error);
            return ({ status: 500, data: { status: 'error', m: msgObj.ERROR } });
        }
    },

    getAllNotes: async (values) => {
        try {
            const { uid, ctr } = values.body

            const query = { uid }; // Start with filtering by user ID (Default)
            if (ctr) {
                query.ctr = ctr; // Add category filter if provided
            }

            // Fetch all notes from the database or category wise    
            const notes = await modalForNote.find(query).sort({ cdt: -1 });

            return {
                status: 200,
                data: {
                    status: 'success',
                    data: notes,
                },
            };
        } catch (error) {
            console.error('addNote===>', error);
            return ({ status: 500, data: { status: 'error', m: msgObj.ERROR } });
        }
    },

    deleteCard: async (values) => {
        try {
            const { id, uid } = values.query;
            // Find and delete the note
            await modalForNote.deleteOne({ _id: id });     //0 or 1 based on success or failure(sucess=>1, failure=>0)
            //or
            // await modalForNote.findByIdAndDelete(id);   //Deletes a document by its _id and also returns the deleted document.      

            // Fetch all notes from the database
            const notes = await getNotesByUserId(uid);

            return {
                status: 200,
                data: {
                    status: 'success',
                    m: 'Note deleted successfully',
                    data: notes,
                },
            };
        } catch (error) {
            console.log('deleteCard===>', error);
            return ({ status: 500, data: { status: 'error', m: msgObj.ERROR } });
        }
    },

    editNote: async (values) => {
        try {
            const { uid, nid, tit, des, ctr } = values.body;
            await modalForNote.findByIdAndUpdate(nid, { tit, des, ctr, upd: new Date() });

            // Fetch all notes from the database
            const notes = await getNotesByUserId(uid);

            return {
                status: 200,
                data: {
                    status: 'success',
                    m: 'Note updated successfully',
                    data: notes
                },
            }
        }
        catch (error) {
            console.error('addNote===>', error);
            return ({ status: 500, data: { status: 'error', m: msgObj.ERROR } });
        }
    }
}

const getNotesByUserId = async (uid) => {
    return await modalForNote.find({ uid }).sort({ cdt: -1 });
};
