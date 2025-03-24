import { MdCurrencyExchange, MdProductionQuantityLimits } from "react-icons/md";
import { FaCartArrowDown, FaUsers } from "react-icons/fa";

export const cardColors = {
  red: { cardBg: "#fae8e8", iconBg: "#fa0305" },
  purple: { cardBg: "#fde2ff", iconBg: "#760077" },
  green: { cardBg: "#e9feea", iconBg: "#038000" },
  blue: { cardBg: "#ecebff", iconBg: "#0200f8" },
};

export const cardIcons = {
  currency: MdCurrencyExchange,
  products: MdProductionQuantityLimits,
  cart: FaCartArrowDown,
  users: FaUsers,
};

export const createCardData = (cards) => {
  return cards.map(({ title, subtitle, icon, color }) => ({
    title,
    subtitle,
    icon: cardIcons[icon],
    ...cardColors[color],
  }));
};