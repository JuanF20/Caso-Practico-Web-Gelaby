export interface LaboratoriesStatusModel {
    lab_status_id: number;
    lab_status_detail: string;
    lab_status_date: string;
    lab_status_notes: string;
    laboratory: any;
}

export interface CreateLaboratoriesStatusModel extends Omit<LaboratoriesStatusModel, 'lab_status_id'> {}

export interface UpdateLaboratoriesStatusModel extends Partial<LaboratoriesStatusModel> {}
