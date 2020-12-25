const http = require("http");
const { config } = require("./config");
const mongo = require("./db");
const { logger } = require("./logger");

/**
 * Unhandled exceptions
 */
process.on("unhandledRejection", async (reason, _promise) => {
  logger.fatal("[Process] Unhandled Promise Rejection:", reason);
  await mongo.close();
  process.exit(1);
});

process.on("SIGINT", async (error) => {
  logger.fatal("[Process] Uncaught Exception:", error);
  await mongo.close();
  process.exit(1);
});

/**
 * Run HTTP server
 */
const { createExpressApp } = require("./server");

async function run() {
  try {
    await mongo.connect();

    const app = await createExpressApp();
    const server = http.createServer(app);
    server.listen(config.PORT, async function () {
      logger.info("API server started on port", config.PORT);
    });
  } catch (error) {
    logger.fatal("An error occurred during startup:");
    logger.fatal(error);

    await mongo.close();
    process.exit(1);
  }
}

run();
