const redis = require("redis");
const dotenv = require("dotenv");

dotenv.config();

const client = redis.createClient({
  url: `redis://admin:${process.env.REDIS_PWD}@redis-12926.c264.ap-south-1-1.ec2.cloud.redislabs.com:12926`,
});

client.connect();

client.on("connect", () => {
  console.log("Client Connected to redis...");
});

client.on("ready", () => {
  console.log("Client is ready to be used");
});

client.on("error", (err) => {
  console.log(`Encountered error while connecting to redis: ${err.message}`);
});

client.on("end", () => {
  console.log(`Client disconnected from redis`);
});

process.on("SIGINT", () => {
  client.quit();
});

module.exports = client;
