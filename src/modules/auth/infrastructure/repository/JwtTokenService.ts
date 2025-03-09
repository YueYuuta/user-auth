import { ITokenService } from '../../application/driver-port/ITokenService';
import { JwtService } from '@nestjs/jwt';
import { IPayload } from '../../application/interface/IPayload.interface';

export class JwtTokenService implements ITokenService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(payload: IPayload): Promise<string> {
    return await this.jwtService.sign(payload);
  }

  verifyToken(token: string): Promise<string> {
    return this.jwtService.verify(token);
  }
}
