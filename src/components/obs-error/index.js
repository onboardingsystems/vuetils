import ObsError from './obs-error';

ObsError.install = function install(Vue) {
  Vue.component(ObsError.name, ObsError)
};

export default ObsError;
