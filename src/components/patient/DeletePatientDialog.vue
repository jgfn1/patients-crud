<template>
  <v-dialog v-model="deletePatientDialog" max-width="500px">
    <template v-slot:activator="{ on }">
      <v-btn
        v-on="on"
        x-small
        color="grey darken-3"
        icon
        @click="$emit('buttonClicked')"
      >
        <v-icon> mdi-delete </v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="grey darken-3 small lighten white--text"
        >Are you sure you want to delete this patient?</v-card-title
      >
      <v-card-actions>
        <v-btn
          color="grey darken-4"
          small
          text
          @click="closeDeletePatientDialog"
          >Cancel</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn color="grey darken-2" small text @click="confirmPatientDeletion"
          >Delete</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="js">
import patientsService from '@/services/patients';

export default {
  name: "DeletePatientDialog",
  props: ["patient"],
  data: () => ({
    deletePatientDialog: false,
  }),
  methods: {
    async confirmPatientDeletion() {
      console.log("deleting: ", this.patient)
      await patientsService.deletePatient(this.patient);
      this.$emit('onPatientDeleted');
      this.closeDeletePatientDialog();
    },
    closeDeletePatientDialog() {
      this.deletePatientDialog = false;
    },
  }
}
</script>
