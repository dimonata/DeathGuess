export const formatNumber = (value: number) =>
  new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 }).format(value);

export const formatPercent = (value: number) => {
  const maximumFractionDigits = value < 10 && value % 1 !== 0 ? 1 : 0;
  return new Intl.NumberFormat("pt-BR", { maximumFractionDigits }).format(value);
};
