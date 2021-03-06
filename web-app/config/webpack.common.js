const webpack = require('webpack');
const helpers = require('./helpers');

/**
 * Webpack Plugins
 */
// problem with copy-webpack-plugin
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const HtmlElementsPlugin = require('./html-elements-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const SassLoader = require('sass-loader');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

/**
 * Webpack Constants
 */
const HMR = helpers.hasProcessFlag('hot');
const METADATA = {
  title: 'Taylor & Francis Group',
  baseUrl: '.',
  isDevServer: helpers.isWebpackDevServer()
};

/**
 * Webpack configuration
 *
 * @see: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = function(options) {
  isProd = options.env === 'prod';
  return {

    /**
     * Static metadata for index.html
     *
     * @see: (custom attribute)
     */
    metadata: METADATA,

    /**
     * Cache generated modules and chunks to improve performance for multiple incremental builds.
     * This is enabled by default in watch mode.
     * You can pass false to disable it.
     *
     * @see: http://webpack.github.io/docs/configuration.html#cache
     */
    //cache: false,

    /**
     * The entry point for the bundle
     * Our Angular.js app
     *
     * @see: http://webpack.github.io/docs/configuration.html#entry
     */
    entry: {

      'polyfills': './src/polyfills.browser.ts',
      'vendor': './src/vendor.browser.ts',
      'main': './src/main.browser.ts'

    },

    /**
     * Options affecting the resolving of modules.
     *
     * @see: http://webpack.github.io/docs/configuration.html#resolve
     */
    resolve: {

      /**
       * An array of extensions that should be used to resolve modules.
       *
       * @see: http://webpack.github.io/docs/configuration.html#resolve-extensions
       */
      extensions: ['', '.ts', '.js', '.json', '.css', '.scss', '.html'],

      // An array of directory names to be resolved to the current directory
      modules: [helpers.root('src'), 'node_modules'],

    },

    /**
     * Options affecting the normal modules.
     *
     * @see: http://webpack.github.io/docs/configuration.html#module
     */
    module: {

      /**
       * An array of applied pre and post loaders.
       *
       * @see: http://webpack.github.io/docs/configuration.html#module-preloaders-module-postloaders
       */
      preLoaders: [{
        test: /\.ts$/,
        loader: 'string-replace-loader',
        query: {
          search: '(System|SystemJS)(.*[\\n\\r]\\s*\\.|\\.)import\\((.+)\\)',
          replace: '$1.import($3).then(mod => (mod.__esModule && mod.default) ? mod.default : mod)',
          flags: 'g'
        },
        include: [helpers.root('src')]
      }],

      /**
       * An array of automatically applied loaders.
       *
       * IMPORTANT: The loaders here are resolved relative to the resource which they are applied to.
       * This means they are not resolved relative to the configuration file.
       *
       * @see: http://webpack.github.io/docs/configuration.html#module-loaders
       */
      loaders: [

        /**
         * Typescript loader support for .ts and Angular 2 async routes via .async.ts
         * Replace templateUrl and stylesUrl with require()
         *
         * @see: https://github.com/s-panferov/awesome-typescript-loader
         * @see: https://github.com/TheLarkInn/angular2-template-loader
         */
        {
          test: /\.ts$/,
          loaders: [
            '@angularclass/hmr-loader?pretty=' + !isProd + '&prod=' +
            isProd,
            'awesome-typescript-loader',
            'angular2-template-loader'
          ],
          exclude: [/\.(spec|e2e)\.ts$/]
        },

        /**
         * Json loader support for *.json files.
         *
         * @see: https://github.com/webpack/json-loader
         */
        {
          test: /\.json$/,
          loader: 'json-loader'
        },

        /**
         * to string and css loader support for *.css files
         * Returns file content as string
         */
        {
          test: /\.css$/,
          loaders: ['to-string-loader', 'css-loader']
        },

        /**
         * Sass loader support for *.scss files
         *
         * @see https://www.npmjs.com/package/sass-loader
         */
        {
          test: /\.scss$/,
          loaders: [
            'raw-loader',
            'sass-loader',
            'sass-loader?sourceMap'
          ]
        },

        /**
         * extract text plugin for webpack 2
         *
         * @see https://github.com/webpack/extract-text-webpack-plugin
         */
        // {
        //   test: /\.scss$/,
        //   loader: ExtractTextPlugin.extract({
        //     fallbackLoader: 'style-loader',
        //     loader: 'raw-loader!sass-loader!resolve-url-loader!sass-loader?sourceMap'
        //   })
        // },

        /**
         * Bootstrap-jQuery loader
         */
        {
          test: /bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/,
          loader: 'imports?jQuery=jquery'
        },

        /**
         * Fonts
         */
        {
          test: /\.(woff2?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          loader: "file?name=fonts/[name].[ext]"
        },

        /**
         * Raw loader support for *.html
         * Returns file content as string
         *
         * @see: https://github.com/webpack/raw-loader
         */
        {
          test: /\.html$/,
          loader: 'raw-loader',
          exclude: [helpers.root('src/index.html')]
        },

        // SVGs: svg, svg?something
        {
          test: /\.svg(\?.*$|$)/,
          loader: 'file-loader?name=/img/[name].[ext]'
        },

        /**
         * File loader for supporting images, for example, in CSS files.
         */
        {
          test: /\.(jpe?g|png|gif)$/,
          loader: 'file?name=/img/[name].[ext]'
        }
      ],

      /**
       * Node-Sass options, passed via Sass-loader
       *
       * @see https://github.com/sass/node-sass#options
       */
      sassLoader: {
        includePaths: [
          helpers.root('node_modules/bootstrap-sass/assets/stylesheets')
        ],
        outputStyle: 'compressed',
        data: "$env: " + process.env.NODE_ENV + ";"
      },

      postLoaders: [{
        test: /\.js$/,
        loader: 'string-replace-loader',
        query: {
          search: 'var sourceMappingUrl = extractSourceMappingUrl\\(cssText\\);',
          replace: 'var sourceMappingUrl = "";',
          flags: 'g'
        }
      }]
    },

    /**
     * Add additional plugins to the compiler.
     *
     * @see: http://webpack.github.io/docs/configuration.html#plugins
     */
    plugins: [
      new AssetsPlugin({
        path: helpers.root('dist'),
        filename: 'webpack-assets.json',
        prettyPrint: true
      }),

      /**
       * Plugin: ForkCheckerPlugin
       * Description: Do type checking in a separate process, so webpack don't need to wait.
       *
       * @see: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
       */
      new ForkCheckerPlugin(),

      /**
       * Plugin: CommonsChunkPlugin
       * Description: Shares common code between the pages.
       * It identifies common modules and put them into a commons chunk.
       *
       * @see: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
       * @see: https://github.com/webpack/docs/wiki/optimization#multi-page-app
       */
      new webpack.optimize.CommonsChunkPlugin({
        name: ['polyfills', 'vendor'].reverse()
      }),

      /**
       * Plugin: ContextReplacementPlugin
       * Description: Provides context to Angular's use of System.import
       *
       * @see: https://webpack.github.io/docs/list-of-plugins.html#contextreplacementplugin
       * @see: https://github.com/angular/angular/issues/11580
       */
      new ContextReplacementPlugin(
        // The (\\|\/) piece accounts for path separators in *nix and Windows
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        helpers.root('src') // location of your src
      ),

      /**
       * Plugin: CopyWebpackPlugin
       * Description: Copy files and directories in webpack.
       *
       * Copies project static assets.
       *
       * @see: https://www.npmjs.com/package/copy-webpack-plugin
       */
      new CopyWebpackPlugin([{
        from: 'src/assets',
        to: 'assets'
      }], {
        ignore: [
          'humans.txt',
          'robots.txt'
        ]
      }),
      new CopyWebpackPlugin([{
        from: 'src/assets/robots.txt'
      }, {
        from: 'src/assets/humans.txt'
      },{
       from: 'src/accessDenied.html'
      }]),

      /**
       * Plugin: HtmlWebpackPlugin
       * Description: Simplifies creation of HTML files to serve your webpack bundles.
       * This is especially useful for webpack bundles that include a hash in the filename
       * which changes every compilation.
       *
       * @see: https://github.com/ampedandwired/html-webpack-plugin
       */
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        chunksSortMode: 'dependency'
      }),

      /**
       * Plugin: HtmlHeadConfigPlugin
       * Description: Generate html tags based on javascript maps.
       *
       * If a publicPath is set in the webpack output configuration, it will be automatically added to
       * href attributes, you can disable that by adding a "=href": false property.
       * You can also enable it to other attribute by settings "=attName": true.
       *
       * The configuration supplied is map between a location (key) and an element definition object (value)
       * The location (key) is then exported to the template under then htmlElements property in webpack configuration.
       *
       * Example:
       *   Adding this plugin configuration:
       *   new HtmlElementsPlugin({
       *     headTags: { ... }
       *   })
       *
       * Means we can use it in the template like this:
       *   <%= webpackConfig.htmlElements.headTags %>
       *
       * @dependencies: HtmlWebpackPlugin
       */
      new HtmlElementsPlugin({
        headTags: require('./head-config.common')
      }),

      /**
       * jQuery support
       *
       * @see https://github.com/AngularClass/angular2-webpack-starter/wiki/How-to-use-Bootstrap-4-and-Sass-(and-jQuery)
       */
      new ProvidePlugin({
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        $: 'jquery',
        'window.$': 'jquery',
        jquery: 'jquery',
        "Tether": 'tether',
        "window.Tether": "tether",
        Tooltip: "exports?Tooltip!bootstrap/js/dist/tooltip",
        Alert: "exports?Alert!bootstrap/js/dist/alert",
        Button: "exports?Button!bootstrap/js/dist/button",
        Carousel: "exports?Carousel!bootstrap/js/dist/carousel",
        Collapse: "exports?Collapse!bootstrap/js/dist/collapse",
        Dropdown: "exports?Dropdown!bootstrap/js/dist/dropdown",
        Modal: "exports?Modal!bootstrap/js/dist/modal",
        Popover: "exports?Popover!bootstrap/js/dist/popover",
        Scrollspy: "exports?Scrollspy!bootstrap/js/dist/scrollspy",
        Tab: "exports?Tab!bootstrap/js/dist/tab",
        Tooltip: "exports?Tooltip!bootstrap/js/dist/tooltip",
        Util: "exports?Util!bootstrap/js/dist/util",
      }),

      /**
       * Plugin: extract text plugin for webpack 2
       * Description: It moves every require("style.css") in entry chunks into
       * a separate css output file. So your styles are no longer inlined into
       * the javascript, but separate in a css bundle file (styles.css).
       *
       * If your total stylesheet volume is big, it will be faster because
       * the stylesheet bundle is loaded in parallel to the javascript bundle.
       *
       * @see: https://github.com/webpack/extract-text-webpack-plugin
       */
      new ExtractTextPlugin('styles.css'),

    ],

    /**
     * Include polyfills or mocks for various node stuff
     * Description: Node configuration
     *
     * @see: https://webpack.github.io/docs/configuration.html#node
     */
    node: {
      global: 'window',
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }

  };
}
