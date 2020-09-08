@app
skimming-lambda-api

@aws
runtime deno

@http
get /
get /config
get /skim

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
