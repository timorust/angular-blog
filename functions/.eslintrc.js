module.exports = {
  "env" : {
    "browser" : true,
    "node" : true,
    "es6" : true
  },
  "rules" : {
    "no-unused-vars" : 2,
    "no-undef" : 2
  },
  "parser": "babel-eslint",
  "parserOptions": {
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "modules": true
    }
  }
};
