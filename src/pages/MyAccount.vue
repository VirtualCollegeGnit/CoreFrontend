<template>
  <q-page padding>
    <!-- content -->
    <div>
      <ul>
        <li v-for="(data, key) in $oidc.userProfile" :key="data">
          {{ key }} - {{ data }}
        </li>
      </ul>
    </div>
    <q-btn label="Logout" @click="oidcLog" />
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  methods: {
    oidcLog: function() {
      // eslint-disable-next-line no-console
      // console.log(this.$oidc);
      this.$oidc.signOut();
    }
  }
};
</script>
