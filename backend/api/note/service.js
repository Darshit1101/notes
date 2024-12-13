module.exports = {
    addNote: async (values) => {
        try {
            const { tit, des, uid, tag } = values.body;

            // Create a new note instance
            const newNote = new modalForNote({
                tit: tit,
                des: des,
                uid: uid,
                tag: tag,
                cdt: new Date(),
                upd: new Date(),
            });

            // Save the new note to the database
            await newNote.save();

            return ({
                status: 200,
                data: {
                    status: 'success',
                    m: 'Add this note'
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
            const notes = await modalForNote.find({ uid: uid });

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
    }
}
