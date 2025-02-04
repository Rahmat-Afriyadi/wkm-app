export function formatCurrency(value) {
  const formattedValue = value
    .replace(/\D/g, "") // Remove all non-digit characters
    .replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add commas after every 3 digits
  return `Rp ${formattedValue}`; // Add currency symbol (e.g., Rp)
}
