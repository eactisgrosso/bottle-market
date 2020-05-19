export interface StorageEvent {
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly sequence: number;
  readonly eventType: string;
  readonly eventData: string;
  readonly timestamp: Date;
}
