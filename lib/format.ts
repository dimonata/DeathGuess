export const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value);

export const formatPercent = (value: number) => {
  const maximumFractionDigits = value < 10 && value % 1 !== 0 ? 1 : 0;
  return new Intl.NumberFormat("en-US", { maximumFractionDigits }).format(value);
};
