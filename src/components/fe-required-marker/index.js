import FeRequireMarker from './fe-required-marker';

FeRequireMarker.install = function install(Vue) {
  Vue.component(FeRequireMarker.name, FeRequireMarker)
};

export default FeRequireMarker;
