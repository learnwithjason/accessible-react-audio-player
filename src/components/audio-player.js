import { useRef, useState } from 'react';

/*
    TODO:
    - X play/pause toggle (button)
    - X current time
    - X total duration
    - x playback scrubber (range input)
    - x playback rate button
    - jump/rewind X seconds (button)
    - volume control (range input)
    - mute toggle (button)

    Acceptance criteria:
    - keyboard accessible
    - screen reader
    - works with mouse

    onloadedmetadata
   */

export function AudioPlayer({
  src = 'https://res.cloudinary.com/jlengstorf/video/upload/v1604528014/jason.af/sfx/airhorn.mp3',
  transcription = 'PEW PEW PEW PEWWWWW',
}) {
  const ref = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mediaTime, setMediaTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlaying = (event) => {
    setIsPlaying(!isPlaying);

    const audioPlayer = ref.current;
    isPlaying ? audioPlayer.pause() : audioPlayer.play();
  };

  const onLoadedMetadata = () => {
    setDuration(Math.round(ref.current.duration));
  };

  const onTimeUpdate = () => {
    setMediaTime(Math.round(ref.current.currentTime));
  };

  const onScrubberChange = (event) => {
    const playhead = parseFloat(event.target.value);
    setMediaTime(playhead);
    ref.current.currentTime = playhead;
  };

  const onChangeSpeed = (newSpeed) => {
    ref.current.playbackRate = newSpeed;
  };

  const onRewind = () => {
    const current = ref.current.currentTime;
    const newTime = Math.max(current - 5, 0);
    setMediaTime(newTime);
    ref.current.currentTime = newTime;
  };

  const onFastForward = () => {
    const current = ref.current.currentTime;
    const newTime = Math.min(current + 5, duration);
    setMediaTime(newTime);
    ref.current.currentTime = newTime;
  };

  return (
    <div>
      <div>
        <button onClick={togglePlaying}>{isPlaying ? 'Pause' : 'Play'}</button>
        <span>elapsed time {mediaTime}</span>
        <span>total duration {duration}</span>

        <label htmlFor="scrubber">scrubber</label>
        <input
          type="range"
          id="scrubber"
          value={mediaTime}
          min={0}
          max={duration}
          onChange={onScrubberChange}
          aria-valuetext={`${mediaTime} seconds`}
        />
        {[1, 1.5, 2].map((speedOption) => (
          <button
            key={`btn-${speedOption}`}
            onClick={() => onChangeSpeed(speedOption)}
          >
            {speedOption}
          </button>
        ))}
        <button onClick={onRewind}>rewind 5 seconds</button>
        <button onClick={onFastForward}>fast-forward 5 seconds</button>
      </div>
      <audio
        ref={ref}
        src={src}
        controls
        onLoadedMetadata={onLoadedMetadata}
        onTimeUpdate={onTimeUpdate}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <p className="transcription">{transcription}</p>
    </div>
  );
}
