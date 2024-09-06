import mongoose from "mongoose";

const dbConnection = () => {
  mongoose.connect('mongodb+srv://marwa:te7ZGFmgJuKw09z3@cluster0.8wbj9.mongodb.net/e-commerceApi?retryWrites=true&w=majority')
    .then(() => {
      console.log(`mongodb connected to ${process.env.DB}`);
    })
}

export default dbConnection;