@app
skimming-lambda-api

@http
get /
get /config
get /skim

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
