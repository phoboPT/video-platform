export default function(amount) {
  const options = {
    currency: 'EUR',
    minimumFractionDigits: 2,
    style: 'currency',
  };
  // if its a whole, dollar amount, leave off the .00
  if (amount % 100 === 0) options.minimumFractionDigits = 0;
  const formatter = new Intl.NumberFormat('pt-PT', options);
  return formatter.format(amount);
}
