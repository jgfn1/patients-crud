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
            <v-btn @click="openCreatePatientDialog()" small text color="black">
              Add new Patient
              <v-icon>mdi-plus</v-icon>
            </v-btn>
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
                <v-img :src="item.photo" width="75%"></v-img>
              </template>
              <template v-slot:[`item.actions`]="{ item }">
                <v-icon
                  small
                  color="black"
                  class="mr-2"
                  @click="editPatient(item)"
                >
                  mdi-pencil
                </v-icon>
                <v-icon small color="dark grey" @click="deletePatient(item)">
                  mdi-delete
                </v-icon>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="black small lighten white--text"
          >Are you sure you want to delete this patient?</v-card-title
        >
        <v-card-actions>
          <v-btn color="green" small text @click="closeDelete">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="red" small text @click="confirmPatientDeletion"
            >Delete</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <create-patient
      :active="createPatientDialog"
      @closeDialog="closeCreatePatientDialog()"
    ></create-patient>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import patientsService from "@/services/patients";
import CreatePatient from "./CreatePatient.vue";

export default {
  name: "PatientsTable",
  components: {
    CreatePatient,
  },
  data: () => ({
    createPatientDialog: false,
    dialogDelete: false,
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
      this.editedIndex = this.patients.indexOf(item);
      console.log("edited index");
      console.log(this.editedIndex);
      this.editedPatient = JSON.parse(
        JSON.stringify(this.patients[this.editedIndex])
      );
      this.openCreatePatientDialog();
    },
    deletePatient(item) {
      this.editedIndex = this.patients.indexOf(item);
      this.editedPatient = JSON.parse(JSON.stringify(item));
      this.dialogDelete = true;
    },
    confirmPatientDeletion() {
      this.patients.splice(this.editedIndex, 1);

      this.closeDelete();
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedPatient = JSON.parse(JSON.stringify(this.patient));
        this.editedIndex = -1;
      });
    },
    openCreatePatientDialog() {
      this.createPatientDialog = true;
    },
    closeCreatePatientDialog() {
      this.createPatientDialog = false;
    },
  },

  async mounted() {
    this.patients = await patientsService.getPatients();
  },
};
</script>
