import mongoose from "mongoose";
import { Order } from "./api/v1/models";
import { getOrderAggregateOptions } from "./helper";

export function createOrder(order) {
  return Order.create(order);
}

export async function getOrder(orderId) {
  const aggregateOptions = getOrderAggregateOptions();

  aggregateOptions.push({
    $match: {
      _id: mongoose.Types.ObjectId(orderId),
    },
  });

  const order = await Order.aggregate(aggregateOptions).exec();

  return order;
}

export function getAllOrders(filters = {}, sorts = {}, page, limit) {
  const aggregateOptions = getOrderAggregateOptions(
    filters,
    sorts,
    page,
    limit
  );

  const orders = Order.aggregate(aggregateOptions).exec();

  return orders;
}

export function getOrdersByBuyer(
  userId,
  filters = {},
  sorts = {},
  page,
  limit
) {
  const aggregateOptions = getOrderAggregateOptions(
    filters,
    sorts,
    page,
    limit
  );

  console.log("buyer", userId);

  // Find the index of the first $lookup stage in aggregateOptions
  const lookupStageIndex = aggregateOptions.findIndex(
    (stage) => stage.$lookup !== undefined
  );

  // Insert the $match stage before the $lookup stages
  aggregateOptions.splice(lookupStageIndex, 0, {
    $match: {
      buyer: mongoose.Types.ObjectId(userId),
    },
  });

  return Order.aggregate(aggregateOptions).exec();
}

export function getOrdersBySeller(
  sellerId,
  filters = {},
  sorts = {},
  page,
  limit
) {
  const aggregateOptions = getOrderAggregateOptions(
    filters,
    sorts,
    page,
    limit
  );

  aggregateOptions.push({
    $unwind: "$productsDetails",
  });

  aggregateOptions.push({
    $match: {
      "productsDetails.seller._id": mongoose.Types.ObjectId(sellerId),
    },
  });

  aggregateOptions.push({
    $project: {
      products: 0, // exclude products field
    },
  });

  return Order.aggregate(aggregateOptions).exec();
}

export async function updateOrderDeliveryStatus(orderId, status) {
  const order = await Order.findById(orderId).exec();

  order.status = status;
  if (status === "Delivered") {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
  }
  return order.save();
}

export async function updateOrderPaymentStatus(orderId, isPaid) {
  const updateOrder = await Order.findByIdAndUpdate(
    orderId,
    { isPaid: isPaid, paidAt: Date.now() },
    { new: true }
  );

  return updateOrder;
}

export async function cancelOrder(orderId, productId, reason) {
  try {
    const order = await Order.findById(orderId);

    if (order.status !== "Pending") {
      throw new Error("Order already confirmed");
    }

    order.products.forEach((product) => {
      if (product.product == productId) {
        product.cancellationDetails.isRequested = true;
        product.cancellationDetails.reason = reason;
      }
    });

    order.save();

    return order;
  } catch (error) {
    throw new Error(error.message);
  }
}

export function refundOrder(orderId) {
  const order = Order.findById(orderId);

  //  put refund business logic here

  order.cancellationDetails.isRefunded = true;
  return order.save().lean();
}
