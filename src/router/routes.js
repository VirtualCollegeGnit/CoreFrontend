const routes = [
  {
    path: "/",
    component: () => import("layouts/MyLayout.vue"),
    children: [{ path: "", component: () => import("pages/Index.vue") }]
  },
  {
    path: "/MyAccount",
    component: () => import("layouts/MyLayout.vue"),
    children: [{ path: "", component: () => import("pages/MyAccount.vue") }],
    meta: {
      authName: "main"
    }
  },
  {
    path: "/NewUser",
    component: () => import("layouts/MyLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Admin/NewUser.vue") }
    ],
    meta: {
      authName: "main"
    }
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
