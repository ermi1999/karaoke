"use client";
import { useState, useRef, ChangeEvent, DragEvent } from "react";
import { useTracks } from "./tracksContext";

const FileUpload = () => {
  const { tracks, setTracks } = useTracks();
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
    <div>
      <div
        onClick={handleButtonClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`h-[40vw] w-[90vw] rounded-5xl outline outline-muted bg-white/5 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors ${
          dragging ? "bg-white/10" : ""
        }`}
      >
        Drag and drop files here or click to upload
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
