import LoadingSpinner from "@/assets/loading.svg";

interface IAppLoadingIndicatorProps {
  className?: string;
}
export default function AppLoadingIndicator(props: IAppLoadingIndicatorProps) {
  const { className = "" } = props;
  return <img src={LoadingSpinner} alt="Loading..." className={className} />;
}
