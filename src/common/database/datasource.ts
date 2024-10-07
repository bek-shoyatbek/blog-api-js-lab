import { DataSource } from "typeorm";
import { dbConfig, testDbConfig } from "../configs";

export const AppDataSource = new DataSource(dbConfig);

export const initializeDataSource = async () => {
  try {
    const result = await AppDataSource.initialize();

    console.log("Data Source has been initialized!");
  } catch (err) {
    console.error("Error while initializing DataSource: ", err);
  }
};

export const TestDateSource = new DataSource(testDbConfig);

export const initializeTestDataSource = async () => {
  try {
    const result = await TestDateSource.initialize();

    console.log("Test Data Source has been initialized!");
  } catch (err) {
    console.error("Error while initializing TestDataSource: ", err);
  }
};
