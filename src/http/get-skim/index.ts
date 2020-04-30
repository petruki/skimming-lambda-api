import Skimming from "https://raw.githubusercontent.com/petruki/skimming/v1.0.3/mod.ts";
import getBool from "https://raw.githubusercontent.com/petruki/skimming-api/v1.0.0/src/helpers/index.ts";
import { 
  APP_CACHE_EXP_DURATION, 
  APP_CACHE_SIZE, 
  APP_CONTEXT_ENDPOINT, 
  APP_FILES } from "https://raw.githubusercontent.com/petruki/skimming-api/v1.0.0/src/config.ts";

const headers =  {
  'content-type': 'application/json; charset=utf8',
  'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
  "Access-Control-Allow-Origin": "*"
}

const skimmer = new Skimming({ expireDuration: APP_CACHE_EXP_DURATION, size: APP_CACHE_SIZE });

export async function handler (req: any) {
  try {
    const query = req.queryStringParameters.query;
    const url = req.queryStringParameters.url || APP_CONTEXT_ENDPOINT;
    const queryFiles = req.queryStringParameters.files || '';

    const files = queryFiles ? queryFiles.split(",") : APP_FILES.split(",");
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