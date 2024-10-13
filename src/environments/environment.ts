
//let ip="192.168.29.198"
let ip="localhost"
let port="4200"
export const environment = {


  production: false,
  keycloak: {
    //authority: 'http://localhost:8090',
    //redirectUri: 'http://localhost:4200',
    //postLogoutRedirectUri: 'http://localhost:4200/logout',


    authority: 'http://'+ip+':8090',
    redirectUri: 'http://'+ip+':'+port,
    postLogoutRedirectUri: 'http://'+ip+':'+port,

    realm: 'ecommerce',
    clientId: 'ecommerceFrontEndNew',
  },
  idleConfig: { idle: 10, timeout: 60, ping: 10 },
  ip: ip,
  port:port

};
