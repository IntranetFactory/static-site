var
  envDev        = ((process.env.NODE_ENV || '').trim().toLowerCase() !== 'production')
;

module.exports = {
  metadata: {
    envDev: envDev,
    site: {
      title: 'Static Site',
      tagline: 'Static site generator utilizing Gulp and Metalsmith',     
      url: envDev ? 'localhost:4000' : 'https://S1SYPHOS.github.io',
      baseurl: envDev ? '' : '', // sub-directory, eg name.github.io/sub-directory    
      version: '0.1.0'
    }
  },
  paths: {
    source: './site',
    build: envDev ? 'build/development' : 'build/production'
  },
  assets: {
    source: '_resources',
    build: 'site/assets'
  },  
  server: {
    port: 4000,
    notify: true,
    open: true
  },
  envDev,
  styles: {
    prefix: [
      // For more browsers, see https://github.com/ai/browserslist
      '> 1%',
      'last 3 versions',
      'IE >= 9'
    ],
    include: [
      // 'node_modules',
      // 'bower_components'
    ]
  },
  scripts: {
    webpack: {
      watch: false,
      // entry: {},
      // output: {},
      // plugins: []
    }
  },
  html: {
    minify: {
      // For more options, see https://github.com/kangax/html-minifier
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      keepClosingSlash: true,
      minifyCSS: true,
      minifyJS: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true
    },
    sitemap: {
      hostname: 'http://www.website.com',
      omitIndex: true
    },
    feed: {
      collection: 'posts',
      destination: 'atom.xml'
    }
  }
}
