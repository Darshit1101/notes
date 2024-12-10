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
            const savedNote = await newNote.save();

            return ({
                status: 200,
                data: {
                    status: 'success',
                    data: savedNote
                }
            });
        } catch (error) {
            console.error('addNote===>', error);
            return ({ status: 500, data: { status: 'error', m: msgObj.ERROR } });
        }
    },

    getAllNotes: async (values) => {
        try {
            // Fetch all notes from the database    
            const notes = await modalForNote.find({});

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
