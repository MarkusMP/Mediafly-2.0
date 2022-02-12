import { Request } from "express";
export interface IGetUserAuthInfoRequest extends Request {
  user?: {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    profile_image: string;
    created_at: string;
    updated_at: string;
    profile_id: string;
  };
}

export interface IGetFileInfoRequest extends Request {
  file?: any;
}
