import { Item } from "./api/v1/models";

export function createItem(item) {
  return Item.create(item);
}

export function getItemById(id) {
  return Item.findById(id).lean();
}

export function getAllItems({ filters = {}, sorts = {}, page, limit }) {
  if (page && limit) {
    return Item.paginate(filters, {
      page,
      limit,
      sorts,
      lean: true,
    });
  }
  return Item.find(filters).sort(sorts).lean();
}

export function updateItemById(id, data) {
  return Item.findByIdAndUpdate(id, data, { new: true }).lean();
}
