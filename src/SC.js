const axios = require("axios");

class SC {
  init(config) {
    this.config = config;
  }

  get(type, params) {
    return new Promise((resolve, reject) => {
      params.client_id = this.config.clientId;
      let urlParameters = Object.entries(params)
        .map(e => e.join("="))
        .join("&");

      axios({
        url: `${
          this.config.host
        }/https://api-v2.soundcloud.com/${type}?${urlParameters}`
      })
        .then(res => resolve(res.data))
        .catch(err => reject(err));
    });
  }

  stream(type, params) {
    return new Promise((resolve, reject) => {
      params.client_id = this.config.clientId;
      let urlParameters = Object.entries(params)
        .map(e => e.join("="))
        .join("&");

      axios({
        url: `https://api.soundcloud.com/i1/${type}?${urlParameters}`
      })
        .then(res => {
          let Track = new Audio(res.data.http_mp3_128_url);
          Track.setVolume = vol => {
            Track.volume = vol;
          };
          Track.isEnded = () => {
            return Track.ended;
          };
          Track.getDuration = () => {
            return Track.duration;
          };
          Track.seek = to => {
            Track.currentTime = to;
          };
          Track.isPlaying = () => {
            if (Track.defaultPlaybackRate > 0) {
              return true;
            } else {
              return false;
            }
          };
          Track.isActuallyPlaying = () => {
            if (Track.defaultPlaybackRate > 0) {
              return true;
            } else {
              return false;
            }
          };
          resolve(Track);
        })
        .catch(err => reject(err));
    });
  }
}

module.exports = new SC();