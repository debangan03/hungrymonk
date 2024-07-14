const mongoose = require("mongoose");

const conndb = (handler) => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    return handler(req, res);
  } else {
    mongoose.connect(`mongodb+srv://nandibibaswan19:klkbN79uuV8mKfrn@cluster0.rlr4xvv.mongodb.net/trial?retryWrites=true&w=majority&appName=Cluster0`);
    return handler(req, res);
  }
};
// comment
export default conndb;