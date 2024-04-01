import React, { useRef, useState } from "react";

import AudioTheme from "/main-theme.mp3";

import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";

const AudioControl: React.FC = () => {
    const [audioPlaying, setAudioPlaying] = useState(false);
    const [audioLevel, setAudioLevel] = useState<number>(0);

    const audioRef = useRef<HTMLAudioElement>(null);

	if (audioPlaying) {
        audioRef!.current!.volume = audioLevel;
	}

    const handleToggleAudio = () => {
        if (audioPlaying) {
            audioRef.current!.muted = true;
            setAudioPlaying(false);
            setAudioLevel(0);
        } else if (audioRef.current!.muted) {
            audioRef.current!.muted = false;
            setAudioPlaying(true);
            setAudioLevel(0.5);
        } else {
            audioRef.current!.play();
            setAudioPlaying(true);
            setAudioLevel(0.5);
        }
    };

    return (
        <div className="flex justify-end p-6 h-[24px] items-center gap-4">
            <button onClick={handleToggleAudio} className="text-[#CF9500]">
                <audio ref={audioRef} src={"./main-theme.mp3"} loop={true} />
                {!audioPlaying ? <VolumeMuteIcon /> : <VolumeUpIcon />}
            </button>
            <input
                value={audioLevel}
                onChange={(e) => setAudioLevel(+e.target.value)}
                min={0}
                max={1}
                step={0.1}
                type="range"
                disabled={!audioPlaying}
                className="accent-[#CF9500]"
            />
        </div>
    );
};

export default AudioControl;
