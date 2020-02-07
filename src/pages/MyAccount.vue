<template>
  <q-page padding>
    <!-- content -->
    <jsonResult :data="$oidc.userProfile" />
    <div>
      {{ $oidc.accessToken || "" }}
    </div>
    <jsonResult v-for="(res, i) in response" :data="res" :key="i" />
    <q-btn label="Test Secure Api" @click="testSecureApi" />
    <q-btn label="Log" @click="oidcLog" />
    <q-btn label="Logout" @click="oidcLogout" />
    <q-btn
      v-if="
        typeof $oidc.userProfile.role === 'object' &&
          $oidc.userProfile.role.indexOf('admin') >= 0
      "
      label="New (Member) User"
      to="/NewUser"
    />
  </q-page>
</template>

<script>
import jsonResult from "./../components/jsonResult";
export default {
  // name: 'PageName',
  components: {
    jsonResult
  },
  data() {
    return {
      response: "tse"
    };
  },
  methods: {
    oidcLog: function() {
      // eslint-disable-next-line no-console
      console.log(this.$oidc);
      // this.$oidc.signOut();
    },
    oidcLogout: function() {
      // eslint-disable-next-line no-console
      // console.log(this.$oidc);
      this.$oidc.signOut();
    },
    testSecureApi: async function() {
      // const res = await this.$axios({
      //   url: "http://localhost:5001/api/people/",
      //   headers: {
      //     Authorization: "Bearer " + this.$oidc.accessToken
      //   }
      // });
      const res = await this.$axios("api/people");
      this.response = res.data;
    }
  }
};
</script>
