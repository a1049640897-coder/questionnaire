module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'semi':[1,'always'],
    "singleQuote": true,//把双引号换成单引号
    'eqeqeq': 'off',
    "trailingComma": "es5"//在代码尾部添加逗号
  },

  parserOptions: {
    parser: 'babel-eslint'
  }
}
