export interface IUser {
  _id: string;
  fullName: string;
  userName: string;
  email: string;
  phone: string;
  gender: "male" | "female" | null;
  age: number | null;
  profileImage?: string;
  role: string;
  token: string;
}
