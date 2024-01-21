import { Query as MongooseQuery } from 'mongoose';

declare module 'mongoose' {
  export interface Query {
    cache: () => Promise<MongooseQuery>;
    useCache: boolean;
    hashKey: string;
  }
}

interface IUserBody {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    export interface Request {
      user?: IUserBody;
    }
  }
}
