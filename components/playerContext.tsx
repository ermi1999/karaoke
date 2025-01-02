"use client";
import { IAudioMetadata, parseBlob } from "music-metadata-browser";
import {
  createContext,
  Dispatch,
  RefObject,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface Track {
  src: string;
  file?: File;
  type: "backend" | "local";
}

interface PlayerContextType {
  tracks: Track[];
  setTracks: Dispatch<SetStateAction<Track[]>>;
  currentTrackIndex: number;
  setCurrentTrackIndex: Dispatch<SetStateAction<number>>;
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  progress: number;
  setProgress: Dispatch<SetStateAction<number>>;
  volume: number;
  setVolume: Dispatch<SetStateAction<number>>;
  prevVolume: number;
  setPrevVolume: Dispatch<SetStateAction<number>>;
  metadata: IAudioMetadata;
  setMetadata: Dispatch<SetStateAction<IAudioMetadata>>;
  currentTime: number;
  setCurrentTime: Dispatch<SetStateAction<number>>;
  duration: number;
  setDuration: Dispatch<SetStateAction<number>>;
  audioRef: RefObject<HTMLAudioElement | null>;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("useTracks must be used within a TracksProvider");
  }

  return context;
};

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(() => {
    if (typeof window !== "undefined") {
      return Number(localStorage.getItem("currentTrackIndex")) || 0;
    }
    return 0;
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(() => {
    if (typeof window !== "undefined") {
      return Number(localStorage.getItem("volume")) || 1;
    }
    return 1;
  });
  const [prevVolume, setPrevVolume] = useState(volume);
  const [metadata, setMetadata] = useState<IAudioMetadata>({});
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  if (audioRef.current) {
    audioRef.current.volume = volume;
  }

  useEffect(() => {
    const storedTracks = localStorage.getItem("tracks");
    if (storedTracks) {
      setTracks(JSON.parse(storedTracks));
    }

    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      fetchMetadata(tracks[currentTrackIndex].src);
    }
  }, [currentTrackIndex, tracks]);

  const fetchMetadata = async (src: string) => {
    const response = await fetch(src);
    const blob = await response.blob();
    const metadata = await parseBlob(blob);
    setMetadata(metadata);
  };

  return (
    <PlayerContext.Provider
      value={{
        tracks,
        setTracks,
        currentTrackIndex,
        setCurrentTrackIndex,
        isPlaying,
        setIsPlaying,
        progress,
        setProgress,
        volume,
        setVolume,
        prevVolume,
        setPrevVolume,
        metadata,
        setMetadata,
        currentTime,
        setCurrentTime,
        duration,
        setDuration,
        audioRef,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
