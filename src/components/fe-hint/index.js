import FeHint from './fe-hint';

FeHint.install = function install(Vue) {
  Vue.component(FeHint.name, FeHint)
};

export default FeHint;
