import axios from "axios";

const patientsService = {
  getPatients: async () =>
    (await axios.get("http://localhost:3000/patients")).data,
};

export default patientsService;
