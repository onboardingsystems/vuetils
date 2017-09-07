exports.config = {
  // See http://brunch.io/#documentation for docs.
  files: {
    javascripts: {
      joinTo: "js/vue-utils.js"

      // To use a separate vendor.js bundle, specify two files path
      // http://brunch.io/docs/config#-files-
      // joinTo: {
      //   "js/app.js": /^js/,
      //   "js/vendor.js": /^(?!js)/
      // }
      //
      // To change the order of concatenation of files, explicitly mention here
      // order: {
      //   before: [
      //     "vendor/js/jquery-2.1.1.js",
      //     "vendor/js/bootstrap.min.js"
      //   ]
      // }
    },
    stylesheets: {
      joinTo: "css/vue-utils.css"
    },
    templates: {
      joinTo: "js/vue-utils..js"
    }
  },

  conventions: {
    // This option sets where we should place non-css and non-js assets in.
    // By default, we set this to "/assets/static". Files in this directory
    // will be copied to `paths.public`, which is "priv/static" by default.
    assets: /^(static)/
  },

  // Phoenix paths configuration
  paths: {
    // Dependencies and current project directories to watch
    watched: ["src"],
    // Where to compile files to
    public: "dist"
  },

  // Configure your plugins
  plugins: {
    vue: {
      extractCSS: true,
      out: 'dist/css/vue-utils.css'
    }
  },

  modules: {
    autoRequire: {
      "js/vue-utils.js": ["src/index.js"]
    }
  },

  npm: {
    enabled: true,
    globals: {
      _: 'lodash'
    }
  }
};
