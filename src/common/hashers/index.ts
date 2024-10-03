import bcrypt from "bcrypt";

const saltRounds = 10;

export async function hashPassword(password: string) {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const result = await bcrypt.hash(password, salt);
    return result;
  } catch (err) {
    throw new Error("HashingPasswordError: ");
  }
}

export async function comparePasswords(
  inputPassword: string,
  hashedPassword: string,
) {
  try {
    const result = await bcrypt.compare(inputPassword, hashedPassword);
    return result;
  } catch (err) {
    throw new Error("ComparingPasswordError: ");
  }
}
