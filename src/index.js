import * as components from './components';
// import Formatters from './utils/formatters';

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

// // Used to access a formatter.
// // formatter('phone')('8011234567);
// export function formatter(formatterName) {
//   return Formatters[formatterName];
// }
