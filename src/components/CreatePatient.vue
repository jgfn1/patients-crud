<template>
  <v-dialog v-model="dialog" persistent>
    <v-card>
      <v-card-title class="black lighten white--text">
        {{ formTitle }}
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
        <v-btn @click="close" text color="dark grey">Cancel</v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="save" :loading="saveButtonLoading" text color="black">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "CreatePaient",
  data: () => ({
    patient: {
      photo: "",
      name: "",
      mothersName: "",
      birthdate: "",
      cpf: "",
      cns: "",
      address: "",
    },
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
  computed: {
    formTitle() {
      return this.editedPatientIndex === -1 ? "Create patient" : "Edit patient";
    },
  },
};
</script>

<style></style>
