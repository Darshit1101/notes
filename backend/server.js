require('./config/global');
require('./collection/index');//routes

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`listening on ${PORT}...`);
});