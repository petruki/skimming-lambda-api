[![Build Status](https://travis-ci.com/petruki/skimming.svg?branch=master)](https://travis-ci.com/github/petruki/skimming)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# `Skimming Lambda API `

Skimming Lambda API is a Lambda API that uses [Skimming](https://github.com/petruki/skimming) module made for Deno to deliver a simple and efficient search engine.

## Usage

### Lockup API info
```
Request (GET)
{{url}}/config
```
**Sample response**
```json
{
    "message": "Success",
    "url": "https://raw.githubusercontent.com/petruki/skimming/master/",
    "files": [
        "README.md"
    ],
    "cacheDuration": "60s",
    "cacheSize": 100
}
```

### Invoking API - Local configuration
```
Request (GET)
{{url}}/skim?query=Usage&previewLength=-1&ignoreCase=false&trimContent=true
```
 - query: value to search
 - previewLength: ength of the content to be displayed
   - When 0: it display only the query value
   - When -1: it display the content until its first found line break
 - ignoreCase: ignore case
 - trimContent: prettify the content, basically
 - regex: enable regular expression searching method
 - skipCache: skip cache
 
**Sample response**
```json
{
    "message": "Success",
    "query": "Sk",
    "result": [
        {
            "file": "README.md",
            "segment": [
                "Skimming is a data fetcher for Deno. The idea is to provide a simple and efficient module to fetch content.",
                "Skimming from \"https://raw.githubusercontent.com/petruki/skimming/v1.0.0/mod.ts\";",
                "Skimming({ expireDuration: 10, size: 10 });"
            ],
            "found": 3,
            "cache": true
        }
    ]
}
```

### Invoking API - External content
```
Request (GET)
{{url}}/skim?url=https://deno.land/std/&files=manual.md
```
 - url: Endpoint to be fetched
 - files: artifacts to be fetched