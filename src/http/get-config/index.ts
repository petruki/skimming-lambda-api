// import { APP_CONTEXT_ENDPOINT, APP_FILES, APP_CACHE_EXP_DURATION, APP_CACHE_SIZE } from "https://raw.githubusercontent.com/petruki/skimming-api/v1.0.1/src/config.ts";

export async function handler (req: object) {
  return {
    statusCode: 200,
    headers: {
      'content-type': 'application/json; charset=utf8',
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify({
      message: 'Success',
      deno: Deno.env()
    })
    // body: JSON.stringify({
    //   message: 'Success',
    //   url: APP_CONTEXT_ENDPOINT,
    //   files: APP_FILES.split(","),
    //   cacheDuration: `${APP_CACHE_EXP_DURATION}s`,
    //   cacheSize: APP_CACHE_SIZE
    // })
  }
}