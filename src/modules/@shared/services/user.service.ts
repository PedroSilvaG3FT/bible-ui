import { APP_HTTP_CLIENT } from "@/modules/@shared/http";
import { IUserProfile } from "../interfaces/user.interface";
import { IBaseReponse } from "../interfaces/response.interface";

export class UserService {
  public static getUserData() {
    return APP_HTTP_CLIENT.get<IBaseReponse<IUserProfile>>(`/user/me`);
  }
}
