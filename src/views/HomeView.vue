<template>
  <div>
    <v-toolbar color="grey darken-3" dense>
      <v-spacer></v-spacer>
      <logout-component></logout-component>
    </v-toolbar>
    <patients-table></patients-table>
  </div>
</template>

<script>
import PatientsTable from "@/components/patient/PatientsTable";
import LogoutComponent from "@/components/login/LogoutComponent.vue";

export default {
  name: "HomeView",

  components: {
    PatientsTable,
    LogoutComponent,
  },
};
</script>
