module.exports = {
  getProfile: async (values) => {
    const { _id: id, } = values.body;
    let Profile
    try {
      profile = 10
      console.log('prodile==========:', profile);
      console.log('id==========:', values.body);
      return ({ status: 200, data: { status: 'success', data: Profile } });
    }
    catch (e) {
      console.log('e==========profile=====>', e);
      return ({ status: 500, data: { status: 'error', m: msgObj.ERROR } });
    }
  },
}