import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

mongoose.set("strictQuery", true);
main().catch((err) => console.log(err));

async function main() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@nodetest.6ijfjtm.mongodb.net/?retryWrites=true&w=majority`,
    );
    console.log("Conectado ao MongoDB");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
    process.exit(1);
  }
}

export default main;
