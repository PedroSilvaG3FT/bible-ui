import { cn } from "@/design/lib/utils";
import { useEffect, useState } from "react";
import MarkdownPreview from "@uiw/react-markdown-preview";

interface IProps {
  text: string;
  typingSpeed?: number;
  onComplete?: () => void;
  enableTypingEffect?: boolean;
}

export default function AppMarkdown(props: IProps) {
  const {
    text,
    onComplete,
    typingSpeed = 10,
    enableTypingEffect = false,
  } = props;

  const [displayedText, setDisplayedText] = useState("");

  const handleForceText = () => {
    setDisplayedText(text);
    if (onComplete) onComplete();
  };

  useEffect(() => {
    if (enableTypingEffect) {
      let index = 0;

      const intervalId = setInterval(() => {
        if (index < text.length) {
          setDisplayedText((prev) => prev + text[index]);
          index++;
        } else {
          clearInterval(intervalId);
          if (onComplete) onComplete();
        }
      }, typingSpeed);

      return () => clearInterval(intervalId);
    } else handleForceText();
  }, [text]);

  useEffect(() => {
    if (!enableTypingEffect) handleForceText();
  }, [enableTypingEffect]);

  return (
    <MarkdownPreview
      source={displayedText}
      className={cn("!text-foreground")}
      style={{ background: "transparent" }}
    />
  );
}
