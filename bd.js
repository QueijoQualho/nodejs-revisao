import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.set("strictQuery", true);
main().catch((err) => console.log(err));

/* `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@nodetest.6ijfjtm.mongodb.net/?retryWrites=true&w=majority` */

async function main() {
  try {
    await mongoose.connect(
      `mongodb://localhost:27017/test`
    );
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
    process.exit(1);
  }
}

export default main;
