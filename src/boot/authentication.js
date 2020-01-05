// import something here
import { createOidcAuth, SignInType } from "vue-oidc-client";

// "async" is optional
export default async ({ Vue, router }) => {
  // something to do
  const appUrl = process.env.DEV
    ? "http://localhost:8080"
    : "https://virtualcollege.now.sh";
  let mainOidc = createOidcAuth("main", SignInType.Window, appUrl, {
    // authority: process.env.DEV
    //   ? "http://localhost:5000"
    //   : "https://virtualcollege-identity.herokuapp.com",
    authority: "https://virtualcollege-identity.herokuapp.com",
    client_id: process.env.DEV ? "spa" : "spa-prod",
    response_type: "id_token token",
    scope: "openid profile api1",
    redirect_uri: `${appUrl}/index.html`,
    loadUserInfo: true,
    revokeAccessTokenOnSignout: true
  });
  Vue.prototype.$oidc = mainOidc;
  mainOidc.useRouter(router);
  return new Promise(resolve => {
    mainOidc.startup().then(() => resolve());
  });
};
