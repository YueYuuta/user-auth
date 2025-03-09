export class UserRegisterEvent {
  constructor(
    public readonly email: string,
    public readonly token: string,
  ) {}
}
