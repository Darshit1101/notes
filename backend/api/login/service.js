// module.exports = {
//     createRegister: async (values) => {
//         try {
//             let { ti } = values.decoded;
//             let incentiveData = await modalForLogin.find({ ti: ti });
//             return ({ status: 200, data: { status: 'success', data: incentiveData } });
//         } catch (error) {
//             console.error('createRegister===>', error);
//             return ({ status: 200, data: { status: 'error', m: msgObj.ERROR } });
//         }
//     },
// }  