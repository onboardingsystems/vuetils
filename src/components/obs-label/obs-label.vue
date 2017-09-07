<template>
  <label v-if="somethingToRender" class="control-label obs-label" :for="htmlFor">
    {{text}}
    <obs-required-marker :required="required" />
    <obs-hint :hint="hint" />
  </label>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'ObsLabel',
  props: {
    text: {
      required: false,
      type: String,
      default: ''
    },
    htmlFor: {
      required: false,
      type: String,
      default: ''
    },
    required: {
      required: false,
      type: Boolean,
      default: false
    },
    hint: {
      required: false,
      type: String
    }
  },
  computed: {
    somethingToRender: function() {return !_.isEmpty(this.text) || !_.isEmpty(this.hint)}
  }
}
</script>

<style scoped>
  label {
    display: block;
    font-weight: 700;
  }
</style>
