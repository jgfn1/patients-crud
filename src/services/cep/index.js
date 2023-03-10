import axios from "axios";

const cepService = {
  getAddressFromCep: async (cep) => {
    let address = (await axios.get(`https://viacep.com.br/ws/${cep}/json/`))
      .data;
    return {
      logradouro: address.logradouro,
      complemento: address.complemento,
      bairro: address.bairro,
      localidade: address.localidade,
      uf: address.uf,
      cep: address.cep,
    };
  },
};

export default cepService;
