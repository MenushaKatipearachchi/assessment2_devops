import { Payment } from "./api/v1/models";

export function createPayment(payment) {
  return Payment.create(payment);
}

export function getPaymentByRating(rating) {
  return Payment.findOne({ rating }).lean();
}

export function getPaymentById(id) {
  return Payment.findById(id).lean();
}

export function getPaymentsByProductId(productId) {
  return Payment.find({ productId }).lean();
}

export function getAllPayments({ filters = {}, sorts = {}, page, limit }) {
  if (page && limit) {
    return Payment.paginate(filters, {
      page,
      limit,
      sorts,
      lean: true,
    });
  }
  return Payment.find(filters).sort(sorts).lean();
}

export function updatePaymentById(id, data) {
  return Payment.findByIdAndUpdate(id, data, { new: true }).lean();
}

export function deletePaymentById(id) {
  return Payment.findByIdAndDelete(id).lean();
}
