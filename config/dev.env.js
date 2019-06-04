'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')


module.exports = merge(prodEnv, {
// 一下变量需加'"  "'
  NODE_ENV: '"development"',
  API: '"http://qm.uat1.rs.com"',
  // API: 'http://bottomclouds.com',
})
