export interface UsersModel {
  user_id: number;
  user_fullname: string;
  user_username: string;
  user_email: string;
  user_password: string;
  user_role: string;
}

export interface CreateUsersModel extends Omit<UsersModel, 'user_id'> {}

export interface UpdateUsersModel extends Partial<UsersModel> {}
