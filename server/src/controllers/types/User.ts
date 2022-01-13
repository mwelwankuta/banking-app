export interface LoginInput {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  account: string;
  avatar: string;
  password: string;
  createdAt?: string;
  updatedAt?: string;
}
