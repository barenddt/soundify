import React from "react";
import ReactSlider from "react-slider";

export const PlayerVolume = props => {
  const renderVolIcon = () => {
    let volume = props.volume;
    if (volume >= 66) {
      return <i className="v-icon fas fa-volume-up" />;
    }
    if (volume < 66 && volume >= 33) {
      return <i className="v-icon fas fa-volume-down" />;
    }
    if (volume < 33 && volume >= 1) {
      return <i className="v-icon fas fa-volume-off" />;
    }
    if (volume == 0) {
      return <i className="v-icon fas fa-volume-mute" />;
    }
  };

  return (
    <div className="player-item-volume">
      <div onClick={() => props.adjustVolume(0)}>{renderVolIcon()}</div>
      <ReactSlider
        className="v-slider"
        min={0}
        max={100}
        defaultValue={0}
        value={props.volume}
        onChange={e => props.adjustVolume(e)}
      >
        <div className="v-thumb" />
      </ReactSlider>
    </div>
  );
};

export default PlayerVolume;
