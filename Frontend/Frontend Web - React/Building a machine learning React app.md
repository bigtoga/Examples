Tim Creative theme I chose - [demo](https://demos.creative-tim.com/blk-design-system-react/?_ga=2.19067643.291739317.1589642456-1516852971.1589642456#/components) &bull; [docs](https://demos.creative-tim.com/blk-design-system-react/?_ga=2.19067643.291739317.1589642456-1516852971.1589642456#/documentation/build-tools)

# Installing React and theme locally
- [x] Download the theme, extract to a local folder
- [x] Install NodeJS
- [x] `cd` to the extracted folder
- [x] `npm install` or `npm run install:clean` if you want to both (a) install node_modules and (b) start your project
    * If you get `Module not found` error, try `npm install --g cross-env` followed by changing the start script from `"start": "react-scripts start",` to `"start": "NODE_PATH=./src react-scripts start",`
    * If you get `props.history of undefined` error, [visit this page](https://demos.creative-tim.com/blk-design-system-react/?_ga=2.19067643.291739317.1589642456-1516852971.1589642456#/documentation/tutorial)
- [ ] Can also install with [Bower](https://bower.io/): bower install blk-design-system-react.
- [ ] To begin the development, run `npm start` or `yarn start`

Navigate to https://localhost:3000 to test

# Development
- [x] Open folder w VS Code

## / (root)
- [ ] Edit `/package.json`
   * Change `name`, `version`, `description`, `repository`, `keywords`, etc
   * Update the package requirements

## /public/
- [ ] Edit `/public/index.html` which is just a template file:
   * Add/update title
   * Add webfonts, meta tags, or analytics to this file
   * Don't add HTML though
- [ ] Edit `/public/manifest.json` and change `short_name`, `name`. This file provides metadata used when the app is added to the
      homescreen on Android. [docs](https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/)
   
# Deploy
To create a production bundle, use `npm run build` or `yarn build`.

### Other commands listed in the docs
- [ ] `npm run build`
- [ ] `npm run test`
- [ ] `npm run compile-sass`
- [ ] `npm run minify-sass`
- [ ] `npm run map-sass`

# Live Production
* [How to deploy React on Heroku](https://blog.heroku.com/deploying-react-with-zero-configuration)
* You need to change the theme's homepage prop - see the note [in the docs](https://demos.creative-tim.com/blk-design-system-react/?_ga=2.19067643.291739317.1589642456-1516852971.1589642456#/documentation/tutorial)
