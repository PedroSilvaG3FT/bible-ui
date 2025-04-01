import React, { ChangeEvent, useState } from "react";

interface IAppFileInput {
  className?: string;
  buttonClassName?: string;

  accept?: string;
  maxFiles?: number;
  children: React.ReactNode;
  onChange: (files: FileList | null) => void;
}

export default function AppFileInput(props: IAppFileInput) {
  const {
    accept,
    onChange,
    children,
    className,
    maxFiles = 1,
    buttonClassName,
  } = props;

  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files?.length) {
      onChange(null);
      setErrorMessage("");
      return;
    }

    if (files.length > maxFiles) {
      setErrorMessage(`Você pode selecionar no máximo ${maxFiles} arquivos.`);
      onChange(null);
      return;
    }

    onChange(files);
    setErrorMessage("");
  };

  return (
    <article className={className}>
      <label
        htmlFor="fileInput"
        className={`bg-blue-600 hover:bg-blue-600/90 text-primary-foreground cursor-pointer rounded-md h-10 w-auto px-4 py-2 flex items-center justify-center ${buttonClassName}`}
      >
        {children}
        <input
          type="file"
          id="fileInput"
          accept={accept}
          className="hidden"
          multiple={maxFiles > 1}
          onChange={handleFileChange}
        />
      </label>
      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
    </article>
  );
}
