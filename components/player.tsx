"use client";
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
  ArrowDown,
  ArrowUp,
  Music,
} from "./icons";
import Image from "next/image";
import { usePlayer } from "@/components/playerContext";

// const tracks = [
//   { src: "/02 Henok Abebe - Honuatal (2).mp3" },
//   { src: "/Abay Weyes Vegas - Gossaye Tesfaye (128).mp3" },
//   { src: "/Adera - Gossaye Tesfaye  Mahmoud Ahmed (128).mp3" },
//   { src: "/Akal Lakal - Zeritu Kebede (128).mp3" },
//   { src: "/Akoyat - Gossaye Tesfaye (128).mp3" },
//   { src: "/Albo - Theodros Tadesse (128).mp3" },
//   { src: "/Alekaye - Gossaye Tesfaye (128).mp3" },
//   { src: "/Alikefam - Zeritu Kebede (128).mp3" },
//   { src: "/Atihidibign - Zeritu Kebede (128).mp3" },
//   { src: "/Ayeqerm Andsew - Tewodros Tadesse (128).mp3" },
//   { src: "/Aywedegnim - Zeritu Kebede (128).mp3" },
//   { src: "/Bado Neber - Haile Roots (128).mp3" },
//   { src: "/Be-Ayne Metash Woy - Theodros Tadesse (128).mp3" },
//   { src: "/Be-Gudde Ewotana - Theodros Tadesse (128).mp3" },
//   { src: "/Beketemaw Bemndru - Tewodros Tadesse (128).mp3" },
//   { src: "/Bemela Besebeb - Tewodros Tadesse (128).mp3" },
//   { src: "/Bemewadedachin - Tewodros Tadesse (128).mp3" },
//   { src: "/Beyemehalu - Haile Roots (128).mp3" },
//   { src: "/Chew Lerasish - Haile Roots (128).mp3" },
//   { src: "/Chiggae - Haile Roots (128).mp3" },
//   { src: "/Degu Abate - Zeritu Kebede (128).mp3" },
//   { src: "/Dire Dire - Gossaye Tesfaye (128).mp3" },
//   { src: "/Enateye - Gossaye Tesfaye (128).mp3" },
//   { src: "/Endaygelegn - Zeritu Kebede (128).mp3" },
//   { src: "/Ethiopia - Haile Roots (128).mp3" },
//   { src: "/Ewedihalew Bila - Gossaye Tesfaye (128).mp3" },
//   { src: "/Fitret Ende Kelale - Gossaye Tesfaye (128).mp3" },
//   { src: "/Girma Mogese - Theodros Tadesse (128).mp3" },
//   { src: "/Habte - Zeritu Kebede (128).mp3" },
//   { src: "/Harambie - Haile Roots (128).mp3" },
//   { src: "/Hulle Menash Mulu - Theodros Tadesse (128).mp3" },
//   { src: "/Kerehugne Tekije - Theodros Tadesse (128).mp3" },
//   { src: "/Ketemaw - Theodros Tadesse (128).mp3" },
//   { src: "/Konjiye - Gossaye Tesfaye (128).mp3" },
//   { src: "/Koya Babo - Gossaye Tesfaye (128).mp3" },
//   { src: "/Kubelelsh Woye - Tewodros Tadesse (128).mp3" },
//   { src: "/Laewnet Sile - Tewodros Tadesse (128).mp3" },
//   { src: "/Lalibela - Gossaye Tesfaye (128).mp3" },
//   { src: "/Leman Biyie - Haile Roots (128).mp3" },
//   { src: "/Letanashwa Lisga - Gossaye Tesfaye (128).mp3" },
//   { src: "/Man New - Haile Roots (128).mp3" },
//   { src: "/Melegna - Theodros Tadesse (128).mp3" },
//   { src: "/Melkam Yamarech - Haile Roots (128).mp3" },
//   { src: "/Min Adergalehu - Gossaye Tesfaye (128).mp3" },
//   { src: "/Nisueh Quanquayie - Haile Roots (128).mp3" },
//   { src: "/Satamehagn Bila - Gossaye Tesfaye (128).mp3" },
//   { src: "/Sene - Gossaye Tesfaye (128).mp3" },
//   { src: "/Sew Mamen - Tewodros Tadesse (128).mp3" },
//   { src: "/Sew Telamdo - Gossaye Tesfaye (128).mp3" },
//   { src: "/Simesh Yikefagnal - Zeritu Kebede (128).mp3" },
//   { src: "/Tameryalesh - Gossaye Tesfaye (128).mp3" },
//   { src: "/Tena-Adam - Theodros Tadesse (128).mp3" },
//   { src: "/Tey Tey Eyalikushe - Tewodros Tadesse (128).mp3" },
//   { src: "/Tuxedo - Gossaye Tesfaye (128).mp3" },
//   { src: "/Wa - Gossaye Tesfaye (128).mp3" },
//   { src: "/Wegen Tesebseb - Gossaye Tesfaye (128).mp3" },
//   { src: "/Wib Nat - Gossaye Tesfaye (128).mp3" },
//   { src: "/Woin Yastefese - Gossaye Tesfaye (128).mp3" },
//   { src: "/Wudinesh - Haile Roots (128).mp3" },
//   { src: "/Yane - Zeritu Kebede (128).mp3" },
//   { src: "/Yeged Sew - Gossaye Tesfaye (128).mp3" },
//   { src: "/Yelamba Kuraz Kire - Gossaye Tesfaye (128).mp3" },
//   { src: "/Yenem Ayin Aytoal - Zeritu Kebede (128).mp3" },
//   { src: "/Yene Neger - Gossaye Tesfaye (128).mp3" },
//   { src: "/Yetefa Yigegnal - Haile Roots (128).mp3" },
//   { src: "/Yihun - Zeritu Kebede (128).mp3" },
//   { src: "/Yikiribish Yihe Sew - Zeritu Kebede (128).mp3" },
//   { src: "/Zemdem Liblshe - Tewodros Tadesse (128).mp3" },
//   { src: "/Zim - Gossaye Tesfaye (128).mp3" },
//   { src: "/Zimita - Theodros Tadesse (128).mp3" },
// ];

