import { useState } from "react";

export function useTextToSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const toggleSpeech = (texts: string[], lang: string = "pt-BR") => {
    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    if (texts.length === 0) return;

    setIsSpeaking(true);
    let index = 0;

    const speakNext = () => {
      if (index >= texts.length) {
        setIsSpeaking(false);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(texts[index]);
      utterance.lang = lang;
      utterance.onend = () => {
        index++;
        speakNext();
      };

      speechSynthesis.speak(utterance);
    };

    speakNext();
  };

  return { isSpeaking, toggleSpeech };
}
