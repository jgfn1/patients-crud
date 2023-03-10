import * as yup from "yup";
import cnsHelper from "@/helpers/cns";
import cpfHelper from "@/helpers/cpf";

const patientSchema = yup.object().shape({
  photo: yup.string(),
  name: yup.string().required("Please enter a name"),
  mothersName: yup.string().required("Please enter the mother's name"),
  birthdate: yup.string().required("Please enter a birthdate"),
  cpf: yup
    .string()
    .required("Please enter a CPF")
    .test("cpf", "Invalid CPF number", cpfHelper),
  cns: yup
    .string()
    .required("Please enter a CNS")
    .test("validate-cns", "Invalid CNS", cnsHelper.validateCns),
  address: yup.object().shape({
    logradouro: yup.string().required("Please enter the address"),
    number: yup.string().required("Please enter the number"),
    complemento: yup.string(),
    bairro: yup.string().required("Please enter the neighborhood"),
    localidade: yup.string().required("Please enter the city"),
    uf: yup.string().required("Please enter the state"),
    cep: yup.string().required("Please enter the zip code"),
  }),
});

export default patientSchema;
