interface IProps {
  text?: string;
}

export default function AppLoadingText(props: IProps) {
  const { text = "Loading..." } = props;

  const generateAnimatedText = (text: string, isReflection = false) => {
    return text.split("").map((char, index) => {
      const baseClasses = "inline-block relative overflow-hidden";
      const style = { animationDelay: `${index * 100}ms` };

      return (
        <span
          key={`${isReflection ? "reflection-" : ""}${index}`}
          className={`${baseClasses} animate-pulse`}
          style={style}
        >
          {char}
          <span
            className="absolute inset-0 bg-gradient-to-r from-transparent via-bg-background to-transparent opacity-30 animate-shimmer"
            style={{ backgroundSize: "200% 100%" }}
          ></span>
        </span>
      );
    });
  };

  return generateAnimatedText(text);
}
