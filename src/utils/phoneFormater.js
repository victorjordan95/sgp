export const formatPhone = phone =>
  `(${phone.substring(0, 2)})${phone.substring(2, 6)}-${phone.substring(
    6,
    11
  )}`;

export const formatCellphone = phone =>
  `(${phone.substring(0, 2)})${phone.substring(2, 7)}-${phone.substring(
    7,
    11
  )}`;
