<template>
  <form @submit.prevent="onSubmit" >
    <slot />
  </form>
</template>

<script>
import _ from 'lodash';

function data() {
  return {
    validatableComponents: []
  }
}

function mounted() {
  let holder = _.flattenDeep(processChildren(this.$children));
  this.validatableComponents = _.reject(holder, _.isNull);
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
    this.$emit('submit');
  }
}

function setChildrenEditable(children, editable) {
  _.each(children, function(component) {
    let currentContext = null;

    // Check if current component is a top level custom component
    // that a editable prop
    if (component.$vnode && component.formEditable !== undefined) {
      component.formEditable = editable;
    } else {
      setChildrenEditable(component.$children, editable);
    }
  });
}

function updated() {
  if (!_.isNil(this.editable)) {
    setChildrenEditable(this.$children, this.editable);
  }
}

export default {
  name: 'FeForm',
  data,
  mounted,
  updated,
  methods: {
    onSubmit
  },
  props: {
    editable: {
      required: false,
      type: Boolean,
      default: null
    }
  }
}
</script>

<style>

</style>
