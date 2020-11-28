export interface CodeType {
  readonly id: number;
  readonly code: string;
  readonly isUse: boolean;
  readonly useAt: Date | null;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
