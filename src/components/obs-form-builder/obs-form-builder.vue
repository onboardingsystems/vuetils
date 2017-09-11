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
    let currentContext = null;

    // Check if current component is a top level custom component
    // that implements a 'anyErrors' method.
    if (component.$vnode && component.$vnode.tag) {
      if (_.isFunction(component.anyErrors)) {
        currentContext = component;
      }
    }

    let currentComponents = [];

    if (currentContext === null) {
      // Only scan children if parent is not handling the event.
      currentComponents = processChildren(component.$children);
    } else {
      currentComponents.push(currentContext);
    }

    return currentComponents;
  });

  return validatableComponents;
}

function onSubmit() {
  // Check all components to validate, if everything is good then pass to the onsubmit action.
  let results = _.map(this.validatableComponents, (comp) => comp.anyErrors(true));
  results = _.flatten(results);

  if (_.isEmpty(results)) {
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
