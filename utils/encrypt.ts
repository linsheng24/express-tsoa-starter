import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

export const Encrypt = {
  cryptPassword: (password: string) => {
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => hash);
  },
  comparePassword: (password: string, hashPassword: string) => {
    return bcrypt.compare(password, hashPassword).then(resp => resp);
  },
  createToken: async () => {
    const token = crypto.randomBytes(32).toString('hex');
    const hash = bcrypt.genSalt(10).then(salt => bcrypt.hash(token, salt));
    return hash;
  },
};
