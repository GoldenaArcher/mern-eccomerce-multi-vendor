import { allNav } from "./allNav";

export const getNav = (role) => allNav.filter((nav) => nav.role === role);
