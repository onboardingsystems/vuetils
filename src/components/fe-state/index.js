
import FeState from './fe-state';

FeState.install = function install(Vue) {
  Vue.component(FeState.name, FeState)
};

export default FeState;
