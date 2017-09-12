<template>
  <label v-if="somethingToRender" class="control-label fe-label" :for="htmlFor">
    <slot>
      {{text}}
    </slot>
    <fe-required-marker :required="required" />
    <fe-hint :hint="hint" />
  </label>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'FeLabel',
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
    somethingToRender: function() {
      return !_.isEmpty(this.text) || !_.isEmpty(this.hint) || !_.isEmpty(this.$slots.default);
    }
  }
}
</script>

<style scoped>
  label {
    display: block;
    font-weight: 700;
  }
</style>
