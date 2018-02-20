<template>
  <div v-if="isEmpty" class="fe-error">{{errorText}}</div>
</template>

<script>
export default {
  name: 'FeError',
  props: {
    errors: {
      required: false,
      type: Array,
      default: function() {return []}
    }
  },
  computed: {
    isEmpty: function() {return !_.isEmpty(this.errors)},
    errorText: function() {return this.errors.join(', ')}
  }
}
</script>

<style>
  .fe-error {
    color: #c0392b;
  }
</style>
