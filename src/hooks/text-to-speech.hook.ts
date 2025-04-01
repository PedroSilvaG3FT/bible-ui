import { useState, useEffect } from "react";

export function useTextToSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      const maleVoice =
        voices.find(
          (v) =>
            v.lang.startsWith("pt") && v.name.toLowerCase().includes("male")
        ) || voices[0];
      setVoice(maleVoice || null);
    };

    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const toggleSpeech = (texts: string[], lang: string = "pt-BR") => {
    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    if (texts.length === 0 || !voice) return;

    setIsSpeaking(true);
    let index = 0;

    const speakNext = () => {
      if (index >= texts.length) {
        setIsSpeaking(false);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(texts[index]);
      utterance.lang = lang;
      utterance.voice = voice; // Define a voz escolhida
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
