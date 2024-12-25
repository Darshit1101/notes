module.exports = {
    addNote: async (values) => {
        try {
            const { tit, des, uid, ctr } = values.body;

            // Create a new note instance
            const newNote = new modalForNote({
                tit: tit,
                des: des,
                uid: uid,
                ctr: ctr,
                cdt: new Date(),
                upd: new Date(),
            });

            // Save the new note to the database
            await newNote.save();

            return ({
                status: 200,
                data: {
                    status: 'success',
                    m: 'Note added successfully'
                }
            });
        } catch (error) {
            console.error('addNote===>', error);
            return ({ status: 500, data: { status: 'error', m: msgObj.ERROR } });
        }
    },

    getAllNotes: async (values) => {
        try {
            const { uid } = values.body

            // Fetch all notes from the database    
            const notes = await modalForNote.find({ uid: uid }).sort({ cdt: -1 });

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
            const { id } = values.query;

            // Find and delete the note
            const d = await modalForNote.deleteOne({ _id: id });     //0 or 1 based on success or failure(sucess=>1, failure=>0)
            //or
            // await modalForNote.findByIdAndDelete(id);             //Deletes a document by its _id and also returns the deleted document.      

            return {
                status: 200,
                data: {
                    status: 'success',
                    m: 'Note deleted successfully',
                },
            };
        } catch (error) {
            console.log('deleteCard===>', error);
            return ({ status: 500, data: { status: 'error', m: msgObj.ERROR } });
        }
    }
}