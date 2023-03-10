<template>
  <v-dialog v-model="editPatientDialog" persistent>
    <template v-slot:activator="{ on }">
      <v-btn
        v-on="on"
        x-small
        color="grey darken-3"
        class="mr-2"
        icon
        @click="$emit('buttonClicked')"
      >
        <v-icon> mdi-pencil </v-icon>
      </v-btn>
    </template>
    <v-card v-if="editPatientDialog">
      <v-card-title class="grey darken-3 white--text">
        Edit patient
      </v-card-title>
      <v-card-subtitle>
        <br />
      </v-card-subtitle>

      <v-card-text>
        <patient-form
          v-if="editPatientDialog"
          @onFormValid="onFormValid"
          @onFormValidationError="onFormValidationError()"
          :defaultPatient="defaultPatient"
        ></patient-form>
      </v-card-text>

      <v-divider></v-divider>
      <v-card-actions>
        <v-btn @click="closeEditPatientDialog" text color="grey darken-2"
          >Cancel</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn
          @click="savePatient"
          :loading="isSaveButtonLoading"
          text
          color="grey darken-4"
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
  components: { PatientForm },
  name: "EditPatientDialog",
  props: ["defaultPatient"],
  data: () => ({
    editPatientDialog: false,
    isSaveButtonLoading: false,
    patient: {},
    isFormValid: false,
  }),
  methods: {
    async savePatient() {
      this.isSaveButtonLoading = true;
      try {
        await patientsService.editPatient(this.patient);
        this.$emit("onPatientEdited");
        this.closeEditPatientDialog();
      } catch (error) {
        console.log(error);
      }
      this.isSaveButtonLoading = false;
    },
    closeEditPatientDialog() {
      this.patient = {};
      this.editPatientDialog = false;
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
