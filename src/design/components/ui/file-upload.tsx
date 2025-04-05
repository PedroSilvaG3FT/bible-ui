import { cn } from "@/design/lib/utils";
import { ReactNode, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { IconUpload } from "@tabler/icons-react";
import { ToastUtil } from "@/modules/@shared/util/toast.util";
import { LucideIcon, Upload } from "lucide-react";

const mainVariant = {
  initial: { x: 0, y: 0 },
  animate: { x: 20, y: -20, opacity: 0.9 },
};

const secondaryVariant = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

interface IFileUploadProps {
  title?: string;
  accept?: string;
  icon?: LucideIcon;
  maxFiles?: number;
  className?: string;
  description?: string;
  backgroundEl?: ReactNode;
  onChange?: (files: File[]) => void;
}

export const FileUpload = (props: IFileUploadProps) => {
  const {
    accept,
    onChange,
    className,
    maxFiles = 5,
    icon: Icon = Upload,
    backgroundEl: BackgroundEl,
    title = "Upload de arquivo",
    description = `Arraste ou solte seus arquivos aqui\nou clique para fazer upload`,
  } = props;
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEmit = (data: File[]) => {
    onChange && onChange(data);
  };

  const handleFileChange = (newFiles: File[]) => {
    if (!newFiles.length) return;

    if (maxFiles === 1) {
      const [currentFile] = newFiles;

      setFiles([currentFile]);
      handleEmit([currentFile]);
      return;
    }

    if (files.length >= maxFiles) {
      handleEmit([]);
      ToastUtil.info(`Você pode selecionar no máximo ${maxFiles} arquivos.`);
      return;
    }

    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    handleEmit(newFiles);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    onDrop: handleFileChange,
    onDropRejected: (error) => {
      console.log(error);
    },
  });

  return (
    <div className={cn("w-full", className)} {...getRootProps()}>
      <motion.div
        onClick={handleClick}
        whileHover="animate"
        className="p-10 group/file block border rounded-lg cursor-pointer w-full relative overflow-hidden"
      >
        <input
          type="file"
          accept={accept}
          ref={fileInputRef}
          className="hidden"
          id="file-upload-handle"
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
        />
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
          {BackgroundEl}
        </div>
        <div className="flex flex-col items-center justify-center">
          <Icon className="mb-4" />
          <p className="relative z-20 font-sans font-bold text-neutral-700 dark:text-neutral-300 text-base">
            {title}
          </p>
          <p className="relative z-20 text-center whitespace-pre font-sans font-normal text-neutral-400 dark:text-neutral-400 text-base mt-2">
            {description}
          </p>
          <div className="relative w-full mt-10 max-w-xl mx-auto">
            {files?.length > 0 &&
              files?.map((file, idx) => (
                <motion.div
                  key={"file" + idx}
                  layoutId={idx === 0 ? "file-upload" : "file-upload-" + idx}
                  className={cn(
                    "relative overflow-hidden z-40 bg-white dark:bg-neutral-900 flex flex-col items-start justify-start md:h-24 p-4 mt-4 w-full mx-auto rounded-md",
                    "shadow-xs"
                  )}
                >
                  <div className="flex justify-between w-full items-center gap-4">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="text-base flex items-center text-neutral-700 dark:text-neutral-300 truncate max-w-xs"
                    >
                      {file?.name}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="rounded-lg px-2 py-1 w-fit shrink-0 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-white shadow-input"
                    >
                      {(file?.size / (1024 * 1024)).toFixed(2)} MB
                    </motion.p>
                  </div>

                  <div className="flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-neutral-600 dark:text-neutral-400">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 "
                    >
                      {file?.type}
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                    >
                      modificado{" "}
                      {new Date(file?.lastModified).toLocaleDateString()}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            {!files.length && (
              <motion.div
                layoutId="file-upload"
                variants={mainVariant}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className={cn(
                  "relative group-hover/file:shadow-2xl z-40 bg-white dark:bg-background/60 dark:border-dotted flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md",
                  "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
                )}
              >
                {isDragActive ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-neutral-600 flex flex-col items-center"
                  >
                    Solte aqui
                    <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                  </motion.p>
                ) : (
                  <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
                )}
              </motion.div>
            )}

            {!files.length && (
              <motion.div
                variants={secondaryVariant}
                className="absolute opacity-0 border border-dashed border-sky-400 inset-0 z-30 bg-transparent flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md"
              ></motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export function GridPattern() {
  const columns = 41;
  const rows = 11;
  return (
    <div className="flex bg-gray-100 dark:bg-neutral-900 shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px  scale-105">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col;
          return (
            <div
              key={`${col}-${row}`}
              className={`w-10 h-10 flex shrink-0 rounded-[2px] ${
                index % 2 === 0
                  ? "bg-gray-50 dark:bg-neutral-950"
                  : "bg-gray-50 dark:bg-neutral-950 shadow-[0px_0px_1px_3px_rgba(255,255,255,1)_inset] dark:shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]"
              }`}
            />
          );
        })
      )}
    </div>
  );
}
