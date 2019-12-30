// import something here
import { createOidcAuth, SignInType } from "vue-oidc-client";

// "async" is optional
export default async ({ Vue, router }) => {
  // something to do
  const appUrl = "http://localhost:8080";
  let mainOidc = createOidcAuth("main", SignInType.Window, appUrl, {
    authority: "http://localhost:5000",
    client_id: "spa",
    response_type: "id_token token",
    scope: "openid profile",
    redirect_uri: "http://localhost:8080/index.html",
    loadUserInfo: true,
    revokeAccessTokenOnSignout: true
  });
  Vue.prototype.$oidc = mainOidc;
  mainOidc.useRouter(router);
  return new Promise(resolve => {
    mainOidc.startup().then(() => resolve());
  });
};
