export interface AuthType {
  username?: string;
  email: string;
  password: string;
  avatar?: string;
  role?: string;
  coin?: number;
  status?: boolean;
  code?:number
}

export interface UsersType {
  _id:string;
  username: string;
  email: string;
  password: string;
  avatar: string;
  role: string;
  coin: number;
  status: boolean;
  isVerified:boolean
}