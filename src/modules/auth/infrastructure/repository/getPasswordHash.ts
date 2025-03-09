import { IPasswordHasher } from '../../application/driver-port/IPasswordHasher';
import * as bcrypt from 'bcrypt';

export class BcryptPasswordHasher implements IPasswordHasher {
  async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  async compare(rawPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compareSync(rawPassword, hashedPassword);
  }
}
