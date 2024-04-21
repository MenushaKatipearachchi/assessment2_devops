import { Item } from "./api/v1/models";

export function createItem(item) {
  return Item.create(item);
}
