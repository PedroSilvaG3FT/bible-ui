import { format } from "date-fns";

export class QueryParamsUtil {
  public static build(obj: { [key: string]: any }): string {
    const queryParams: string[] = [];

    for (const key in obj) {
      if (obj[key] !== undefined) {
        let value = obj[key];

        if (value instanceof Date) value = format(value, "yyyy-MM-dd");

        queryParams.push(
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        );
      }
    }

    return queryParams.join("&");
  }
}
