import { IPayload } from '../interface/IPayload.interface';

export interface LoginTokenRepository {
  generateToken(payload: IPayload): Promise<string>;
}
