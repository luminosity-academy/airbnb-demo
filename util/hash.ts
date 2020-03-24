import bcrypt from "bcrypt";

export const hashPassword = (password: string) =>
  bcrypt.hash(String(password), 10);
