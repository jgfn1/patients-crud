<template>
  <v-dialog v-model="createPatientDialog" persistent>
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" small text color="black">
        Add new Patient
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="black lighten white--text">
        Create patient
      </v-card-title>

      <v-card-text class="mt-6">
        <patient-form
          @onFormValid="onFormValid"
          @onFormValidationError="onFormValidationError()"
        ></patient-form>
      </v-card-text>

      <v-divider></v-divider>
      <v-card-actions>
        <v-btn @click="closeCreatePatientDialog" text color="dark grey"
          >Cancel</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn
          @click="savePatient"
          :loading="isSaveButtonLoading"
          text
          color="black"
          :disabled="!isFormValid"
        >
          save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import patientsService from "@/services/patients";
import PatientForm from "@/components/form/PatientForm.vue";

export default {
  name: "CreatePaientDialog",
  components: {
    PatientForm,
  },
  data: () => ({
    createPatientDialog: false,
    isSaveButtonLoading: false,
    patient: {},
    isFormValid: false,
  }),
  methods: {
    async savePatient() {
      this.isSaveButtonLoading = true;
      try {
        await patientsService.createPatient(this.patient);
        this.$emit("onPatientCreated");
        this.closeCreatePatientDialog();
      } catch (error) {
        console.log(error);
      }
      this.isSaveButtonLoading = false;
    },
    closeCreatePatientDialog() {
      this.patient = {};
      this.createPatientDialog = false;
    },
    onFormValid(patient) {
      this.patient = { ...patient };
      this.isFormValid = true;
    },
    onFormValidationError() {
      this.isFormValid = false;
    },
  },
};
</script>
