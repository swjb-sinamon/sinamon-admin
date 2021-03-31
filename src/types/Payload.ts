export interface ProfileType {
  readonly uuid: string;
  readonly id: string;
  readonly name: string;
  readonly department: number;
  readonly studentGrade: number;
  readonly studentClass: number;
  readonly studentNumber: number;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly permission: {
    readonly isAdmin: boolean;
    readonly isTeacher: boolean;
    readonly isSchoolUnion: boolean;
  };
}

export interface CodeType {
  readonly id: number;
  readonly code: string;
  readonly isUse: boolean;
  readonly useAt: Date | null;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

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

export interface SubjectType {
  readonly id: number;
  readonly subject: string;
  readonly teacher: string;
  readonly url: string;
}
