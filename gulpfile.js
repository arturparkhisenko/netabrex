const browserSync = require('browser-sync');
const cssnano = require('cssnano');
const del = require('del');
const { dest, parallel, series, src, watch } = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const path = require('path');
const postcssImport = require('postcss-import');
const postcssPresetEnv = require('postcss-preset-env');
const postcssReporter = require('postcss-reporter');
const postcssScss = require('postcss-scss');
const preCss = require('precss');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

const pkg = require('./package.json');

const $ = gulpLoadPlugins();
const server = browserSync.create();
const environment = process.env.NODE_ENV || 'development';
const production = environment === 'production';
const target = process.env.TARGET;

console.log(`v${pkg.version}, NODE_ENV: ${environment}`); // eslint-disable-line

if (target === undefined) {
  throw new Error(
    'Specify the "TARGET" env. Example: "TARGET=chrome". Available options: chrome, firefox.'
  );
}

// TODO: where? "extension": "chrome", "extension": "firefox"

const manifestConfig = {
  dev: {
    // TODO: disabled
    // background: {
    //   scripts: ['scripts/livereload.js']
    // }
  },

  firefox: {
    applications: {
      gecko: {
        id: 'my-app-id@mozilla.org'
      }
    }
  }
};

// --------------------------------------
// Utils
// --------------------------------------

const pipe = (source, ...transforms) =>
  transforms.reduce((stream, transform) => {
    return stream.pipe(
      typeof transform === 'string' ? dest(transform) : transform
    );
  }, src(source));

// --------------------------------------
// Tasks
// --------------------------------------

const scripts = done => {
  // Use it to upgrade to the new Webpack
  // process.traceDeprecation = true;
  let config = {
    context: path.resolve(__dirname, 'src'),
    entry: './scripts/index.js',
    performance: { hints: 'warning' },
    mode: production === true ? 'production' : 'development',
    devtool: production === true ? false : 'cheap-module-eval-source-map', // 'source-map'
    output: {
      path: path.resolve(__dirname, 'src/scripts'),
      filename: 'index.min.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack']
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        DEBUG: JSON.stringify(production !== true)
      })
    ]
  };

  if (production === true) {
    config.optimization = {
      minimizer: [
        new TerserWebpackPlugin({
          sourceMap: false,
          terserOptions: {
            output: {
              comments: false
            }
          },
          extractComments: false
        })
      ]
    };
  }

  webpack(config, (err, stats) => {
    if (err) {
      throw new Error('webpack', err);
    }

    if (production === false) {
      console.log(
        '[webpack]',
        stats.toString({
          all: false,
          colors: true,
          builtAt: true,
          errors: true,
          errorDetails: true,
          timings: true
        })
      );
      console.log('[webpack]', 'Packed successfully!');
    }

    if (production === true) {
      src('src/scripts/index.min.js')
        .pipe($.plumber())
        .pipe(dest(`build/${target}/scripts`));
    }

    done();
  });
};

const styles = () =>
  src('src/styles/index.scss')
    .pipe($.if(production === false, $.sourcemaps.init()))
    .pipe(
      $.postcss(
        [
          preCss(),
          postcssImport(),
          postcssPresetEnv(),
          cssnano({ preset: 'advanced' }),
          postcssReporter()
        ],
        { parser: postcssScss }
      )
    )
    .pipe($.rename({ extname: '.css', suffix: '.min' }))
    .pipe($.if(production === false, $.sourcemaps.write('./')))
    .pipe(dest('src/styles/'))
    .pipe($.if(production === true, dest(`build/${target}/styles`)))
    .pipe($.size({ title: 'styles' }));

const manifest = () =>
  src('./src/manifest.json')
    .pipe($.plumber())
    .pipe(
      $.if(
        production === false,
        $.mergeJson({
          fileName: 'manifest.json',
          jsonSpace: ' '.repeat(4),
          endObj: manifestConfig.dev
        })
      )
    )
    .pipe(
      $.if(
        target === 'firefox',
        $.mergeJson({
          fileName: 'manifest.json',
          jsonSpace: ' '.repeat(4),
          endObj: manifestConfig.firefox
        })
      )
    )
    .pipe(dest(`./build/${target}`))
    .pipe($.size({ title: 'manifest' }));

const images = () =>
  src(['src/images/**/*'], {})
    .pipe($.plumber())
    .pipe($.imagemin({ progressive: true, interlaced: true }))
    .pipe(dest(`./build/${target}/images/`))
    .pipe($.size({ title: 'images' }));

// --------------------------------------
// Others
// --------------------------------------

const clean = () => del(`./build/${target}`);

const copy = dest => {
  const icons = () => pipe('./src/icons/**/*', `./build/${dest}/icons`);
  const images = () =>
    pipe([`./src/images/${target}/**/*`], `./build/${dest}/images`);
  const imagesShared = () =>
    pipe(['./src/images/shared/**/*'], `./build/${dest}/images`);
  const html = () => pipe(['./src/**/*.{html,ico}'], `./build/${dest}`);

  return parallel(icons, images, imagesShared, html);
};

const ext = done =>
  series(parallel(manifest, scripts, styles), doneTwo => copy(target)(doneTwo))(
    done
  );

const zip = () =>
  pipe(
    `./build/${target}/**/*`,
    $.zip(`${pkg.name}-${target}-v${pkg.version}.zip`),
    './dist'
  );

const build = done => series(clean, ext)(done);

const dist = done => series(build, zip)(done);

const reload = done => {
  server.reload();
  done();
};

const listen = () => {
  server.init({ notify: false, server: 'src' });

  watch(['src/**/*.html'], reload);
  watch(
    ['src/scripts/**/*.js', '!src/scripts/**/*.min.*'],
    series(scripts, reload)
  );
  watch(
    ['src/styles/**/*.scss', '!src/styles/**/*.min.*'],
    series(styles, reload)
  );
  watch(['src/images/**/*'], series(images, reload));
};

const serve = () => series(scripts, styles, listen)();

// --------------------------------------
// Exports
// --------------------------------------

Object.assign(exports, {
  build,
  clean,
  default: build,
  dist,
  ext,
  images,
  manifest,
  mergeAll: copy,
  scripts,
  serve,
  styles,
  zip
});
