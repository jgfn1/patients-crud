<template>
  <v-container fluid class="fill-height">
    <v-row justify="center">
      <v-col lg="6" md="8" sm="10" xs="10">
        <v-card>
          <v-card-title>
            Patients
            <v-spacer></v-spacer>
            <v-btn @click="dialog = true" small text color="black">
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
              <template v-slot:[`item.actions`]="{ item }">
                <v-icon
                  small
                  color="black"
                  class="mr-2"
                  @click="editItem(item)"
                >
                  mdi-pencil
                </v-icon>
                <v-icon small color="dark grey" @click="deleteItem(item)">
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
          <v-btn color="red" small text @click="confirmItemDeletion"
            >Delete</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-btn dark small absolute right style="top: 2vh" @click="doLogout()">
      Logout
      <v-icon>mdi-exit-to-app</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "PatientsTable",
  data: () => ({
    dialog: false,
    dialogDelete: false,
    saveButtonLoading: false,
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
    async save() {
      this.saveButtonLoading = true;
      if (this.editedIndex > -1) {
        //edit
      } else {
        //create
      }
      this.saveButtonLoading = false;
      this.key++;
      this.close();
    },

    editItem(item) {
      this.editedIndex = this.patients.indexOf(item);
      console.log("edited index");
      console.log(this.editedIndex);
      this.editedItem = JSON.parse(
        JSON.stringify(this.patients[this.editedIndex])
      );
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.patients.indexOf(item);
      this.editedItem = JSON.parse(JSON.stringify(item));
      this.dialogDelete = true;
    },

    confirmItemDeletion() {
      this.patients.splice(this.editedIndex, 1);

      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = JSON.parse(JSON.stringify(this.patient));
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = JSON.parse(JSON.stringify(this.patient));
        this.editedIndex = -1;
      });
    },
  },

  async mounted() {
    //  load patients
  },
};
</script>
