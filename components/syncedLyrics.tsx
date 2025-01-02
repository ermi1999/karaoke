import { useEffect, useState } from "react";
import { usePlayer } from "./playerContext";

interface LyricLine {
  time: number;
  text: string;
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

export default function SyncedLyrics() {
  const [lyrics, setLyrics] = useState<LyricLine[]>([]);
  const [currentLyric, setCurrentLyric] = useState("");
  const { currentTrackIndex, currentTime } = usePlayer();

  useEffect(() => {
    const loadLyrics = async () => {
      const lyricsString = `[00:33.81] ጥርስሽን አይና እወደውና
[00:38.16] ዓይንሽን አይና አፈቅረውና
[00:42.48] በጉዴ እወጣለሁ በሕልሜ አወራና
[00:46.49] በጉዴ እንዳልወጣ በሕልሜ አወራና
[00:50.67] ጥርስሽን አይና አፈቅረውና
[00:54.70] ዓይንሽን አይና እወደውና
[00:58.83] በጉዴ እወጣለሁ በሕልሜ አወራና
[01:02.91] በጉዴ እንዳልወጣ በሕልሜ አወራና
[01:07.75] 
[01:14.21] ተፈጥሮ ልጋሴን እንደምን ችሮሻል
[01:20.38] የወርቁን ማዕጠንት አርከፍክፎብሻል
[01:26.50] እማኝ በሌለበት በሕልሜ ትመጪና
[01:32.65] ጉድ እንዳይፈላብኝ ተኝቼ አወራና
[01:39.55] ዓይንሽማ ካድማስ ማዶ ሲያበራ
[01:43.35] ፍቅር ገበያው ደራ
[01:46.35] ጥርስሽማ በጨለማው ደመቀ
[01:49.78] ፈገግታሽ የጠለቀ
[01:52.52] ፀጉርሽማ ሀር መሳይ ጉንጉን
[01:55.92] አረገኝ ብክንክን
[01:58.73] ዳሌሽማ ሲተራመስ ሲቆጣ
[02:02.18] መጨነቅ ነው የኔ ዕጣ
[02:05.43] አወይ ሽንጧ አወይ ዳሌ
[02:09.41] በይ ደግፊኝ እንዳመሌ
[02:13.72] ኧረ ሙን ኧረ ሙን
[02:17.73] እኔም አልኩኝ ብክንክን
[02:21.98] ኧረ ሙን ኧረ ሙን
[02:26.07] ቆሜ ቀረሁ ሳይ ዓይኗን
[02:30.26] ቆሜ ቀረሁ ሳይ ጥርሷን
[02:34.50] ፈዝዤ አደርኩ ሳይ ዓይኗን
[02:39.25] 
[02:55.53] ጥርስሽን አይና እወደውና
[02:59.67] ዓይንሽን አይና አፈቅረውና
[03:03.86] በጉዴ እወጣለሁ በሕልሜ አወራና
[03:07.95] በጉዴ እንዳልወጣ በሕልሜ አወራና
[03:11.73] ዓይንሽን አይና እወደውና
[03:16.05] ጥርስሽን አይና አፈቅረውና
[03:20.44] በጉዴ እወጣለሁ በሕልሜ አወራና
[03:24.60] በጉዴ እንዳልወጣ በሕልሜ አወራና
[03:29.69] 
[03:35.86] ኩሩ ነች እያሉ ያሙሻል ሰዎቹ
[03:41.77] ሲያዩሽ ውለው ቢያድሩ መቼም አይሰለቹ
[03:47.71] ውበት እና ፀባይ ከተገጣጠመ
[03:54.08] እንዲህ ነው ካልቀረ ልብ እያደከመ
[04:01.35] ድምፅሽማ ዜመኛ የተለየ
[04:04.91] ወይ ዘንድሮ እኔን ያየ
[04:07.83] ሽንጥሽማ ዙሪያው እቅፍ አይሞላ
[04:11.31] ውበት ሚዛኑ አደላ
[04:13.97] ዳሌሽማ ሲተራመስ ሲቆጣ
[04:17.39] መጨነቅ ነው የኔ ዕጣ
[04:20.29] በእህል ውሃ መች ይኖራል ብለሽ
[04:23.79] አብሬሽ ልብነሽነሽ
[04:26.82] አቤት ውበት ኧረ ድንቅ
[04:31.03] እኔም አልኩኝ ፍልቅልቅ
[04:35.18] አወይ ገላ አወይ ሙን
[04:39.35] እስኪ አድርጊኝ ሽሙንሙን
[04:43.55] ኧረ ሙን ኧረ ሙን
[04:47.81] ቆሜ ቀረሁ ሳይ ጥርሷን
[04:51.99] ቆሜ ቀረሁ ሳይ ዓይኗን
[04:55.93] ፈዝዤ አደርኩ ሳይ ጥርሷን
[04:58.87] 
  `;
      const parsedLyrics = parseLRC(lyricsString);
      setLyrics(parsedLyrics);
    };
    loadLyrics();
  }, [currentTrackIndex]);

  useEffect(() => {
    const updateCurrentLyric = () => {
      const currentLyricLine = lyrics.find(
        (lyric) => lyric.time <= currentTime && currentTime < lyric.time + 5
      );
      if (currentLyricLine) {
        setCurrentLyric(currentLyricLine.text);
      }
    };
    updateCurrentLyric();
  });
  return (
    <div>
      <p>{currentLyric}</p>
    </div>
  );
}
