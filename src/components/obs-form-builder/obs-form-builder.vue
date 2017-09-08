<template>
  <form @submit.prevent>
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


export default {
  name: 'ObsFormBuilder',
  data,
  mounted,
  props: {
  },
  computed: {
  }
}
</script>

<style scoped>
  .error {
    color: #c0392b;
  }
</style>
