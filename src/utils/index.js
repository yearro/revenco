export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
export const isValidPhoneNumber = (phone) => {
  return /^\d{10}$/.test(phone);
}

export const isValidRFC = (rfc) => {
  return /^[a-zA-Z]{3,4}(\d{6})((\D|\d){2,3})?$/.test(rfc);
}
// CUPU800825569, VATL900113MW8, CEL880421GG0, FIM9203207K0, GRA011009MW1
// IBS140210841, ILA020311473, RIPF800312AZ0, AEEV790125SH3, ROCG910518UN3
