export interface UserType {
  readonly uuid: string;
  readonly id: string;
  readonly name: string;
  readonly department: number;
  readonly studentClass: number;
  readonly studentGrade: number;
  readonly studentNumber: number;
  readonly permission: {
    readonly isAdmin: boolean;
    readonly isTeacher: boolean;
    readonly isSchoolUnion: boolean;
  };
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
