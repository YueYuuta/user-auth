import { IPayload } from '../interface/IPayload.interface';

export interface ITokenService {
  generateToken(payload: IPayload): Promise<string>;
}
