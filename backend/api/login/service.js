module.exports = {
    createRegister: async (values) => {
        try {
            let registerObj = values.body;
            let registerData = new modalForLogin(registerObj);
            await registerData.save();
            return ({ status: 200, data: { status: 'success', m: msgObj.REGISTRATION_SUCCESS } });
        } catch (error) {
            console.error('createRegister===>', error);
            return ({ status: 200, data: { status: 'error', m: msgObj.ERROR } });
        }
    },
}  