declare module Express {
  export interface Request {
    firebaseUid: string;
  }
}
