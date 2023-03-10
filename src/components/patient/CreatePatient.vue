<template>
  <v-dialog v-model="isActive" persistent>
    <v-form>
      <v-card>
        <v-card-title class="black lighten white--text">
          Create patient
        </v-card-title>

        <v-card-text class="mt-6">
          <v-subheader>Personal Details</v-subheader>
          <v-divider></v-divider>
          <v-row class="mt-3">
            <v-col cols="3">
              <photo-input @onPhotoSelected="onPhotoSelected"></photo-input>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model.lazy="patient.name"
                label="Full name"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model.lazy="patient.mothersName"
                label="Mother's full name"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model.lazy="patient.birthdate"
                label="Birthdate"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model.lazy="patient.cpf"
                label="CPF"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model.lazy="patient.cns"
                label="CNS"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <v-subheader>Address </v-subheader>
          <v-divider></v-divider>
          <address-input
            class="mt-3"
            @onAddressRetrievedFromCep="onAddressRetrievedFromCep"
          ></address-input>
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
            :disabled="!isFormValid"
          >
            save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import PhotoInput from "@/components/form/PhotoInput.vue";
import AddressInput from "@/components/form/AddressInput";
import patientSchema from "@/validation/patientValidation.js";

export default {
  name: "CreatePaient",
  props: ["active"],
  components: {
    PhotoInput,
    AddressInput,
  },
  data: () => ({
    saveButtonLoading: false,
    rawPhoto: null,
    patient: {
      photo: "",
      name: "",
      mothersName: "",
      birthdate: "",
      cpf: "",
      cns: "",
      address: {
        logradouro: "",
        number: "",
        complemento: "",
        bairro: "",
        localidade: "",
        uf: "",
        cep: "",
      },
    },
  }),
  methods: {
    async savePatient() {
      this.saveButtonLoading = true;
      try {
        await patientSchema.validate(this.patient, { abortEarly: false });
        // validation passed, save patient
        if (this.editedIndex > -1) {
          //edit
        } else {
          //create
        }
        this.saveButtonLoading = false;
        this.key++;
        this.closeDialog();
      } catch (error) {
        // validation failed, handle errors
        console.log(error);
      }
    },
    closeDialog() {
      this.$emit("closeDialog");
      this.$nextTick(() => {
        this.editedItem = JSON.parse(JSON.stringify(this.patient));
        this.editedIndex = -1;
      });
    },
    onPhotoSelected(photo) {
      this.patient.photo = photo;
    },
    onAddressRetrievedFromCep(address) {
      this.patient.address = { ...address };
    },
  },
  computed: {
    isActive() {
      return this.active;
    },
    patientAddress() {
      return this.patient.address;
    },
    isFormValid() {
      return patientSchema.isValidSync(this.patient);
    },
  },
};
</script>

<style></style>
