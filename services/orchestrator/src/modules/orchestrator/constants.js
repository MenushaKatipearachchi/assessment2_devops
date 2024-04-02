import config from "../../config";

export const serviceHosts = {
  auth: config.AUTH_SERVICE_BASE_URL,
  users: config.USER_SERVICE_BASE_URL,
  emails: config.EMAIL_SERVICE_BASE_URL,
  orders: config.ORDER_SERVICE_BASE_URL,
  payments: config.PAYMENT_SERVICE_BASE_URL,
  reviews: config.REVIEW_SERVICE_BASE_URL,
  notification: config.NOTIFICATION_SERVICE_BASE_URL,
  delivery: config.DELIVERY_SERVICE_BASE_URL,
  items: config.SELLER_SERVICE_BASE_URL,
};
