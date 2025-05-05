export interface User {
  username: string;
  email: string;
  userType: string;
}
export interface UserState {
  user: User | null; // User can be `null` when not logged in
}
