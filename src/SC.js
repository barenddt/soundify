const axios = require("axios");
const getUrls = require("get-urls");
const util = require("audio-buffer-utils");

class SC {
  init(config) {
    this.config = config;
  }

  get(type, params) {
    return new Promise((resolve, reject) => {
      params == undefined ? (params = {}) : null;
      params.client_id = this.config.clientId;
      let urlParameters = Object.entries(params)
        .map((e) => e.join("="))
        .join("&");

      let url = `https://api-v2.soundcloud.com${type}?${urlParameters}`;

      url = this.config.cors
        ? "https://cors-anywhere.herokuapp.com/" + url
        : url;

      axios({
        url: url,
        headers: {
          "x-requested-with": "https://soundcloud.com"
        }
      })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  stream(type) {
    return new Promise((resolve, reject) => {
      let newUrl = `https://cors-anywhere.herokuapp.com/${type}?client_id=${this.config.clientId}`;
      axios({
        url: newUrl,
        headers: {
          "x-requested-with": "https://soundcloud.com"
        }
      }).then((song) => {
        axios(song.data.url).then((result) => {
          let parts = [];

          getUrls(result.data).forEach((part) => parts.push(part));

          let blobs = [];

          for (let i = 0; i < parts.length; i++) {
            fetch(parts[i])
              .then((stream) => stream.blob())
              .then((blob) => {
                blobs[i] = blob;
                if (i == parts.length - 1) {
                  let tune = new Blob(blobs);

                  let Track = new Audio(URL.createObjectURL(tune));

                  Track.setVolume = (vol) => {
                    Track.volume = vol;
                  };
                  Track.isEnded = () => {
                    return Track.ended;
                  };
                  Track.getDuration = () => {
                    return Track.duration;
                  };
                  Track.seek = (to) => {
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
                }
              });
          }
        });
      });
    }).catch((err) => reject(err));
  }
}

module.exports = new SC();
