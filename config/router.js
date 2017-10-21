'use strict'

const Router = require('koa-router')
const User = require('../koa/controllers/toBid')

module.exports = function(){
	var router = new Router({
    prefix: '/api'
  })

  router.get('/toBid',User.findAll)
  router.get('/toa',User.find)
  // user
//   router.post('/u/signup', App.hasBody, User.signup)
//   router.post('/u/update', App.hasBody, App.hasToken, User.update)

//   // DB Interface test
//   router.get('/test/user/users',User.users)
//   router.post('/test/user/add',User.addUser)
//   router.post('/test/user/delete',User.deleteUser)

  return router
}