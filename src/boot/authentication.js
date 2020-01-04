// import something here
import { createOidcAuth, SignInType } from "vue-oidc-client";

// "async" is optional
export default async ({ Vue, router }) => {
  // something to do
  const appUrl = process.env.DEV
    ? "http://localhost:8080"
    : "https://virtualcollege.now.sh";
  const clientId = process.env.DEV ? "spa" : "spa-prod";
  let mainOidc = createOidcAuth("main", SignInType.Window, appUrl, {
    authority: "http://localhost:5000", //same prod???
    client_id: clientId,
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
