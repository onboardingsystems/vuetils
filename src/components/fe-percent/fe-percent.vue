<template>
  <fe-text :value="value"          :defaultValue="defaultValue"
           :errors="errors"        :formatter="formatter('percentFormatter')"
           :id="id"                :className="className"
           :autofocus="autofocus"  :placeholder="placeholder"
           :label="label"          :hint="hint"
           :required="required"    type="text"
           :right-align="rightAlign"
           :tabindex="tabindex"
           :no-tab="no-tab"
           :customValidator="customValidator"
           @input="updated"
           @parsed="parsed"
           @formatted="(newValue) => $emit('formatted', newValue)"
           :editable="editable"
           :initialFormatEvent="initialFormatEvent"
           />
</template>

<script>
import Formatters from '../../utils/formatters';

export default {
  name: "FePercent",
  methods: {
    formatter: (type) => Formatters[type],
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
      type: [String, Number]
    },
    defaultValue: {
      required: false,
      type: [String, Number],
      default: ''
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
    initialFormatEvent: {
      required: false,
      type: Boolean,
      default: false
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
