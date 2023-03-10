<template>
  <v-row>
    <v-col cols="3">
      <v-text-field
        v-model="address.cep"
        label="CEP"
        outlined
        @change="handleCepInput"
      >
      </v-text-field>
    </v-col>
    <v-col cols="3">
      <v-text-field v-model="address.logradouro" label="Street" outlined>
      </v-text-field>
    </v-col>
    <v-col cols="3">
      <v-text-field v-model="address.number" label="Number" outlined>
      </v-text-field>
    </v-col>
    <v-col cols="3">
      <v-text-field v-model="address.complemento" label="Complement" outlined>
      </v-text-field>
    </v-col>
    <v-col cols="3">
      <v-text-field v-model="address.bairro" label="District" outlined>
      </v-text-field>
    </v-col>
    <v-col cols="3">
      <v-text-field v-model="address.localidade" label="City" outlined>
      </v-text-field>
    </v-col>
    <v-col cols="3">
      <v-text-field v-model="address.uf" label="State" outlined> </v-text-field>
    </v-col>
  </v-row>
</template>

<script>
import cepService from "@/services/cep";

export default {
  name: "AddressInput",
  data: () => ({
    address: {
      logradouro: "",
      number: "",
      complemento: "",
      bairro: "",
      localidade: "",
      uf: "",
      cep: "",
    },
  }),
  methods: {
    async handleCepInput(cep) {
      this.address = await cepService.getAddressFromCep(cep);
      this.$emit("onAddressRetrievedFromCep", this.address);
    },
  },
};
</script>
