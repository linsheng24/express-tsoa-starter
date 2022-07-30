import prisma from '../lib/db';
import { Encrypt } from '../utils/encrypt';

class UserModel {
  async register(email: string, password: string) {
    const encryptedPassword = await Encrypt.cryptPassword(password);
    return await prisma.user.create({
      data: { email, password: encryptedPassword },
    });
  }
  async findByEmail(email: string) {
    return await prisma.user.findFirst({
      where: {
        email,
        enable: 1,
      },
      orderBy: [
        {
          id: 'desc',
        },
      ],
    });
  }

  async getLoginUser(email: string, password: string) {
    const user = await prisma.user.findFirst({
      where: { email, enable: 1 },
      orderBy: [
        {
          id: 'desc',
        },
      ],
    });
    if (user) {
      const compare = await Encrypt.comparePassword(password, user.password);
      if (compare) {
        return {
          id: user.id,
          email: user.email,
          enable: user.enable,
        };
      }
    }
    return null;
  }
}

export default new UserModel();
