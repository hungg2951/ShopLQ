interface TUserUpdate {
  id: string;
  [key: string]: string | number | boolean;
}
 interface TUsersType {
  _id: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
  role: string;
  coin: number;
  status: boolean;
  isVerified: boolean;
}
