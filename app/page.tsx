"use client";
import FileUpload from "@/components/fileUpload";
import { usePlayer } from "@/components/playerContext";

export default function Home() {
  const { tracks, currentTime } = usePlayer();
  return (
    <main className="flex justify-center mt-20 hero">
      {tracks.length ? <p>{currentTime}</p> : <FileUpload />}
    </main>
  );
}
