import { OnEvent } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';

import { IMail } from '../../application/driver-port/IMail';
import { Inject } from '@nestjs/common';
import { UserLoggedInEvent } from '../../application/event/user-logged-in.event';

@Injectable()
export class UserLoggedInEventHandler {
  constructor(@Inject('IMail') private readonly mailService: IMail) {}

  @OnEvent('user.loggedin') // Escuchar el evento de login
  async handle(event: UserLoggedInEvent): Promise<void> {
    console.log('🚀 ~ User Logged In Event:', event);
    await this.mailService.sendLoginNotification(event.email);
  }
}
