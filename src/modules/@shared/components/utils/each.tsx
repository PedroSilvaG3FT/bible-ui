import { ReactNode, Children } from "react";

interface IEachProps<T> {
  render: (item: T, index: number) => ReactNode;
  empty?: ReactNode;
  data: T[];
}

export default function Each<T>({
  render,
  data,
  empty,
}: IEachProps<T>): ReactNode {
  if (!data?.length) return empty;
  return Children.toArray(data?.map((item, index) => render(item, index)));
}
