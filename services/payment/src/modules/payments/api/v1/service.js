import {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePaymentById,
  deletePaymentById,
} from "../../repository";

// import { hashPasswordIfProvided } from "./helpers";

export const serviceCreatePayment = (payment) => {
  // if (!payment.rating) throw new Error("Rating is required");
  // await hashPasswordIfProvided(payment);
  return createPayment(payment);
};

export const serviceGetPayments = (filters, sorts, page, limit) => {
  return getAllPayments({ filters, sorts, page, limit });
};

export const serviceGetPaymentById = (id) => {
  return getPaymentById(id);
};

export const serviceUpdatePaymentById = (id, data) => {
  // await hashPasswordIfProvided(data);
  return updatePaymentById(id, data);
};

export const serviceDeletePaymentById = (id) => {
  return deletePaymentById(id);
};
