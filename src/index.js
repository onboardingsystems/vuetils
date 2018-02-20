import * as components from './components';

function Vuetils(Vue) {
  const Vuetils = components.Vuetils;

  Vue.use(Vuetils, {
    components
  });
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Vuetils);
}

export default Vuetils;
