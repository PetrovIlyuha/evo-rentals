export const priceFilterDesc = data =>
  data.sort((a, b) => b.totalPrice - a.totalPrice);
export const priceFilterAsc = data =>
  data.sort((a, b) => a.totalPrice - b.totalPrice);
export const dateStartFilterDesc = data =>
  data.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
export const dateStartFilterAsc = data =>
  data.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
export const dateEndFilterAsc = data =>
  data.sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
export const dateEndFilterDesc = data =>
  data.sort((a, b) => new Date(b.endDate) - new Date(a.endDate));
