export type User = {
  _id: string;
  name: string;
  email: string;
  photo: string;
  active: boolean;
};

export type AuthData = {
  token: string;
  user: User;
};

export type SignInBody = {
  email: string;
  password: string;
};
