import { Notification } from "./api/v1/models";

export function createNotification(notification) {
  return Notification.create(notification);
}

export function getNotificationByEmail(email) {
  return Notification.findOne({ email }).lean();
}

export function getNotificationById(id) {
  return Notification.find({ user_id: id }).lean();
}

export function getNotificationByRole(role) {
  return Notification.findOne({ role }).lean();
}

export function getAllNotifications({ filters = {}, sorts = {}, page, limit }) {
  if (page && limit) {
    return Notification.paginate(filters, {
      page,
      limit,
      sorts,
      lean: true,
    });
  }
  return Notification.find(filters).sort(sorts).lean();
}

export function updateNotificationById(id, data) {
  return Notification.findByIdAndUpdate(id, data, { new: true }).lean();
}

export function deleteNotificationById(id) {
  return Notification.findByIdAndDelete(id).lean();
}
