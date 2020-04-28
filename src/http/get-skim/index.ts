import Skimming from "https://raw.githubusercontent.com/petruki/skimming/v1.0.1/mod.ts";
import { Output } from "https://raw.githubusercontent.com/petruki/skimming/v1.0.1/src/lib/types.ts";
import { APP_CACHE_EXP_DURATION, APP_CACHE_SIZE } from "https://raw.githubusercontent.com/petruki/skimming-api/v1.0.0/src/config.ts";

const headers =  {
  'content-type': 'application/json; charset=utf8',
  'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
  "Access-Control-Allow-Origin": "*"
}

const skimmer = new Skimming({ expireDuration: APP_CACHE_EXP_DURATION, size: APP_CACHE_SIZE });

export async function handler (req: any) {
  try {
    
    // const query = req.searchParams.get('query');
    // const url = req.searchParams.get('url') || APP_CONTEXT_ENDPOINT;
    // const queryFiles = req.searchParams.get('files') || '';

    // const skimContext = {
    //   url,
    //   files,
    // };
  
    // skimmer.useCache = !skipCache;
    // skimmer.setContext(skimContext);
    // const results = await skimmer.skim(query, {
    //   previewLength,
    //   ignoreCase,
    //   trimContent,
    //   regex
    // });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({req})
    }
  } catch (e) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: `Something went wrong - ${e.message}` })
    }
  }
}