import FeError from './fe-error';

FeError.install = function install(Vue) {
  Vue.component(FeError.name, FeError)
};

export default FeError;
