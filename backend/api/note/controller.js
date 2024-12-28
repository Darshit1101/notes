const service = require('./service');

module.exports = {
    addNote: async (req, res) => {
        const data = await service.addNote(req);
        res.status(data.status).send(data.data);
    },
    getAllNotes: async (req, res) => {
        const data = await service.getAllNotes(req);
        res.status(data.status).send(data.data);
    },
    deleteCard: async (req, res) => {
        const data = await service.deleteCard(req);
        res.status(data.status).send(data.data);
    },
    editNote: async (req, res) => {
        const data = await service.editNote(req);
        res.status(data.status).send(data.data);
    },

}
