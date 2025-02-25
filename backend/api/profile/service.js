const passwordService = require('../../service/passwordService');

module.exports = {
  getProfile: async (values) => {
    // const uid = values.query;
    const { ti } = values.decoded;

    try {
      // Find the user in the database
      // const user = await modalForLogin.findOne({ _id: new mongoose.Types.ObjectId(uid) });
      const user = await modalForLogin.findOne({ ti: ti });

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

  // change password API 
  cPwd: async (values) => {
    const { ti } = values.decoded;
    const { opd, pd } = values.body;

    try {
      //  convert both password in plain text
      const plainOpd = await passwordService.decryptPwd(opd);
      const plainPwd = await passwordService.decryptPwd(pd);

      // find user by id        
      const objData = await modalForLogin.findOne({ ti: ti });
      if (!objData) return ({ status: 200, data: { status: 'not_found', m: msgObj.USER_NOT_FOUND } });

      //  compare old password with db hash password by userId
      const boolPass = await passwordService.comparePwd(plainOpd, objData.pd);
      if (!boolPass) return ({ status: 200, data: { status: 'not_found', m: msgObj.PWD_NOT_MATCH } });

      //  create new password hash key
      const hashPwd = await passwordService.createHashPwd(plainPwd);
      await modalForLogin.updateOne({ ti: ti }, {
        $set: {
          pd: hashPwd,
          udt: new Date(),
        }
      });

      // increment password change version: this is only use for track password change frequency
      await modalForLogin.updateOne({ ti: ti }, { $inc: { pver: 1 } });

      return ({ status: 200, data: { status: 'success', m: 'update successfully' } });
    }
    catch (e) {
      console.error('cPwd========>', e);
      // addErrorLog(values.decoded.uk, "/profile/cPwd", e.toString(), e.message ? e.message : e.toString());
      return ({ status: 200, data: { status: "success", m: 'error' } });
    }
  },
}