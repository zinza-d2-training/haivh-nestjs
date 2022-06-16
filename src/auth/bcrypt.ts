import * as bcrypt from 'bcrypt';

export function EnCodePassword(rawPassword: string) {
  const SALT = bcrypt.genSaltSync();
  return bcrypt.hashSync(rawPassword, SALT);
}

export function ComparePassword(rawPassword, hashPassword) {
  return bcrypt.compareSync(rawPassword, hashPassword);
}
