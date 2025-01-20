import { useEffect, useRef, useState } from "react";
import { usePlayer } from "./playerContext";
import { cn } from "@/lib/utils";
import SvgLyricsMusic from "./icons/LyricsMusic";

interface LyricLine {
  time: number;
  text: string;
}

interface LyricsType {
  id: number;
  trackName: string;
  artistName: string;
  albumName: string;
  duration: number;
  instrumental: boolean;
  plainLyrics: string;
  syncedLyrics: string;
}

const parseLRC = (lrc: string): LyricLine[] => {
  const lines = lrc.split("\n");
  const lyrics: LyricLine[] = [];

  lines.forEach((line) => {
    const match = line.match(/\[(\d+):(\d+)\.(\d+)\](.*)/);
    if (match) {
      const minutes = parseInt(match[1], 10);
      const seconds = parseInt(match[2], 10);
      const milliseconds = parseInt(match[3], 10);
      const text = match[4].trim() || "";
      const time = minutes * 60 + seconds + milliseconds / 1000;
      lyrics.push({ time, text });
    }
  });

  return lyrics;
};

const isAmharic = (text: string): boolean => {
  const amharicRegex = /[\u1200-\u137F]/;
  return amharicRegex.test(text);
};

export default function SyncedLyrics() {
  const [isFetchingLyrics, setIsFetchingLyrics] = useState<boolean>(false);
  const [syncedLrics, setSyncedLyrics] = useState<LyricLine[]>([]);
  const [plainLyrics, setPlainLyrics] = useState<string[]>([]);
  const [currentLyric, setCurrentLyric] = useState<LyricLine | null>(null);
  const { currentTrackIndex, currentTime, metadata } = usePlayer();
  const currentLineRef = useRef<HTMLParagraphElement | null>(null);
  const linesWrapper = useRef<HTMLDivElement | null>(null);
  const [lyricsResponse, setLyricsResponse] = useState<LyricsType | null>(null);

  useEffect(() => {
    const loadLyrics = async () => {
      setIsFetchingLyrics(true);
      setPlainLyrics([]);
      setSyncedLyrics([]);
      setLyricsResponse(null);
      // example request https://lrclib.net/api/get?artist_name=Borislav+Slavov&track_name=I+Want+to+Live&album_name=Baldur%27s+Gate+3+(Original+Game+Soundtrack)&duration=233
      if (metadata && metadata.common) {
        let url = "https://lrclib.net/api/get";
        if (metadata.common.artist) {
          url += `?artist_name=${metadata.common.artist}`;
        }
        if (metadata.common.title) {
          url += metadata.common.artist
            ? `&track_name=${metadata.common.title}`
            : `?track_name=${metadata.common.title}`;
        }
        if (metadata.common.album) {
          url +=
            metadata.common.artist || metadata.common.title
              ? `&album_name=${metadata.common.album}`
              : `?album_name=${metadata.common.album}`;
        }
        try {
          const response = await fetch(url, {
            method: "GET",
            cache: "force-cache",
          });
          const data = await response.json();
          if (data) setLyricsResponse(data);
          else {
            setPlainLyrics([]);
            setSyncedLyrics([]);
            setLyricsResponse(null);
          }
        } catch (error) {
          console.log(error);
          setPlainLyrics([]);
          setSyncedLyrics([]);
          setLyricsResponse(null);
        } finally {
          setTimeout(() => setIsFetchingLyrics(false), 1000);
        }
      }
    };
    loadLyrics();
  }, [currentTrackIndex, metadata]);

  useEffect(() => {
    if (lyricsResponse) {
      const plainLyrics = lyricsResponse.plainLyrics;
      const syncedLyrics = lyricsResponse.syncedLyrics;
      if (lyricsResponse.syncedLyrics) setSyncedLyrics(parseLRC(syncedLyrics));
      if (plainLyrics) setPlainLyrics(plainLyrics.split("\n"));
    } else {
      setPlainLyrics([]);
      setSyncedLyrics([]);
    }
  }, [lyricsResponse]);

  useEffect(() => {
    if (lyricsResponse?.syncedLyrics) {
      const updateCurrentLyric = () => {
        const nextLyricLine = syncedLrics.findIndex(
          (lyric) => lyric.time > currentTime
        );
        if (nextLyricLine === 0) {
          setCurrentLyric(null);
          linesWrapper.current?.querySelectorAll("p")[0].scrollIntoView({
            behavior: "smooth",
          });
        } else if (nextLyricLine === -1) {
          setCurrentLyric(syncedLrics[syncedLrics.length - 1]);
        } else {
          setCurrentLyric(syncedLrics[nextLyricLine - 1]);
        }
      };
      updateCurrentLyric();
    }
  }, [currentTime, syncedLrics, lyricsResponse]);

  useEffect(() => {
    if (currentLineRef) {
      currentLineRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentLyric]);
  return (
    <div
      className="h-[100%] w-[90%] md:w-[50%] text-5xl flex flex-col items-center text-center space-y-7 transition-all overflow-hidden overflow-y-scroll lyrics-line-wrapper"
      ref={linesWrapper}
    >
      {isFetchingLyrics ? (
        <p>Loading lyrics...</p>
      ) : syncedLrics.length > 0 ? (
        syncedLrics.map((lyric, index) => {
          const isCurrent = lyric.time === currentLyric?.time;
          const isPast = currentLyric && lyric.time < currentLyric?.time;
          const isAmharicText = isAmharic(lyric.text);
          return (
            <p
              ref={isCurrent ? currentLineRef : null}
              key={index}
              className={cn(
                "transition-all",
                isCurrent
                  ? "text-foreground"
                  : isPast
                  ? "text-dim"
                  : "text-muted",
                isAmharicText ? "font-amharic" : ""
              )}
            >
              {lyric.text ? lyric.text : <SvgLyricsMusic />}
            </p>
          );
        })
      ) : plainLyrics.length > 0 ? (
        plainLyrics.map((lyric, index) => {
          const isAmharicText = isAmharic(lyric);
          return (
            <p className={cn(isAmharicText ? "font-amharic" : "")} key={index}>
              {lyric}
            </p>
          );
        })
      ) : (
        <p>Lyrics not found</p>
      )}
    </div>
  );
}
