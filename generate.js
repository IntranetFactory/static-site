var
  config = require('./config'),
  dates = require('metalsmith-jekyll-dates'),
  collections = require('metalsmith-collections'),
  excerpts = require('metalsmith-better-excerpts'),
  feed = config.envDev ? null : require('metalsmith-feed-atom'),
  fingerprint = require('metalsmith-fingerprint'),
  htmlmin = config.envDev ? null : require('metalsmith-html-minifier'),
  inplace = require('metalsmith-in-place'),
  layouts = require('metalsmith-layouts'),
  markdown = require('metalsmith-markdown'),
  metallic = require('metalsmith-metallic'),
  metalsmith = require('metalsmith'),
  ms = new metalsmith(process.cwd()),
  permalinks = require('metalsmith-permalinks'),
  related = require('metalsmith-related'),
  sitemap = config.envDev ? null : require('metalsmith-mapsite');


/* TinyLiquid doesn't support fingerprint["a/b/c.js"], so we need a short name finterprint.c_js */
var fixFingerprintLiquid = function () {
    
    return function (files, metalsmith, done) {
        var metadata = metalsmith.metadata(),
            fingerprint  = metadata.fingerprint,
            newFingerprint = {};

        for (var key in fingerprint) {
            var newKey = key.replace(/\\/g, '/');
            var newValue = fingerprint[key].replace(/\\/g, '/');
          
            var p = newKey.lastIndexOf("/");
            newKey = newKey.substring(p+1);
            newKey = newKey.split(".").join("_");
          
            newFingerprint[newKey] = newValue;
        }

        metadata.fingerprint = newFingerprint;

        done();
    };
};

/*
 * Building Metalsmith - A pluggable static site generator
 * For more information, see http://www.metalsmith.io/
 */

ms.metadata(config.metadata)
ms.source(config.paths.source)
ms.destination(config.paths.build)
ms.clean(!config.envDev)
ms.use(dates())

ms.use(collections({
  posts: {
    pattern: 'posts/*.md',
    sortBy: 'date',
    reverse: true
  },
  pages: 'pages/*.{md,html}'
}))

ms.use(related({
  max: 3,
  pattern: 'posts/*.md'
}));


if (!config.envDev) ms.use(fingerprint({
  pattern: ['assets/styles/*.css', 'assets/scripts/*.js']
}));

ms.use(fixFingerprintLiquid());

ms.use(inplace({ engine: 'liquid', pattern: '*.{md,html}' }));

ms.use(markdown({
  typographer: true,
  html: true
}));

ms.use(metallic());

/* ms.use(markdown()); */

ms.use(excerpts({
    stripTags: false
  }))
  .use(permalinks({
    pattern: ':title',
    linksets: [{
      match: {
        collection: 'posts'
      },
      pattern: 'posts/:title',
  }]
  }))


ms.use(layouts({
  engine: 'liquid',
  default: 'post.html',
  directory: '_layouts',
  includeDir: '_layouts',
  pattern: '**/*.html'
}))

if (!config.envDev) ms.use(htmlmin(config.html.minify))
if (!config.envDev) ms.use(sitemap(config.html.sitemap))
if (!config.envDev) ms.use(feed(config.html.feed))

ms.build(function (err) {
  if (err) throw err;
})
