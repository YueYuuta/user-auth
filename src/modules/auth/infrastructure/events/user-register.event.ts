import { OnEvent } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';
import { UserRegisterEvent } from '../../application/event/user-register.event';
import { MailRepository } from '../../application/driver-port/mail.repository';
import { Inject } from '@nestjs/common';

@Injectable()
export class UserRegisterInEventHandler {
  constructor(
    @Inject('MailRepository') private readonly mailService: MailRepository,
  ) {}

  @OnEvent('user.registered') // Escuchar el evento
  async handle(event: UserRegisterEvent): Promise<void> {
    await this.mailService.sendVerificationEmail(event.email, event.token);
  }
}
