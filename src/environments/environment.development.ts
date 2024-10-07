let ip="192.168.29.198"

export const environment = {
  production: false,
  keycloak: {
    //authority: 'http://localhost:8090',
    //redirectUri: 'http://localhost:4200',
    //postLogoutRedirectUri: 'http://localhost:4200/logout',


    authority: 'http://'+ip+':8090',
    redirectUri: 'http://'+ip+':4200',
    postLogoutRedirectUri: 'http://'+ip+':4200/logout',


    realm: 'ecommerce',
    clientId: 'ecommerceFrontEnd',
  },
  idleConfig: { idle: 10, timeout: 60, ping: 10 },

};
