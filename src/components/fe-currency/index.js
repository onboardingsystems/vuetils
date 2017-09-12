
import FeCurrency from './fe-currency';

FeCurrency.install = function install(Vue) {
  Vue.component(FeCurrency.name, FeCurrency)
};

export default FeCurrency;
