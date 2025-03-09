// import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
// import { UserRegisterInEvent } from '../../application/event/user-register-in.event';
// import { NodemailerMailService } from './mail-repository';
// import { Inject } from '@nestjs/common';
// import { IMail } from '../../application/driver-port/IMail';

// @EventsHandler(UserRegisterInEvent)
// export class UserRegisterInEventHandler
//   implements IEventHandler<UserRegisterInEvent>
// {
//   constructor(@Inject('IMail') private readonly mailService: IMail) {}

//   async handle(event: UserRegisterInEvent): Promise<void> {
//     console.log('🚀 ~ handle ~ event:', event);
//     await this.mailService.sendVerificationEmail(event.email, event.token);
//   }
// }

import { OnEvent } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';
import { UserRegisterInEvent } from '../../application/event/user-register-in.event';
import { IMail } from '../../application/driver-port/IMail';
import { Inject } from '@nestjs/common';

@Injectable()
export class UserRegisterInEventHandler {
  constructor(@Inject('IMail') private readonly mailService: IMail) {}

  @OnEvent('user.registered') // Escuchar el evento
  async handle(event: UserRegisterInEvent): Promise<void> {
    await this.mailService.sendVerificationEmail(event.email, event.token);
  }
}
