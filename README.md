# dist.paramorphism.dev

A simple proxy server to use with alloc.tech. It uses the `/v1/pub` endpoint and passes along the requester's IP to the alloc.tech distribution server. This ensures correct functionality of Alloc's user-sharing detection, as otherwise every end user's IP would be logged as the IP of the proxy server.

## Usage

```bash
$ yarn install
$ yarn build
$ $EDITOR .env # Specify your alloc.tech API key and the target application's identifier
$
$ node build/index.js
```
