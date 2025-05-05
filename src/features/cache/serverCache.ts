import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

const setValue = async <T>(key: string, value: T) => {
  return await redis.set(key, value);
};

const getValue = async <T>(key: string) => {
  return await redis.get<T>(key);
};

export const serverCache = {
  getValue,
  setValue,
};
