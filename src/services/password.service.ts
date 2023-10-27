import bcrypt from 'bcrypt';

class PasswordService {
  async getHashedPassword({ password }: { password: string }): Promise<string> {
    const hashedPassword = await bcrypt.hash(
      password,
      +process.env.SALT_ROUNDS,
    );
    return hashedPassword;
  }

  checkPassword({ password, hash }): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}

const passwordService = new PasswordService();
export { passwordService, PasswordService };
