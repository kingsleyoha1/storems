const redis = require('redis');


async function loadClient() {
  const client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);
  await client.connect()

  // Handle Redis connection errors
  client.on('error', (error) => {
    console.error('Redis connection error:', error);
  });

  return client;
}

module.exports = loadClient;