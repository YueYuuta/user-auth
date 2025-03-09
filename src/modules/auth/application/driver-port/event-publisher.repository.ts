export interface EventPublisherRepository {
  publishEvent(eventName: string, event: any): void;
}
