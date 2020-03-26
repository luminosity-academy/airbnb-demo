import bcrypt from "bcrypt";

export const hashPassword = (password: string) =>
  bcrypt.hash(String(password), 10);

export const comparePassword = (password: string, hash: string) =>
  bcrypt.compare(String(password), hash);
