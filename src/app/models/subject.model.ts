export interface SubjectModel {
  subject_id: number;
  subject_name: string;
  subject_credits : number;
}

export interface CreateSubjectModel extends Omit<SubjectModel, 'subject_id'> {}

export interface UpdateSubjectModel extends Partial<SubjectModel> {}
