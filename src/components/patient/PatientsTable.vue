<template>
  <v-container fluid class="fill-height">
    <v-row justify="end">
      <v-btn dark small right @click="doLogout()" class="mt-2 mr-3">
        Logout
        <v-icon>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-row>
    <v-row justify="center" align="center">
      <v-col lg="10" md="10" sm="10" xs="10">
        <v-card class="mx-2">
          <v-card-title>
            Patients
            <v-spacer></v-spacer>
            <create-patient-dialog
              @onPatientCreated="refreshPage()"
            ></create-patient-dialog>
          </v-card-title>
          <v-card-subtitle>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search for a patient by name or attribute"
              single-line
              hide-details
            ></v-text-field>
          </v-card-subtitle>
          <v-card-text>
            <v-data-table
              no-data-text="No patients"
              :headers="headers"
              :items="patients"
              :items-per-page="15"
              :search="search"
              :key="key"
            >
              <template v-slot:[`item.photo`]="{ item }">
                <v-img :src="item.photo" width="75%" max-width="100px"></v-img>
              </template>
              <template v-slot:[`item.address`]="{ item }">
                {{ getFullAddressFromObject(item.address) }}
              </template>
              <template v-slot:[`item.actions`]="{ item }">
                <v-row>
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
import { mapActions } from "vuex";
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
    key: 0,
    search: "",
    patients: [],
    headers: [
      { text: "Photo", value: "photo" },
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
    ...mapActions(["logout"]),
    doLogout() {
      this.logout();
      this.$router.push("/login");
    },
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
    this.patients = await patientsService.getPatients();
  },
};
</script>
