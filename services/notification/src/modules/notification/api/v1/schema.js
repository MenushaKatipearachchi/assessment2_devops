import { Joi } from "celebrate";
// import { roles } from "@app/constants";

export const createNotificationSchema = Joi.object({
  user_id: Joi.string().optional(),
  notification_title: Joi.string().required(),
  message: Joi.string().required(),
  isRead: Joi.boolean().optional().default(false),
});

export const updateNotificationSchema = Joi.object({
  notification_title: Joi.string().optional(),
  message: Joi.string().optional(),
  isRead: Joi.boolean().optional(),
});
