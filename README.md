Victory Points Performance
==========================

Experiments for https://github.com/FormidableLabs/victory/issues/873

## Install

```
$ yarn
```

## Prod build

```
$ BABEL_ENV=production NODE_ENV=production yarn run prod
$ open dist/index.html
```

Then go to perfomance tab of dev console, select record and select a square of points in the demo page. Stop after about 4 seconds and view perf results.
