import {
  createOrder,
  getOrder,
  getAllOrders,
  getOrdersByBuyer,
  getOrdersBySeller,
  updateOrderDeliveryStatus,
  updateOrderPaymentStatus,
  cancelOrder,
  refundOrder,
} from "../../repository";
import { Order } from "./models";

export const serviceCreateOrder = (order) => {
  return createOrder(order);
};

export const serviceGetOrder = (orderId) => {
  return getOrder(orderId);
};

export const serviceGetAllOrders = (filters, sorts, page, limit) => {
  return getAllOrders(filters, sorts, page, limit);
};

export const serviceGetOrdersByBuyer = (
  userId,
  filters,
  sorts,
  page,
  limit
) => {
  console.log(userId);

  return getOrdersByBuyer(userId, filters, sorts, page, limit);
};

export const serviceGetOrdersBySeller = (
  userId,
  filters,
  sorts,
  page,
  limit
) => {
  console.log(userId);
  return getOrdersBySeller(userId, filters, sorts, page, limit);
};

export const serviceUpdateOrderDeliveryStatus = (orderId, status) => {
  return updateOrderDeliveryStatus(orderId, status);
};

export const serviceUpdateOrderPaymentStatus = (orderId, status) => {
  return updateOrderPaymentStatus(orderId, status);
};

export const serviceCancelOrder = (orderId, productId, reason) => {
  return cancelOrder(orderId, productId, reason);
};

export const serviceRefundOrder = (orderId) => {
  return refundOrder(orderId);
};
