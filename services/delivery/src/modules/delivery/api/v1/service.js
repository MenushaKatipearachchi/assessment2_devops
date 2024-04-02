import {
  createDelivery,
  getAllDeliveries,
  getDeliveryById,
  updateDeliveryById,
  deleteDeliveryById,
} from "../../repository";

// eslint-disable-next-line
export const serviceCreateDelivery = async (delivery) => {
  return createDelivery(delivery);
};

export const serviceGetDeliveries = (filters, sorts, page, limit) => {
  return getAllDeliveries({ filters, sorts, page, limit });
};

export const serviceGetDeliveryById = (id) => {
  const data = getDeliveryById(id);
  return data;
};

// eslint-disable-next-line
export const serviceUpdateDeliveryById = async (id, data) => {
  return updateDeliveryById(id, data);
};

export const serviceDeleteDeliveryById = (id) => {
  return deleteDeliveryById(id);
};
