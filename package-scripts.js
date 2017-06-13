const { series, crossEnv, rimraf } = require("nps-utils") // eslint-disable-line import/no-extraneous-dependencies

module.exports = {
    scripts: {
        default: "nps webpack",
        test: {
            default: "nps test.karma",
            karma: {
                default: series(
                    rimraf("test/coverage-karma"),
                    crossEnv("NODE_ENV=development karma start test/karma.conf.js")),
                debug: crossEnv("NODE_ENV=development karma start test/karma.conf.js --auto-watch --no-single-run --debug"),
            },
        },
        build: "nps webpack.build",
        webpack: {
            default: "nps webpack.server",
            build: {
                before: rimraf("dist"),
                default: "nps webpack.build.production",
                development: {
                    default: series(
                        "nps webpack.build.before",
                        crossEnv("NODE_ENV=development webpack --progress -d")),
                    serve: series.nps(
                        "webpack.build.development",
                        "serve"),
                },
                production: {
                    default: series(
                        "nps webpack.build.before",
                        crossEnv("NODE_ENV=production webpack --progress -p --env.production --env.extractCss")),
                },
            },
            server: {
                default: "NODE_ENV=development webpack-dev-server -d --devtool '#source-map' --inline --env.server",
            },
        },
        lint: {
            default: "eslint src",
            fix: "eslint src --fix",
        },
        serve: "http-server dist --cors",
    },
}