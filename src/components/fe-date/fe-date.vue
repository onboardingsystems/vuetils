<template>
  <fe-text :value="value"          :defaultValue="defaultValue"
           :errors="errors"        :formatter="dateFormatter"
           :id="id"                :className="className"
           :autofocus="autofocus"  :placeholder="placeholder"
           :label="label"          :hint="hint"
           :required="required"    type="text"
           :right-align="rightAlign"
           :tabindex="tabindex"
           :no-tab="no-tab"
           :customValidator="customValidator"
           @input="updated"
           @update:parsed="parsed"
           :editable="editable"
           />
</template>

<script>
import Formatters from '../../utils/formatters';

function dateFormatter(value, opt = {}) {
  return Formatters.dateFormatter(value, _.merge({}, opt, {format: this.format}));
}

export default {
  name: "FeDate",
  methods: {
    dateFormatter,
    updated: function(value) {
      this.$emit('update:value', value);
      this.$emit('input', value);
    },
    parsed: function(value) {
      this.$emit('update:parsed', value);
      this.$emit('parsed', value);
    }
  },
  props: {
    value: {
      required: false,
      type: String
    },
    defaultValue: {
      required: false,
      type: String,
      default: ''
    },
    format: {
      required: false,
      type: String,
      default: 'full-date'
    },
    errors: {
      required: false,
      type: Array,
      default: function() {return []}
    },
    id: {
      required: false,
      type: String
    },
    className: {
      required: false,
      type: String
    },
    autofocus: {
      required: false,
      type: Boolean,
      default: false
    },
    placeholder: {
      required: false,
      type: String,
      default: ''
    },
    label: {
      required: false,
      type: String,
      default: ''
    },
    hint: {
      required: false,
      type: String,
      default: ''
    },
    required: {
      required: false,
      type: Boolean,
      default: false
    },
    customValidator: {
      required: false,
      type: Function
    },
    editable: {
      required: false,
      type: Boolean,
      default: true
    },
    tabindex: {
      required: false,
      type: [String, Number],
      default: "0"
    },
    noTab: {
      required: false,
      type: Boolean,
      default: false
    },
    rightAlign: {
      required: false,
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>

</style>
