<template>
  <patients-table></patients-table>
</template>

<script>
import PatientsTable from "../components/PatientsTable";

export default {
  name: "HomeView",

  components: {
    PatientsTable,
  },
};
</script>
