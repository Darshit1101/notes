const profileService = require('./service');

module.exports = {
  getProfile: async (req, res) => {
    const data = await profileService.getProfile(req);
    res.status(data.status).send(data.data);
  },
}