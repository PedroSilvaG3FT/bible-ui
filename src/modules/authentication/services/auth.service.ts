import { APP_HTTP_CLIENT } from "@/modules/@shared/http";
import { IUserProfile } from "@/modules/@shared/interfaces/user.interface";
import { IBaseReponse } from "@/modules/@shared/interfaces/response.interface";
import {
  ISignIn,
  ISignUp,
  ISignInResponse,
} from "../interfaces/auth.interface";

export class AuthService {
  public static signIn(payload: ISignIn) {
    return APP_HTTP_CLIENT.post<IBaseReponse<ISignInResponse>>(
      `/auth/sign-in`,
      payload
    );
  }
  public static signUp(payload: ISignUp) {
    return APP_HTTP_CLIENT.post<IBaseReponse<IUserProfile>>(
      `/auth/sign-up`,
      payload
    );
  }
}
