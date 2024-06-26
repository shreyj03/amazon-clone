export function formatCurrency(princeCents) {
  return (Math.round(princeCents)/100).toFixed(2);
}