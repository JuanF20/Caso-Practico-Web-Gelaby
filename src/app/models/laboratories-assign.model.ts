export interface LaboratoriesAssignModel {
    lab_assign_id: number;
    lab_assign_description: string;
    lab_assign_date: string;
    laboratory: any;
    teacher: any;
}

export interface CreateLaboratoriesAssignModel extends Omit<LaboratoriesAssignModel, 'lab_assign_id'> {}

export interface UpdateLaboratoriesAssignModel extends Partial<LaboratoriesAssignModel> {}