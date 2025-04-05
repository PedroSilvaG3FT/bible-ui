interface IAuthenticationPageNavProps {
  title: string;
  subtitle: string;
}
export default function AuthenticationPageNav(
  props: IAuthenticationPageNavProps
) {
  return (
    <nav className="mb-6">
      <img
        alt="iBiblia"
        src="/logo.png"
        className="h-8 mb-4 object-contain brightness-0"
      />

      <h4 className="font-semibold">{props.title}</h4>
      <p className="text-sm">{props.subtitle}</p>
    </nav>
  );
}
