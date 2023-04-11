import Button from "./Button";
import React, { useRef, useState } from "react";
import clsx from "clsx";

interface DropzoneProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onFileChange: (file: File) => void;
}

export default function Dropzone({
  onChange,
  onFileChange,
  ...props
}: DropzoneProps): JSX.Element {
  const [filename, setFilename] = useState("");
  const [dragActive, setDragActive] = React.useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChage: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.target.files && event.target.files[0] !== undefined) {
      onFileChange(event.target.files[0]);
      setFilename(event.target.files[0].name);
    }
    if (onChange) onChange(event);
  };

  const handleDrag: React.DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.type === "dragenter" || event.type === "dragover") {
      setDragActive(true);
    } else if (event.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDragOver: React.DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop: React.DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      onFileChange(event.dataTransfer.files[0]);
      setFilename(event.dataTransfer.files[0].name);
    }
  };

  return (
    <div
      className={clsx(
        "flex items-center justify-center w-full border-2 border-[#A1A6B4] border-dashed rounded-xl",
        dragActive && "bg-gray-100"
      )}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex flex-col gap-2 items-center justify-center py-8">
        <h4>
          {filename === ""
            ? "Drop your files here"
            : '"' + filename + '" chosen'}
        </h4>
        <div className="text-center w-full text-[#A1A6B4] text-sm">or</div>
        <Button
          onClick={() => {
            inputRef.current?.click();
          }}
        >
          {filename === "" ? "Choose File" : "Choose Another File"}
        </Button>
      </div>
      <input
        onChange={handleChage}
        ref={inputRef}
        type="file"
        className="hidden"
        {...props}
      />
    </div>
  );
}
