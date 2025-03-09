export class User {
  constructor(
    public readonly username: string,
    private readonly passwordHash: string,
    public email: string,
    public isActive: boolean = true,
    public isVerified: boolean = false,
    public readonly id?: number,
  ) {}

  // ensureAccountIsActive(): void {
  //   if (!this.isActive) {
  //     throw new Error('Account is inactive or blocked');
  //   }
  // }

  get getPasswordHash(): string {
    return this.passwordHash;
  }

  verify(): void {
    if (this.isVerified) {
      throw new Error('User is already verified.');
    }
    this.isVerified = true;
  }

  // get isAccountVerified(): boolean {
  //   return this.isVerified;
  // }
}
