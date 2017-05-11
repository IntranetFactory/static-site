
## Static Site Generator 
based on
- [Metalsmith](http://www.metalsmith.io/) - an extremely simple, pluggable static site generator
- [Gulp v4](http://gulpjs.com/) - the streaming build system
For those well acquainted with [Jekyll](http://jekyllrb.com/), folder structure and naming convention of posts will be familiar. 

## Features
This site generator includes the following features:
- [Browsersync](https://www.browsersync.io/) - time-saving synchronised browser testing (once you go live-reload, you'll never come back)
- [Sass](http://sass-lang.com/) - CSS with superpowers
- [PostCSS](https://github.com/postcss/postcss) - a tool for transforming styles with JS plugins
- [Autoprefixer](https://github.com/postcss/autoprefixer) - adding vendor prefixes by the rules of [Can I Use](http://caniuse.com/)
- [ESLint](http://eslint.org/) - the pluggable linting utility for JavaScript and JSX (with preconfigured ruleset by [Google](https://github.com/google/eslint-config-google))
- [Liquid](https://github.com/leizongmin/tinyliquid) - an awesome, Django/Jinja-like template engine for node.js (similar to Jekyll's [Liquid](http://shopify.github.io/liquid/))


## How to use

### To install for first time

- Download a clone of the repo to your local harddrive
- Open terminal / commandline
- Type in `cd <path to your folder within your user directory>`
- `npm install` will install everything (takes a few moments)
- Continue below with `npm start` to start the website and local webserver

### To work with existing installation

`npm start` - Compiles assets & html, launches development server:
- compiles styles & scripts are being compiled & concatenated
- compresses images
- builds the site in ./build/development & opens it in your default browser
- watches for changes and injects them right away

`npm run build` - Same as above, but in production mode:
- compiles & builds everything
- minifies & compresses everything to ./build/production


Additional npm scripts can be found inside `package.json` (such as serving the site with production settings or debug mode). For those in need of a more lightweight solution, just modify templates, add some content and/or drop assets into `_posts/assets`, then run `node ./index.js` to build the site (which could then be served with `gulp server`).

### Configuration
Global variables and site metadata can be found inside `config.js`. Metalsmith's build process resides in `generate.js`. Static assets such as (S)CSS or JS files as well as fonts and images are located inside `_resources`, posts and pages in their respective folders inside `site`. 

