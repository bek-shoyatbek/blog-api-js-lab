import { DataSource } from "typeorm";
import { dbConfig } from "../configs";

export const AppDataSource = new DataSource(dbConfig);

export const initializeDataSource = async () => {
  try {
    const result = await AppDataSource.initialize();

    console.log("Data Source has been initialized!");
  } catch (err) {
    console.error("Error while initializing DataSource: ", err);
  }
};
