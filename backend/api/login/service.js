const passwordService = require('../../service/passwordService')
const uniqid = require('uniqid');

module.exports = {
    createRegister: async (values) => {
        try {
            let registerObj = values.body;

            // Check if the email already exists
            const existingUser = await modalForLogin.findOne({ e: registerObj.e });
            if (existingUser) {
                return { status: 400, data: { status: 'error', m: msgObj.EMAIL_ALREADY_REGISTERED } };
            }

            // Hash the password before saving it
            if (registerObj.pd) {
                registerObj.pd = await passwordService.createHashPwd(registerObj.pd); // Hash the password
            }

            // Generate a unique tracking id
            if (registerObj) {
                registerObj.ti = uniqid();
            }

            let registerData = new modalForLogin(registerObj); // Create a new user document
            await registerData.save(); // Save the user to the database

            // Generate JWT token
            const token = jwt.sign({ ti: registerObj.ti, id: registerData._id, email: registerData.e }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRE_TIME });

            return ({
                status: 200,
                data: {
                    status: 'success',
                    data: {
                        t: token,
                        e: registerData.e.toLowerCase(),
                        fn: registerData.fn,
                        id: registerData._id,
                        ti: registerData.ti
                    }
                }
            });
        } catch (error) {
            console.error('createRegister===>', error);
            return ({ status: 500, data: { status: 'error', m: msgObj.ERROR } });
        }
    },

    createLogin: async (values) => {
        try {
            const { e: email, pd: password } = values.body;

            // Find the user in the database
            const user = await modalForLogin.findOne({ e: email });
            if (!user) {
                return { status: 404, data: { status: 'error', m: msgObj.LOGIN_USER_NOT_FOUND } };
            }

            // Validate password using comparePwd
            const isPasswordValid = await passwordService.comparePwd(password, user.pd);
            if (!isPasswordValid) {
                return { status: 401, data: { status: 'error', m: msgObj.INVALID_CREDENTIALS } };
            }

            // Generate JWT token
            const token = jwt.sign({ id: user._id, email: user.e }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRE_TIME });

            return ({
                status: 200,
                data: {
                    status: 'success',
                    data: {
                        t: token,
                        e: user.e.toLowerCase(),
                        fn: user.fn,
                        id: user._id,
                    }
                }
            });
        } catch (error) {
            console.error('createLogin===>', error);
            return ({ status: 500, data: { status: 'error', m: msgObj.ERROR } });
        }
    },
}
