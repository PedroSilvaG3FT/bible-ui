import { AxiosError } from "axios";
import { ToastUtil } from "./toast.util";
import authStore from "@/store/auth.store";
import { toast, ToastOptions } from "react-toastify";
import { IBaseReponse } from "../interfaces/response.interface";

export class ResponseUtil {
  public static handleError(
    error: AxiosError,
    toastOptions: ToastOptions<unknown> = {},
    defaultMessage = `An error occurred while processing the request`
  ) {
    const status = error.response?.status || 0;

    const _showMessage = (message: string) => {
      if (status === 401) {
        authStore.getState().setToken("");

        const toastId = "unauthorized";
        if (!toast.isActive(toastId)) {
          ToastUtil.info("Session expired, please log in again", {
            ...toastOptions,
            toastId,
          });
        }
      } else ToastUtil.error(message, toastOptions);
    };

    const data = error.response?.data as IBaseReponse<null>;

    if (!data.messages.length) _showMessage(defaultMessage);
    else data.messages.forEach((message) => _showMessage(message));
  }
}
