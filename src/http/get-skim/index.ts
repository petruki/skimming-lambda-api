import { Skimming } from "https://deno.land/x/skimming/mod.ts";

const headers =  {
  'content-type': 'application/json; charset=utf8',
  'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
  "Access-Control-Allow-Origin": "*"
};

const skimmer = new Skimming(
  { 
    expireDuration: parseInt(Deno.env.toObject().APP_CACHE_EXP_DURATION), 
    size: parseInt(Deno.env.toObject().APP_CACHE_SIZE) 
  }
);

export async function handler (req: any) {
  try {
    const query = req.queryStringParameters.query;
    const url = req.queryStringParameters.url || Deno.env.toObject().APP_CONTEXT_ENDPOINT;
    const queryFiles = req.queryStringParameters.files || '';

    const files = queryFiles ? queryFiles.split(",") : Deno.env.toObject().APP_FILES.split(",");
    const previewLength = parseInt(req.queryStringParameters.previewLength || 200);
    const ignoreCase = getBool(req.queryStringParameters.ignoreCase, true);
    const trimContent = getBool(req.queryStringParameters.trimContent, true);
    const regex = getBool(req.queryStringParameters.regex, false);
    const skipCache = getBool(req.queryStringParameters.skipCache, false);

    const skimContext = {
      url,
      files,
    };
  
    skimmer.useCache = !skipCache;
    skimmer.setContext(skimContext);
    const results = await skimmer.skim(query, {
      previewLength,
      ignoreCase,
      trimContent,
      regex
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(
        {
          message: 'Success',
          query: query,
          result: results
        })
    }
  } catch (e) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: `Something went wrong - ${e.message}` })
    }
  }
}

function getBool(value: any, _default: boolean): boolean {

  if (value === null || value === "") {
    return _default;
  }

  if (value === "true") {
    return true;
  }

  return false;
}
