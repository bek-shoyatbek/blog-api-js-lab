import { app } from "./app";
import { appConfig } from "./common/configs";
import { initializeDataSource } from "./common/database/datasource";

app.listen(appConfig.port, async () => {
  await initializeDataSource();
  console.log(`Server running on port ${appConfig.port}`);
});
