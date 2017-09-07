import ObsRequireMarker from './obs-required-marker';

ObsRequireMarker.install = function install(Vue) {
  Vue.component(ObsRequireMarker.name, ObsRequireMarker)
};

export default ObsRequireMarker;
