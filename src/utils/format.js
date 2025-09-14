export const formatMileage = (value) => {
  if (typeof value !== 'number') value = Number(value) || 0;
  return new Intl.NumberFormat('uk-UA').format(value).replace(/\u00A0/g, ' ');
};
