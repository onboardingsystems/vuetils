<template>
  <form @submit.prevent="onSubmit" >
    <slot />
  </form>
</template>

<script>
import _ from 'lodash';
import cx from 'classnames';

function data() {
  return {
    validatableComponents: []
  }
}

function classes() {
  return cx({
    "form": true,
    [ this.className ]: _.isString(this.className)
  });
}


function mounted() {
  let holder = _.flattenDeep(processChildren(this.$children));
  this.validatableComponents = _.filter(holder, (entry) => entry !== null);
}

function processChildren(children) {
  let validatableComponents = _.map(children, function(component) {
    let currentComponents = processChildren(component.$children);
    let currentContext = null;

    if (_.isEmpty(component._vnode.tag)) {
      let context = component.$vnode.context;
      if (_.isFunction(context.isValid)) {
        currentContext = context;
      }
    }

    currentComponents.push(currentContext);
    return currentComponents;
  });

  return validatableComponents;
}

function onSubmit() {
  // Check all components to validate, if everything is good then pass to the onsubmit action.
  let results = _.map(this.validatableComponents, (comp) => comp.isValid());

  if (results.indexOf(false) === -1) {
    this.onsubmit();
  }
}

export default {
  name: 'ObsFormBuilder',
  data,
  mounted,
  methods: {
    onSubmit
  },
  computed: {
    classes
  },
  props: {
    onsubmit: {
      required: false,
      type: Function,
      default: () => false
    },
    className: {
      required: false,
      type: String
    }
  }
}
</script>

<style>

</style>
