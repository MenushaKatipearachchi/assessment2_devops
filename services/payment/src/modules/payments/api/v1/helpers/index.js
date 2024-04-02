// import bcrypt from "bcryptjs";

// export const hashPasswordIfProvided = async (user) => {
//   if (!user.password) {
//     return user;
//   }

//   if (user.password.match(/^\$2[ayb]\$.{56}$/)) {
//     return user;
//   }

//   const hashedPassword = await bcrypt.hash(user.password, 10);
//   const newUser = { ...user, password: hashedPassword };
//   return newUser;
// };
