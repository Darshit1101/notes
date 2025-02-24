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

            //create auth token
            let token = await createAuthToken(registerData);

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

            //create auth token
            let token = await createAuthToken(user);

            return ({
                status: 200,
                data: {
                    status: 'success',
                    data: {
                        t: token,
                        e: user.e.toLowerCase(),
                        fn: user.fn,
                        id: user._id,
                        ti: user.ti
                    }
                }
            });
        } catch (error) {
            console.error('createLogin===>', error);
            return ({ status: 500, data: { status: 'error', m: msgObj.ERROR } });
        }
    },

    deleteAccount: async (values) => {
        const { ti } = values.decoded;

        //delete account function
        deleteAccountFunction(ti)

        return ({ status: 200, data: { status: "success" } });
    },
}


// delete account function
const deleteAccountFunction = async function (ti) {
    try {

        //delete user from login collection
        await modalForLogin.deleteOne({ ti: ti });

        //delete user note collection
        // await modalForNote.deleteMany({ ti: ti });

    } catch (e) {
        console.log('account===delete====error===>', JSON.stringify(e));
    }
}