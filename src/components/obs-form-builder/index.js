import ObsFormBuilder from './obs-form-builder';

ObsFormBuilder.install = function install(Vue) {
  Vue.component(ObsFormBuilder.name, ObsFormBuilder)
};

export default ObsFormBuilder;
