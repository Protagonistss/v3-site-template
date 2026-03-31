export interface LoginCommand {
  username: string;
  password: string;
}

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  roles: string[];
  permissions: string[];
}

export interface LoginResult {
  token: string;
  userInfo: UserProfile;
}
