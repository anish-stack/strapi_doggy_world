// src/api/auth/routes/auth.js

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/register',
      handler: 'auth.register',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/verifyOtp',
      handler: 'auth.verifyOtp',
      config: {
        policies: [],
        middlewares: [],
      },
    },

    {
      method: 'POST',
      path: '/resendOtp',
      handler: 'auth.resendOtp',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/auth/me',
      handler: 'auth.findMe',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/find-user/:contact_number',
      handler: 'auth.findOne',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/find-all-users',
      handler: 'auth.findAll',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/update-user/:contact_number',
      handler: 'auth.update',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/user-login',
      handler: 'auth.login',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
