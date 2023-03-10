import axios from "axios";

const cepService = {
  getAddressFromCep: async (cep) =>
    (await axios.get(`https://viacep.com.br/ws/${cep}/json/`)).data,
};

export default cepService;
