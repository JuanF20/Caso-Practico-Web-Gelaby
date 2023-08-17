export interface TeacherModel {
  teacher_id: number;
  teacher_identification: string;
  teacher_first_name: string;
  teacher_last_name: string;
  teacher_institutional_email: string;
  teacher_phone_number: string;
}

export interface CreateTeacherModel extends Omit<TeacherModel, 'teacher_id'> {}

export interface UpdateTeacherModel extends Partial<TeacherModel> {}
