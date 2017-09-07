exports.config = {
  // See http://brunch.io/#documentation for docs.
  files: {
    javascripts: {
      joinTo: {
        "vuetils.js": /^src/,
        "vendor.js": /(?!src)/
      },

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
      joinTo: "vuetils.css"
    },
    templates: {
      joinTo: "vuetils.js"
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
    watched: ["src", "sample"],
    // Where to compile files to
    public: "dist"
  },

  // Configure your plugins
  plugins: {
    vue: {
      extractCSS: true,
      out: 'dist/vuetils.css'
    }
  },

  npm: {
    enabled: true,
    globals: {
      _: 'lodash'
    }
  }
};
