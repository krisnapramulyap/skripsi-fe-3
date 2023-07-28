export const formatRp = (number) => {
  return new Intl.NumberFormat("id-ID", {
    maximumSignificantDigits: 4,
    style: "currency",
    currency: "IDR",
  }).format(number);
};
