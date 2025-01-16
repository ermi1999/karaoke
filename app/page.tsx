"use client";
import FileUpload from "@/components/fileUpload";
import { usePlayer } from "@/components/playerContext";
import SyncedLyrics from "@/components/syncedLyrics";

export default function Home() {
  const { tracks, metadata } = usePlayer();
  return (
    <main className="flex justify-center mt-20 hero">
      {tracks.length && metadata.common ? <SyncedLyrics /> : <FileUpload />}
    </main>
  );
}
