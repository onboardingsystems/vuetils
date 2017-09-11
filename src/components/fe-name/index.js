import FeName from './fe-name';

FeName.install = function install(Vue) {
  Vue.component(FeName.name, FeName)
};

export default FeName;
