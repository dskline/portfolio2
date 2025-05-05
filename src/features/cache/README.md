# Feature: cache

As a developer, I want to cache data and API responses to improve performance and reduce redundant network requests in the application.

### Must Haves
- Cache API responses or computed data to reduce load times and server requests
- Generous free tier

## Implementation Details

Upstash is a server caching platform with Vercel integration and a generous free tier (currently 500k commands per month).

## Environment Variables

These variables are all required and generated when creating an Upstash/Redis integration with Vercel:

KV_URL
KV_REST_API_READ_ONLY_TOKEN
REDIS_URL
KV_REST_API_TOKEN
KV_REST_API_URL

## Dependencies
- [@upstash/redis](https://github.com/upstash/redis-js#readme) library being used for the server cache
