const { adminRoutes } = require("./adminRoutes");
const { sellerRoutes } = require("./sellerRoutes");

export const privateRoutes = [...adminRoutes, ...sellerRoutes];
