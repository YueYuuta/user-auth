import { LoginTokenRepository } from '../../application/driver-port/login-token.repository';
import { JwtService } from '@nestjs/jwt';
import { IPayload } from '../../application/interface/IPayload.interface';

export class LoginTokenRepositoryImplementation
  implements LoginTokenRepository
{
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(payload: IPayload): Promise<string> {
    return await this.jwtService.sign(payload);
  }

  verifyToken(token: string): Promise<string> {
    return this.jwtService.verify(token);
  }
}
