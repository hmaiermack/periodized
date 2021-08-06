//must extend express Request object with currentUser to authenticate a user

declare namespace Express {
    interface Request {
      currentUser?: any;
    }
  }