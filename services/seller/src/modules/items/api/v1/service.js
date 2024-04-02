import { createItem, getAllItems, getItemById, updateItemById, deleteItemById } from "../../repository";

export const serviceCreateItem = (review) => {
  return createItem(review);
};

export const serviceGetItems = (filters, sorts, page, limit) => {
  return getAllItems({ filters, sorts, page, limit });
};

export const serviceGetItemById = (id) => {
  return getItemById(id);
};

export const serviceUpdateItemById = (id, data) => {
  return updateItemById(id, data);
};

export const serviceDeleteItemById = (id) => {
  return deleteItemById(id);
};
