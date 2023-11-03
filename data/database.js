import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      dbName: "nodeApi",
    })
    .then((c) => console.log(`Database Connected ${c.connection.host}`))
    .catch((e) => console.log(e));
};
