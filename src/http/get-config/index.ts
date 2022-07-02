// deno-lint-ignore require-await
export async function handler() {
  return {
    statusCode: 200,
    headers: {
      'content-type': 'application/json; charset=utf8',
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify({
      message: 'Success',
      deno: Deno.version.deno,
      url: Deno.env.toObject().APP_CONTEXT_ENDPOINT,
      files: Deno.env.toObject().APP_FILES.split(","),
      cacheDuration: `${Deno.env.toObject().APP_CACHE_EXP_DURATION}s`,
      cacheSize: Deno.env.toObject().APP_CACHE_SIZE
    })
  }
}