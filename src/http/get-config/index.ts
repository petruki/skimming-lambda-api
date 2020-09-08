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
      url: process.env.APP_CONTEXT_ENDPOINT,
      files: process.env.APP_FILES.split(","),
      cacheDuration: `${process.env.APP_CACHE_EXP_DURATION}s`,
      cacheSize: process.env.APP_CACHE_SIZE
    })
  }
}