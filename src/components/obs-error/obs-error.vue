<template>
  <div v-if="isEmpty" class="error obs-error">{{errorText}}</div>
</template>

<script>
export default {
  name: 'ObsError',
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

<style scoped>
  .error {
    color: #c0392b;
  }
</style>
