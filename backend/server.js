require('./config/global');
require('./collection/index');//modal
require('./config/route')//route

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`listening on ${PORT}...`);
});
