export interface TeachersDetailsModel {
  teacher_detail_id: number;
  teacher_detail_date: string;
  teacher_detail_start_time: string;
  teacher_detail_end_time: string;
  teacher: any;
  subject: any;
  course: any;
}

export interface CreateTeachersDetailsModel
  extends Omit<TeachersDetailsModel, 'teacher_detail_id'> {}

export interface UpdateTeachersDetailsModel
  extends Partial<TeachersDetailsModel> {}
