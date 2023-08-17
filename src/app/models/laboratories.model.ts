export interface LaboratoriesModel {
  lab_id: number;
  lab_name: string;
  lab_computers: number;
  lab_description: string;
}

export interface CreateLaboratoriesModel extends Omit<LaboratoriesModel, 'lab_id'> {}

export interface UpdateLaboratoriesModel extends Partial<LaboratoriesModel> {}