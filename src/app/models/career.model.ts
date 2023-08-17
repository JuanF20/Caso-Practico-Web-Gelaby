export interface CareerModel {
  career_id: number;
  career_name: string;
  career_acronym: string;
  career_duration: number;
}

export interface CreateCareerModel extends Omit<CareerModel, 'career_id'> {}

export interface UpdateCareerModel extends Partial<CareerModel> {}
