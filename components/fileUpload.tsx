"use client";
import { useState, useRef, ChangeEvent, DragEvent } from "react";
import { usePlayer } from "./playerContext";
import { PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const FileUpload = () => {
  const { tracks, setTracks } = usePlayer();
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const local: "local" | "backend" = "local";

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const newTracks = files.map((file) => ({
        src: URL.createObjectURL(file),
        file,
        type: local,
      }));
      setTracks((prevTracks) => [...prevTracks, ...newTracks]);
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    if (event.dataTransfer.files) {
      const files = Array.from(event.dataTransfer.files);
      const newTracks = files.map((file) => ({
        src: URL.createObjectURL(file),
        file,
        type: local,
      }));
      setTracks((prevTracks) => [...prevTracks, ...newTracks]);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="h-[60%] w-[95%] md:w-[90%] max-w-[1200px]">
      <div
        onClick={handleButtonClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "h-full w-full rounded-4xl md:rounded-5xl bg-white/5 flex items-center justify-center cursor-pointer text-muted hover:bg-white/10 hover:text-foreground transition-colors",
          dragging ? "bg-white/10 text-foreground" : ""
        )}
      >
        <PlusCircle className="md:hidden" size={90} />
        <PlusCircle className="hidden md:flex" size={105} />
      </div>
      <input
        type="file"
        multiple
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FileUpload;
