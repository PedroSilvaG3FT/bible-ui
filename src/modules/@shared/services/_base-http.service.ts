import { APP_HTTP_CLIENT } from "@/modules/@shared/http";

export class BaseHTTPService {
  constructor(public readonly modulePath: string) {}

  //#region: CRUD
  public getAll<IResponse>() {
    return APP_HTTP_CLIENT.get<IResponse>(`/${this.modulePath}`);
  }

  public getById<IResponse>(id: number) {
    return APP_HTTP_CLIENT.get<IResponse>(`/${this.modulePath}/${id}`);
  }

  public delete(id: number) {
    return APP_HTTP_CLIENT.delete(`/${this.modulePath}/${id}`);
  }

  public create<IPayload, IResponse>(payload: IPayload) {
    return APP_HTTP_CLIENT.post<IResponse>(`/${this.modulePath}`, payload);
  }

  public update<IPayload, IResponse>(payload: IPayload, id: number) {
    return APP_HTTP_CLIENT.put<IResponse>(`/${this.modulePath}/${id}`, payload);
  }
  //#endregion: CRUD
}
