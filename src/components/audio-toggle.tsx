import React, {useRef} from 'react'

import AudioTheme from "../assets/main-theme.mp3";


import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';

type Props = {
	handleAudio: (audio: React.RefObject<HTMLAudioElement>) => void;
	isPlaying: boolean
}

const AudioToggle: React.FC<Props> = ({handleAudio, isPlaying}) => {

	const audioRef = useRef<HTMLAudioElement>(null)

	const clickHandler = () => {
		handleAudio(audioRef)
	}

	return (
		<button
		onClick={clickHandler}
		className="z-50 fixed top-5 right-5 text-[#CF9500]"
	>
		<audio ref={audioRef} src={AudioTheme} loop={true} />
		{isPlaying ? <VolumeMuteIcon /> : <VolumeUpIcon />}
	</button>
)
}

export default AudioToggle