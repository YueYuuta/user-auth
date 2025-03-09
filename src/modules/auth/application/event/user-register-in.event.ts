export class UserRegisterInEvent {
  constructor(
    public readonly email: string,
    public readonly token: string,
  ) {}
}
