import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

const initDb = async () => {
  try {
    mongoose.set("strictQuery", false);
<<<<<<< HEAD
    console.log(uri);
    await mongoose.connect(uri, { dbName: "cine-app" });
=======
    await mongoose.connect(uri, { dbName: "test" });
>>>>>>> 570aceb6903f16c979d0a70c3c04a17604f13125
    console.log("Database connected");
  } catch (e) {
    console.log("oh oh problem : ", e.message);
  }
};

export default initDb;
