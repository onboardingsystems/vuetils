import ObsName from './obs-name';

ObsName.install = function install(Vue) {
  Vue.component(ObsName.name, ObsName)
};

export default ObsName;
