"use client";
import { useEffect, useRef, useState } from "react";
import { parseBlob } from "music-metadata-browser";
import { Button } from "./ui/button";
import {
  Next,
  Pause,
  Play,
  Prev,
  Queue,
  VolumeHigh,
  VolumeLow,
  VolumeMute,
} from "./icons";
import Image from "next/image";

const tracks = [
  {
    src: "/02 Henok Abebe - Honuatal (2).mp3",
  },
  {
    src: "/Yene Neger - Gossaye Tesfaye (128).mp3",
  },
  {
    src: "/Albo - Theodros Tadesse (128).mp3",
  },
  {
    src: "/Be-Gudde Ewotana - Theodros Tadesse (128).mp3",
  },
  {
    src: "/Bemela Besebeb - Tewodros Tadesse (128).mp3",
  },
  {
    src: "/Degu Abate - Zeritu Kebede (128).mp3",
  },
];

export default function Player() {
  let defaultVolume = 1;
  if (typeof window !== "undefined") {
    defaultVolume = Number(localStorage.getItem("volume")) || 1;
  }
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(defaultVolume);
  const [prevVolume, setPrevVolume] = useState(volume);
  const [metadata, setMetadata] = useState({});
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    fetchMetadata(tracks[currentTrackIndex].src);
  }, [currentTrackIndex]);

  const fetchMetadata = async (src: string) => {
    const response = await fetch(src);
    const blob = await response.blob();
    const metadata = await parseBlob(blob);
    setMetadata(metadata);
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNext = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.onloadedmetadata = () => {
        if (isPlaying) audioRef.current?.play();
      };
    }
  };

  const handlePrevious = () => {
    setCurrentTrackIndex((prevIndex) =>
      prevIndex === 0 ? tracks.length - 1 : prevIndex - 1
    );
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.onloadedmetadata = () => {
        if (isPlaying) audioRef.current?.play();
      };
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(
        (audioRef.current.currentTime / audioRef.current.duration) * 100
      );
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
    localStorage.setItem("volume", value.toString());
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (volume > 0) {
        setPrevVolume(volume);
        setVolume(0);
      } else {
        setVolume(prevVolume);
      }
    }
  };

  return (
    <div className="fixed w-[90%] md:w-[75%] bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-2 md:py-1 inline-flex flex-col lg:flex-row lg:items-center justify-between bg-white/5 rounded-3xl">
      <div className="flex flex-row w-56">
        <div className="relative h-16 w-16">
          {metadata.common?.picture && (
            <Image
              fill
              className="object-cover rounded-xl lg:rounded-sm"
              src={`data:${
                metadata.common.picture[0].format
              };base64,${Buffer.from(metadata.common.picture[0].data).toString(
                "base64"
              )}`}
              alt="Album Art"
            />
          )}
        </div>
        <div className="flex flex-col w-36 overflow-hidden text-nowrap ml-3">
          <h2>{metadata.common?.title || "Unknown Track"}</h2>
          <p className="text-muted text-sm">{metadata.common?.artist}</p>
        </div>
      </div>
      <div className="w-full flex flex-col-reverse lg:flex-col backdrop-blur-sm items-center justify-center p-2 space-y-2">
        <audio
          ref={audioRef}
          src={tracks[currentTrackIndex].src}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleNext}
        />
        <div className="space-x-2">
          <Button variant="secondary" onClick={handlePrevious}>
            <Prev width="10em" height="10em" />
          </Button>
          <Button onClick={handlePlayPause} className="rounded-full">
            {isPlaying ? <Pause /> : <Play />}
          </Button>
          <Button variant="secondary" onClick={handleNext}>
            <Next />
          </Button>
        </div>
        <div className="w-full md:w-auto">
          <input
            className="w-full md:w-96 progress-bar"
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => {
              if (audioRef.current) {
                audioRef.current.currentTime =
                  (Number(e.target.value) / 100) * audioRef.current.duration;
              }
            }}
          />
        </div>
      </div>
      <div className="hidden lg:flex w-56 space-x-4">
        <Button variant="secondary">
          <Queue />
        </Button>
        <div className="flex flex-row items-center justify-center space-x-2">
          <Button onClick={toggleMute} variant="secondary">
            {volume === 0 ? (
              <VolumeMute />
            ) : volume < 0.5 && volume !== 0 ? (
              <VolumeLow />
            ) : (
              <VolumeHigh />
            )}
          </Button>
          <input
            id="volume"
            type="range"
            className="volume-bar w-20"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>
      </div>
    </div>
  );
}
