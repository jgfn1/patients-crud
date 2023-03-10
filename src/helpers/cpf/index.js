const cpfRegex = /^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}-?[0-9]{2}$/;

function isValidCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, ""); // Remove non-numeric characters
  if (cpf.length !== 11) return false; // CPF must have 11 digits
  // Compute verification digits
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let rest = sum % 11;
  let digit1 = rest < 2 ? 0 : 11 - rest;
  sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  sum += digit1 * 2;
  rest = sum % 11;
  let digit2 = rest < 2 ? 0 : 11 - rest;
  // Check if computed digits match the last two digits of the CPF
  return (
    digit1 === parseInt(cpf.charAt(9)) && digit2 === parseInt(cpf.charAt(10))
  );
}

const cpfHelper = (value) => cpfRegex.test(value) && isValidCPF(value);

export default cpfHelper;
