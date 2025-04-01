import useScreenSize from "./screen-size.hook";

interface IProps {
  mobile: string;
  tablet: string;
  desktop: string;
}
const useResponsiveAssets = (props: IProps) => {
  const { isTablet, isDesktop } = useScreenSize();
  return isDesktop ? props.desktop : isTablet ? props.tablet : props.mobile;
};

export default useResponsiveAssets;
