export const validateDate = (date: string): boolean => {
  const re = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/([12][0-9]{3})$/
  return re.test(date)
}
