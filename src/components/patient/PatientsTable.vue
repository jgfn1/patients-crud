<template>
  <v-container fluid class="fill-height">
    <v-row justify="center" align="center">
      <v-col>
        <v-card class="ma-3" elevation="5">
          <v-card-title class="grey darken-3 white--text">
            Patients
            <v-spacer></v-spacer>
            <create-patient-dialog
              @onPatientCreated="refreshPage()"
            ></create-patient-dialog>
          </v-card-title>
          <v-card-subtitle>
            <v-text-field
              v-model="search"
              color="grey darken-3"
              append-icon="mdi-magnify"
              label="Search for a patient by name or attribute"
              single-line
              hide-details
              class="pt-5"
            ></v-text-field>
          </v-card-subtitle>
          <v-card-text>
            <v-data-table
              no-data-text="No patients"
              :headers="headers"
              :items="patients"
              :items-per-page="5"
              :search="search"
              :footer-props="{ itemsPerPageOptions: [3, 5, 15, 25, 50] }"
              class="elevation-0"
              :loading="isLoadingPatients"
            >
              <template v-slot:[`item.photo`]="{ item }">
                <v-img :src="item.photo" width="75%" max-width="100px"></v-img>
              </template>
              <template v-slot:[`item.address`]="{ item }">
                {{ getFullAddressFromObject(item.address) }}
              </template>
              <template v-slot:[`item.actions`]="{ item }">
                <v-row dense>
                  <edit-patient-dialog
                    @buttonClicked="editPatient(item)"
                    :defaultPatient="editedPatient"
                    @onPatientEdited="refreshPage()"
                  ></edit-patient-dialog>
                  <delete-patient-dialog
                    @buttonClicked="deletePatient(item)"
                    :patient="deletedPatient"
                    @onPatientDeleted="refreshPage()"
                  ></delete-patient-dialog>
                </v-row>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import patientsService from "@/services/patients";
import CreatePatientDialog from "./CreatePatientDialog.vue";
import EditPatientDialog from "./EditPatientDialog.vue";
import DeletePatientDialog from "./DeletePatientDialog.vue";

export default {
  name: "PatientsTable",
  components: {
    CreatePatientDialog,
    EditPatientDialog,
    DeletePatientDialog,
  },
  data: () => ({
    editedPatient: {},
    deletedPatient: {},
    isLoadingPatients: false,
    search: "",
    patients: [],
    headers: [
      { text: "Photo", value: "photo", sortable: false },
      { text: "Name", value: "name" },
      { text: "Mother's Name", value: "mothersName" },
      { text: "Birthdate", value: "birthdate" },
      { text: "CPF", value: "cpf" },
      { text: "CNS", value: "cns" },
      { text: "Address", value: "address" },
      { text: "Actions", value: "actions", sortable: false },
    ],
  }),
  methods: {
    editPatient(item) {
      this.editedPatient = { ...item };
    },
    deletePatient(item) {
      this.deletedPatient = { ...item };
    },
    getFullAddressFromObject(address) {
      return Object.values(address).join(", ");
    },
    refreshPage() {
      this.$router.go(0);
    },
  },

  async mounted() {
    this.isLoadingPatients = true;
    try {
      this.patients = await patientsService.getPatients();
    } catch (error) {
      console.log(error);
    }
    this.isLoadingPatients = false;
  },
};
</script>
