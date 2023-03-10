<template>
  <patients-table></patients-table>
</template>

<script>
import PatientsTable from "@/components/patient/PatientsTable";

export default {
  name: "HomeView",

  components: {
    PatientsTable,
  },
};
</script>
