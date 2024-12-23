"use client";
import { createContext, useContext, useEffect, useState } from "react";

interface Track {
  src: string;
  file?: File;
  type: "backend" | "local";
}

interface TracksContextType {
  tracks: Track[];
  setTracks: React.Dispatch<React.SetStateAction<Track[]>>;
}

const TracksContext = createContext<TracksContextType | undefined>(undefined);

export const useTracks = () => {
  const context = useContext(TracksContext);
  if (!context) {
    throw new Error("useTracks must be used within a TracksProvider");
  }

  return context;
};

export const TracksProvider = ({ children }: { children: React.ReactNode }) => {
  const [tracks, setTracks] = useState<Track[]>([]);

  useEffect(() => {
    const storedTracks = localStorage.getItem("tracks");
    if (storedTracks) {
      setTracks(JSON.parse(storedTracks));
    }
  }, []);
  return (
    <TracksContext.Provider value={{ tracks, setTracks }}>
      {children}
    </TracksContext.Provider>
  );
};
