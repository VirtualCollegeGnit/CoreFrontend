<template>
  <q-page class="flex flex-center">
    <!-- <img alt="Quasar logo" src="~assets/quasar-logo-full.svg" /> -->
    <div>
      <h1>Welcome to</h1>
      <h2>Virtual College</h2>
      <br />
      <div>
        <q-btn
          color="black"
          text-color="white"
          label="Login"
          size="lg"
          to="MyAccount"
          v-if="!$oidc.isAuthenticated"
        />
        <q-btn
          color="blue"
          label="My Account"
          size="lg"
          to="MyAccount"
          v-if="$oidc.isAuthenticated"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "PageIndex"
};
</script>
