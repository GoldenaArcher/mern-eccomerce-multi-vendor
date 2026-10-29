import { BadRequestError } from "@/errors";
import { GetAllProductsOptions } from "@/types/product";

const stringParam = (query: Record<string, unknown>, name: string): string | undefined => {
  const value = query[name];
  if (value === undefined) return undefined;
  if (typeof value !== "string") throw new BadRequestError(`${name} must be a string.`);
  return value.trim();
};

export const parseProductQuery = (query: Record<string, unknown>): GetAllProductsOptions => {
  const search = stringParam(query, "search") || "";
  if (search.length > 200) throw new BadRequestError("Search must be 200 characters or fewer.");
  const categories = (stringParam(query, "categories") || "").split(",").map((id) => id.trim()).filter(Boolean);
  if (categories.some((id) => !/^[a-f\d]{24}$/i.test(id))) throw new BadRequestError("Invalid category ID.");
  const integer = (name: string, fallback: number, maximum: number) => {
    const value = stringParam(query, name);
    if (value === undefined || value === "") return fallback;
    const number = Number(value);
    if (!/^\d+$/.test(value) || !Number.isSafeInteger(number) || number < 1 || number > maximum) {
      throw new BadRequestError(`${name} must be an integer between 1 and ${maximum}.`);
    }
    return number;
  };
  const price = (name: string) => {
    const value = stringParam(query, name);
    if (value === undefined || value === "") return undefined;
    const number = Number(value);
    if (!Number.isFinite(number) || number < 0) throw new BadRequestError(`${name} must be a non-negative number.`);
    return number;
  };
  const sortBy = stringParam(query, "sortBy") || "created-desc";
  if (!["created-desc", "created-asc", "price-asc", "price-desc"].includes(sortBy)) throw new BadRequestError("Invalid product sort order.");
  const priceLow = price("priceLow");
  const priceHigh = price("priceHigh");
  if (priceLow !== undefined && priceHigh !== undefined && priceLow > priceHigh) throw new BadRequestError("Minimum price cannot exceed maximum price.");
  return { search, categories, page: integer("page", 1, 1000000), limit: integer("limit", 12, 100), sortBy, priceLow, priceHigh };
};

export const escapeProductSearch = (search: string): string => search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
