const service = require('./service');

module.exports = {
    createRegister: async (req, res) => {
        const data = await service.createRegister(req);
        res.status(data.status).send(data.data);
    },
}