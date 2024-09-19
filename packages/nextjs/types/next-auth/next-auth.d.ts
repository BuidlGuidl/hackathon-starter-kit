import "next-auth";
import { DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  export interface Session {
    user: {
      address?: string | null;
      role?: string | null;
      voter?: boolean;
    };
    expires: ISODateString;
  }

  export interface User extends DefaultUser {
    role?: string | null;
    address?: string | null;
  }

  export interface JWT extends DefaultJWT {
    role?: string | null;
    address?: string | null;
  }
}
