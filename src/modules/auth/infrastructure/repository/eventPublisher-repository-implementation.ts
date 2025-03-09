import { EventEmitter2 } from '@nestjs/event-emitter';
import { EventPublisherRepository } from '../../application/driver-port/event-publisher.repository';

export class EventPublisherRepositoryImplementation
  implements EventPublisherRepository
{
  constructor(private readonly eventEmitter: EventEmitter2) {}

  publishEvent(eventName: string, event: any): void {
    this.eventEmitter.emit(eventName, event);
  }
}
