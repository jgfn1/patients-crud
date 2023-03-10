import axios from "axios";

const patientsService = {
  getPatients: async () =>
    (await axios.get("http://localhost:3000/patients")).data,
  createPatient: async (patient) =>
    await axios.post("http://localhost:3000/patients", patient),
  editPatient: async (patient) =>
    await axios.patch(`http://localhost:3000/patients/${patient.id}`, patient),
  deletePatient: async (patient) =>
    await axios.delete(`http://localhost:3000/patients/${patient.id}`),
};

export default patientsService;
