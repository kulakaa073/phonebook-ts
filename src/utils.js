export function formatPhoneNumber(number) {
  const normalizedNumber = normalizePhoneNumber(number);
  return `${normalizedNumber.slice(0, 3)}-${normalizedNumber.slice(
    3,
    5
  )}-${normalizedNumber.slice(5)}`;
}

export function normalizePhoneNumber(number) {
  return number.replace(/[+\s()-]+/g, '');
}
