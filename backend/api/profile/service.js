module.exports = {
  getProfile: async (values) => {
    const userId = values.query;
    try {
      // Find the user in the database
      const user = await modalForLogin.findOne({ _id: new mongoose.Types.ObjectId(userId) });

      // Create the Profile object with the user data
      const Profile = {
        fn: user.fn,
        e: user.e,
      };
      
      return ({ status: 200, data: { status: 'success', data: Profile } });
    }
    catch (e) {
      console.log('e==========profile=====>', e);
      return ({ status: 500, data: { status: 'error', m: msgObj.ERROR } });
    }
  },
}