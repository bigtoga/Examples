Confusing because both of these below have the same outcome. How do you choose?
* npm create-react-app my-app
* npx create-react-app my-app

### High-level differences
npm - default dependency/package manager. Can manage local environments or global packages 

npx - package runner

npm: executes the local `create-react-app` package from your machine, so you first have to install it **globally** on your system with `npm install -g create-react-app`

npx: If you don’t have `create-react-app` globally on your system, it will get downloaded and *not* installed globally. This is great if you don’t want to pollute your system with global packages that you only run once every two months.

### npm
* **local** installs have links created at the `./node_modules/.bin/`
* **global** installs have links created at `/usr/local/bin` (Linux) or `%AppData%/npm` on Windows)

To run a **local** copy, you have two options: 
1. `npm ./node_modules/.bin/your-package`
1. Update `package.json`: 
```javascript 
this:{
{
  “name”: “your-application”,
  “version”: “1.0.0”,
  “scripts”: {
    “your-package”: “your-package”
  }
}`
You can now run your package using a named reference: `npm run your-package`


### npx 
Bundled with npm as of version 5.20. Allows you to run any bundled NodeJS executable *local, global, or remote*. 

**Local and global packages** can be executed via `npx your-package` which will check whether <command> or <package> exists in $PATH, or in the local project binaries, and if so it will execute it.

**Remote executables** are easy:
Can be any executable or even a dynamically created one:
1.  Create a new gist with two files: `myfile.js` and `package.json`
1. Write whatever logic/code you want executed inside the js file
1. Create a named reference to your js file inside `package.json` with previous name, version, scripts info
1. `npx <url to gist>`

—————

For more info
* [Excellent write up of npm vs npx](https://www.freecodecamp.org/news/npm-vs-npx-whats-the-difference/)



