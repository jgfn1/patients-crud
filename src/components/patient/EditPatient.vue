<template>
  <v-dialog v-model="isActive" persistent>
    <v-card>
      <v-card-title class="black lighten white--text">
        Edit patient
      </v-card-title>
      <v-card-subtitle>
        <br />
      </v-card-subtitle>

      <v-card-text>
        <v-row>
          <v-col cols="3">
            <v-text-field v-model="editedPatient['name']" label="Name" outlined>
            </v-text-field>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider></v-divider>
      <v-card-actions>
        <v-btn @click="closeDialog" text color="dark grey">Cancel</v-btn>
        <v-spacer></v-spacer>
        <v-btn
          @click="savePatient"
          :loading="saveButtonLoading"
          text
          color="black"
        >
          save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "CreatePaient",
  props: ["active", "patient"],
  data: () => ({
    saveButtonLoading: false,
    editedPatient: {
      photo: "",
      name: "",
      mothersName: "",
      birthdate: "",
      cpf: "",
      cns: "",
      address: "",
    },
  }),
  methods: {
    async savePatient() {
      this.saveButtonLoading = true;
      if (this.editedIndex > -1) {
        //edit
      } else {
        //create
      }
      this.saveButtonLoading = false;
      this.key++;
      this.closeDialog();
    },
    closeDialog() {
      this.$emit("closeDialog");
    },
  },
  computed: {
    isActive() {
      return this.active;
    },
  },
};
</script>

<style></style>
