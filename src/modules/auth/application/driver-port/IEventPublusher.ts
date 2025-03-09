export interface IEventPublisher {
  publishEvent(eventName: string, event: any): void;
}
