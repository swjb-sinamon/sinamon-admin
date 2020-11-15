export interface UmbrellaType {
  readonly name: string;
  readonly status: 'good' | 'worse';
  readonly createdAt: Date;
}

export interface UmbrellaWithRentalType extends UmbrellaType {
  readonly rental: {
    readonly lender: string;
    readonly expiryDate: Date;
    readonly isExpire: string;
  };
}
