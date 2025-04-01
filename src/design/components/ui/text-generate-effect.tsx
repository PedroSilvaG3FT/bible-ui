import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/design/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  textClassName,
  filter = true,
  duration = 0.5,
  delay = 0.2,
}: {
  words: string;
  className?: string;
  textClassName?: string;
  filter?: boolean;
  duration?: number;
  delay?: number;
}) => {
  const [scope, animate] = useAnimate();
  let wordsArray = words?.split(" ");
  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: duration ? duration : 1,
        delay: stagger(delay),
      }
    );
  }, [scope.current]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className="dark:text-white text-black opacity-0"
              style={{
                filter: filter ? "blur(10px)" : "none",
              }}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-4">
        <div
          className={cn(
            " dark:text-white text-black text-2xl leading-snug tracking-wide",
            textClassName
          )}
        >
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
