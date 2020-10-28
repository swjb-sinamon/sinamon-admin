export interface UmbrellaType {
  readonly name: string;
  readonly status: 'good' | 'worse';
  readonly createdAt: Date;
}
