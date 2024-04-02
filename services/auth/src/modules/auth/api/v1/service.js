/* eslint-disable import/named */

import crypto from "crypto";
import bcrypt from "bcryptjs";
import createError from "http-errors";
import { traced } from "@sliit-foss/functions";
import {
  createUser,
  getUserByEmail,
  getUserById,
  //  eslint-disable-next-line no-unused-vars
  sendVerificationEmail,
  verifyUser,
} from "../../../../services";
import { errors, verify, generateTokens } from "../../../../utils";
import { constructVerificationEmailPayload } from "./mappers";

export const serviceLogin = async ({ email, password }) => {
  const user = await getUserByEmail(email);
  if (!user) throw errors.invalid_email;
  if (!user.is_active) throw errors.user_deactivated;

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw errors.invalid_password;
  if (!user.is_verified) throw errors.unverified_user;

  return traced(generateTokens)(user);
};

export const serviceRegister = async ({ name, email, password, address }) => {
  const user = await getUserByEmail(email);
  if (user) {
    throw createError(400, "User already exists");
  }
  const code = crypto.randomUUID();
  sendVerificationEmail(constructVerificationEmailPayload(name, email, code));

  return createUser({
    name,
    email,
    password,
    address,
    verification_code: code,
  });
};

export const serviceRefreshToken = async (token) => {
  const decodedRefreshToken = verify(token);
  const decodedUser = verify(decodedRefreshToken.access_token, true);
  const user = await getUserById(decodedUser._id);
  if (!user) {
    throw errors.invalid_token;
  }
  if (!user.is_active) {
    throw errors.user_deactivated;
  }
  return traced(generateTokens)(user);
};

export const serviceVerifyUser = async (code) => {
  const result = await verifyUser(code);
  if (!result.matchedCount) {
    throw errors.invalid_code;
  }
  return;
};

//  eslint-disable-next-line no-unused-vars
export const serviceLogout = (token) => {};