export default function Player() {
  const {
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
    currentTime,
    setCurrentTime,
    duration,
    setDuration,
    audioRef,
  } = usePlayer();

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
    if (audioRef.current && tracks.length > 0) {
      setCurrentTrackIndex((prevIndex) => {
        const nextIdx = (prevIndex + 1) % tracks.length;
        if (tracks[currentTrackIndex].type !== "local")
          localStorage.setItem("currentTrackIndex", nextIdx.toString());
        return nextIdx;
      });
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.onloadedmetadata = () => {
        if (isPlaying) audioRef.current?.play();
      };
    }
  };

  const handlePrevious = () => {
    if (audioRef.current && tracks.length > 0) {
      setCurrentTrackIndex((prevIndex) => {
        const prevIdx = prevIndex === 0 ? tracks.length - 1 : prevIndex - 1;
        if (tracks[currentTrackIndex].type !== "local")
          localStorage.setItem("currentTrackIndex", prevIdx.toString());
        return prevIdx;
      });
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.onloadedmetadata = () => {
        if (isPlaying) audioRef.current?.play();
      };
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      const duration = audioRef.current.duration || 1; // Default to 1 to avoid division by zero
      setCurrentTime(currentTime);
      setProgress((currentTime / duration) * 100);
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

  const handleLoadedMetadata = () => {
    if (audioRef.current && audioRef.current.duration > 0) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleLoadedData = () => {
    if (audioRef.current && audioRef.current.duration > 0) {
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="fixed w-[95%] xl:w-[90%] max-w-[1200px] bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-3 inline-flex flex-col lg:flex-row lg:items-center justify-between bg-white/5 backdrop-blur-lg rounded-3xl">
      <div className="flex flex-row justify-between w-full lg:w-64">
        <div className="flex flex-row">
          <div className="relative h-16 w-16">
            {metadata.common?.picture ? (
              <Image
                fill
                className="object-cover rounded-xl lg:rounded-sm"
                src={`data:${
                  metadata.common.picture[0].format
                };base64,${Buffer.from(
                  metadata.common.picture[0].data
                ).toString("base64")}`}
                alt="Album Art"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center backdrop-blur-xl bg-white/5 rounded-xl">
                <Music height="1.5em" width="1.5em" />
              </div>
            )}
          </div>
          {tracks.length > 0 && (
            <div className="flex flex-col w-36 overflow-hidden text-nowrap ml-3">
              <h2>{metadata.common?.title || "Unknown Track"}</h2>
              <p className="text-muted text-sm">
                {metadata.common?.artist || "Unknown Artist"}
              </p>
            </div>
          )}
        </div>
        <button className="flex flex-col lg:hidden justify-between h-10 rotate-45 [&_svg]:size-[1.3rem] mr-2">
          <ArrowUp />
          <ArrowDown />
        </button>
      </div>
      <div className="flex flex-col-reverse lg:flex-col backdrop-blur-sm items-center justify-center space-y-2">
        {tracks.length > 0 && (
          <audio
            ref={audioRef}
            src={tracks[currentTrackIndex].src}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleNext}
            onLoadedMetadata={handleLoadedMetadata}
            onLoadedData={handleLoadedData}
          />
        )}
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
        <div className="w-full flex flex-row items-center space-x-2 md:w-auto text-sm text-muted">
          <span className="w-10 text-end">{formatTime(currentTime)}</span>
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
          <span className="w-10">{formatTime(duration)}</span>
        </div>
      </div>
      <div className="hidden lg:flex flex-row justify-between w-64 h-full items-center">
        <div className="flex flex-row space-x-2">
          <Button variant="secondary">
            <Queue className="h-6 w-6" />
          </Button>
          <div className="flex flex-row items-center justify-center space-x-1">
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
        <button className="flex flex-col justify-between h-10 hover:h-14 transition-all rotate-45 [&_svg]:size-[1.3rem] mr-2">
          <ArrowUp />
          <ArrowDown />
        </button>
      </div>
    </div>
  );
}
