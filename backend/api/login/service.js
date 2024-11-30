const passwordService = require('../../service/passwordService')

module.exports = {
    createRegister: async (values) => {
        try {
            let registerObj = values.body;
            // Hash the password before saving it
            if (registerObj.pd) {
                registerObj.pd = passwordService.createHashPwd(registerObj.pd); // Hash the password
            }
            let registerData = new modalForLogin(registerObj); // Create a new user document
            await registerData.save(); // Save the user to the database
            return ({ status: 200, data: { status: 'success', m: msgObj.REGISTRATION_SUCCESS } });
        } catch (error) {
            console.error('createRegister===>', error);
            return ({ status: 200, data: { status: 'error', m: msgObj.ERROR } });
        }
    },

    createLogin: async (values) => {
        try {
            const { e: email, pd: password } = values.body;
            // Find the user in the database
            const user = await modalForLogin.findOne({ e: email });
            if (!user) {
                return { status: 404, data: { status: 'error', m: 'User not found.' } };
            }
            return ({ status: 200, data: { status: 'success', m: msgObj.LOGIN_SUCCESS } });
        } catch (error) {
            console.error('createLogin===>', error);
            return ({ status: 200, data: { status: 'error', m: msgObj.ERROR } });
        }
    },
}
