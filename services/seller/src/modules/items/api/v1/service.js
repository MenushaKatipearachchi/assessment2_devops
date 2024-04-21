import { createItem } from "../../repository";

export const serviceCreateItem = (review) => {
  return createItem(review);
};

export const serviceGetItems = (filters, sorts, page, limit) => {
  return getAllItems({ filters, sorts, page, limit });
};

export const serviceGetItemById = (id) => {
  return getItemById(id);
};
