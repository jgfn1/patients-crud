<template>
  <v-btn small text dark @click="doLogout()">
    Logout
    <v-icon>mdi-exit-to-app</v-icon>
  </v-btn>
</template>

<script lang="js">
import { mapActions } from "vuex";

export default {
  name: "LogoutComponent",
  methods: {
    ...mapActions(["logout"]),
    doLogout() {
      this.logout();
      this.$router.push("/login");
    },
  },
};
</script>
