<template>
  <v-text-field
    v-model="getCep"
    label="CEP"
    outlined
    v-mask="'#####-###'"
    @change="handleCepInput"
  >
  </v-text-field>
</template>

<script>
import cepService from "@/services/cep";

export default {
  name: "AddressInput",
  props: ["defaultCep"],
  data: () => ({
    cep: "",
  }),
  methods: {
    async handleCepInput(cep) {
      let address = await cepService.getAddressFromCep(cep);
      this.$emit("onAddressRetrievedFromCep", address);
    },
  },
  computed: {
    getCep: {
      get() {
        return this.cep || this.defaultCep;
      },
      set(value) {
        this.cep = value;
      },
    },
  },
};
</script>
