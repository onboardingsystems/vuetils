import load from '../../utils/load';

const Vuetils = {
  install(Vue, opts = {}) {
    const $vuetils = {
      load,
      breakpoint: {}
    }

    Vue.util.defineReactive({}, 'breakpoint', $vuetils);

    Vue.prototype.$vuetils = $vuetils;

    if (opts.transitions) {
      Object.keys(opts.transitions).forEach(key => {
        const t = opts.transitions[key];
        if (t.name !== undefined && t.name.startsWith('v-')) {
          Vue.component(t.name, t);
        }
      });
    }

    if (opts.directives) {
      Object.keys(opts.directives).forEach(key => {
        const d = opts.directives[key];
        Vue.directive(d.name, d);
      });
    }

    if (opts.components) {
      Object.keys(opts.components).forEach(key => {
        const c = opts.components[key];
        Vue.use(c);
      });
    }
  }
}

export default Vuetils;
