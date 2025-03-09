import { EventEmitter2 } from '@nestjs/event-emitter';
import { EventPublisher } from '../../application/driver-port/IEventPublusher';

export class NestEventPublisher implements EventPublisher {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  publishEvent(eventName: string, event: any): void {
    this.eventEmitter.emit(eventName, event);
  }
}
