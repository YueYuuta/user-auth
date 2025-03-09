import { PasswordHasherRepository } from '../../application/driver-port/password-hasher.repository';
import * as bcrypt from 'bcrypt';

export class PasswordHasherRepositoryImplementation
  implements PasswordHasherRepository
{
  async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  async compare(rawPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compareSync(rawPassword, hashedPassword);
  }
}
