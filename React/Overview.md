

```shell
$ git clone https://github.com/pluralsight-projects/React-QuizComponent
$ cd react-quiz
$ npm install
$ npm outdated # list any outdated packages
$ npm update # update outdated packages. npm update will only inspect top-level packages
# also could run "npm install npm@latest -g" which updates both npm and all packages
$ npm outdated # again - are there any outdated packages remaining?
$ Go manually open package.json and update the dependencies
$ npm-ls # list all installed packages
$ npm audit # Review vulnerabilities

$ npm run test

$ npm start
```
## Running tests in node
Every time you want to check your work locally you can run `npm run test`, and it will report the status of every task in that module. You can target only specific modules as well via `npm run test:module1`
