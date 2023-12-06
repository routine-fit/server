export interface FirebaseUser {
  uid: string;
  email: string;
  password: string;
  type: 'ADMIN' | 'NORMAL';
}
