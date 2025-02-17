require('./config/global');
require('./collection/index');//modal
require('./config/route')//route
require('./config/middleware');//middleware (checkAuth)

// Start the server...
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
