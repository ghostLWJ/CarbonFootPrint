# CarbonFootPrint
University Topic Practice

## Requirements

* [NodeJs](http://nodejs.org) >= 0.10.36
* [mongodb](http://mongodb.org)

## Install

```sh
git clone https://github.com/ghostLWJ/CarbonFootPrint.git
npm install
```
**NOTE:** If npm install has node-gyp error please follow [node-gyp](https://github.com/nodejs/node-gyp#installation), if you get `'gulp-sourcemaps/map-sources' is not in the npm registry` please update your npm.

then

```sh
gulp dev
```

## Websocket
**NOTE:** Websocket only working for `HTTPS` protocol.

## How to use Admin account

1. First create your account
2. Then use mongodb shell(or use MongoDB GUI manager), `use carbonfootprint` and update `users` collections account.auth change to `admin`.
