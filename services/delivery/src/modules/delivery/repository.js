import { Delivery } from "./api/v1/models";

export function createDelivery(delivery) {
  return Delivery.create(delivery);
}

export function getDeliveryByEmail(email) {
  return Delivery.findOne({ email }).lean();
}

export function getDeliveryById(id) {
  return Delivery.findOne({ order_id: id }).lean();
}

export function getDeliveryByRole(role) {
  return Delivery.findOne({ role }).lean();
}

export function getAllDeliveries({ filters = {}, sorts = {}, page, limit }) {
  if (page && limit) {
    return Delivery.paginate(filters, {
      page,
      limit,
      sorts,
      lean: true,
    });
  }
  return Delivery.find(filters).sort(sorts).lean();
}

export function updateDeliveryById(id, data) {
  return Delivery.findByIdAndUpdate(id, data, { new: true }).lean();
}

export function deleteDeliveryById(id) {
  return Delivery.findByIdAndDelete(id).lean();
}
