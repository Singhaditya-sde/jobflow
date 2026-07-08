import "dotenv/config";

function required(name: string): string {
  const value = process.env[name];

  if(!value) {
    throw new Error(`Missing required enviroment variables: ${name}`);
  }
  return value;
}

export const env = {
  redis: {
    host: required("REDIS_HOST"),
    port: Number(required("REDIS_PORT")),
  },

  Worker: {
    pollInterval: Number(process.env.pollInterval ?? 1000),
  },
} as const;