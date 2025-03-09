export interface EventPublisher {
  publishEvent(eventName: string, event: any): void;
}
