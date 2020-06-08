// **************** ROUTE CONSTANT START **************************
// General Page Section
export const DASHBOARD = "/";
export const STORES = "/stores";
export const PRODUCTS = "/products";
export const DELIVERY = "/delivery";
export const LOGIN = "/login";
export const LOGOUT = "/logout";
export const CALLBACK = "/callback";
// **************** ROUTE CONSTANT END **************************

export const CURRENCY = "$";

export const STORE_TYPES = {
  winestore: "Vinoteca",
  winebar: "Wine Bar",
  restaurant: "Restaurant",
  distributor: "Distribuidor",
};

export const PRODUCT_TYPES = [
  { id: "vino", label: "Vinos" },
  { id: "spirits", label: "Spirits" },
  { id: "cerveza", label: "Cervezas" },
  { id: "otros", label: "Más..." },
];

export const CATEGORIES = [
  { value: "vino-tinto", label: "Tinto" },
  { value: "vino-blanco", label: "Blanco" },
  { value: "espumante", label: "Espumante" },
  { value: "vino-rosado", label: "Rosado" },
  { value: "vino-dulce", label: "Dulce" },
  { value: "oporto", label: "Oporto" },
  { value: "vermouth", label: "Vermouth" },
];
