<template>
  <v-container fluid class="fill-height">
    <v-row class="text-center" justify="center" align="center">
      <v-col lg="3" md="4" sm="6" xs="6">
        <v-form>
          <v-card @keyup.enter="doLogin()">
            <v-progress-linear
              color="blue"
              :indeterminate="isLoading"
            ></v-progress-linear>
            <v-card-title class="black white--text"> Login </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    prepend-icon="mdi-at"
                    v-model="username"
                    color="black"
                    placeholder="Username"
                    required
                    :rules="[usernameRules]"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    prepend-icon="mdi-lock"
                    :type="passwordVisibility"
                    v-model="password"
                    color="black"
                    placeholder="Password"
                    :append-icon="passwordAppendIcon"
                    @click:append="togglePasswordVisibility"
                    required
                    :rules="[passwordRules]"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                small
                color="black"
                text
                @click.native="doLogin()"
                :disabled="isLoading"
              >
                Enter
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
    <v-snackbar
      style="top: -60px"
      v-model="snackbar"
      :timeout="4000"
      :color="snackbarColor"
    >
      <v-icon>{{ snackbarIcon }}</v-icon>
      {{ snackbarText }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          icon
          small
          v-bind="attrs"
          @click="snackbar = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import router from "@/router";

export default {
  name: "LoginComponent",
  data: () => ({
    snackbar: false,
    snackbarColor: "error",
    snackbarIcon: "mdi-alert",
    snackbarText: "",
    hasLoginError: false,
    isPasswordVisible: false,
    isLoading: false,
    username: "",
    password: "",
    usernameRules: (username) =>
      username.length > 3 || "Username should have at least 4 characters",
    passwordRules: (password) =>
      password.length > 5 || "Password should have at least 6 characters",
  }),
  methods: {
    ...mapActions(["login"]),
    async doLogin() {
      this.isLoading = true;
      // dummy login logic
      window.setTimeout(() => {
        if (this.username != "username") {
          this.snackbarText = "Invalid username";
          this.snackbar = true;
        } else if (this.password != "password") {
          this.snackbarText = "Invalid password";
          this.snackbar = true;
        } else {
          this.login();
          router.push("/");
        }
        this.isLoading = false;
      }, 1000);
    },
    togglePasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible;
    },
  },
  computed: {
    passwordVisibility() {
      return this.isPasswordVisible ? "text" : "password";
    },
    passwordAppendIcon() {
      return this.isPasswordVisible ? "mdi-eye" : "mdi-eye-off";
    },
  },
};
</script>