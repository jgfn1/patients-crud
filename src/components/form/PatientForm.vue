<template>
  <v-form>
    <span v-if="errorMessage" class="red--text pl-3">*{{ errorMessage }}.</span>
    <v-subheader>Personal Details</v-subheader>
    <v-divider></v-divider>
    <v-row class="mt-3">
      <v-col cols="3">
        <photo-input
          @onPhotoSelected="onPhotoSelected"
          :photo="patient.photo"
        ></photo-input>
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
          prepend-inner-icon="mdi-calendar"
          v-model.lazy="patient.birthdate"
          label="Birthdate"
          outlined
          placeholder="DD/MM/AAAA"
          v-mask="'##/##/####'"
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field
          v-model.lazy="patient.cpf"
          label="CPF"
          outlined
          v-mask="'###.###.###-##'"
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field
          v-model.lazy="patient.cns"
          label="CNS"
          outlined
          v-mask="'### #### #### ####'"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-subheader>Address </v-subheader>
    <v-divider></v-divider>

    <v-row class="mt-3">
      <v-col cols="3">
        <cep-input
          @onAddressRetrievedFromCep="onAddressRetrievedFromCep"
          :defaultCep="getAddress.cep"
        ></cep-input>
      </v-col>
      <v-col cols="3">
        <v-text-field
          v-model.lazy="getAddress.logradouro"
          label="Street"
          outlined
        >
        </v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field v-model.lazy="getAddress.numero" label="Number" outlined>
        </v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field
          v-model.lazy="getAddress.complemento"
          label="Complement"
          outlined
        >
        </v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field
          v-model.lazy="getAddress.bairro"
          label="District"
          outlined
        >
        </v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field
          v-model.lazy="getAddress.localidade"
          label="City"
          outlined
        >
        </v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field v-model.lazy="getAddress.uf" label="State" outlined>
        </v-text-field>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import PhotoInput from "@/components/form/PhotoInput.vue";
import CepInput from "@/components/form/CepInput";
import patientSchema from "@/validation/patientValidation.js";

export default {
  name: "PatientForm",
  components: {
    PhotoInput,
    CepInput,
  },
  props: ["defaultPatient"],
  data: () => ({
    rawPhoto: null,
    errorMessage: "",
    patient: {
      photo: "",
      name: "",
      mothersName: "",
      birthdate: "",
      cpf: "",
      cns: "",
      address: {
        logradouro: "",
        numero: "",
        complemento: "",
        bairro: "",
        localidade: "",
        uf: "",
        cep: "",
      },
    },
  }),
  watch: {
    patient: {
      deep: true,
      handler() {
        this.isFormValid();
      },
    },
  },
  methods: {
    onPhotoSelected(photo) {
      this.patient.photo = photo;
    },
    onAddressRetrievedFromCep(address) {
      this.patient.address = { ...this.patient.address, ...address };
    },
    isFormValid() {
      let formValid = false;
      try {
        formValid = patientSchema.validateSync(this.patient, {
          abortEarly: true,
        });
        this.errorMessage = "";
        this.$emit("onFormValid", this.patient);
      } catch (error) {
        this.errorMessage = error.message;
        this.$emit("onFormValidationError");
      }

      return !!formValid;
    },
  },
  computed: {
    getAddress() {
      return this.patient.address;
    },
  },
  mounted() {
    if (this.defaultPatient) {
      this.patient = JSON.parse(JSON.stringify(this.defaultPatient));
    }
  },
};
</script>
