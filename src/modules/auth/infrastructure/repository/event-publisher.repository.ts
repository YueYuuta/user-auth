import { EventEmitter2 } from '@nestjs/event-emitter';
import { IEventPublisher } from '../../application/driver-port/IEventPublusher';

export class NestEventPublisher implements IEventPublisher {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  publishEvent(eventName: string, event: any): void {
    this.eventEmitter.emit(eventName, event);
  }
}
