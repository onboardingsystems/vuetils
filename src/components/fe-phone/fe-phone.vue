<template>
  <fe-text :value="value"          :defaultValue="defaultValue"
           :errors="errors"        :formatter="formatter('phoneFormatter')"
           :id="id"                :className="className"
           :autofocus="autofocus"  :placeholder="placeholder"
           :label="label"          :hint="hint"
           :required="required"    type="text"
           :customValidator="customValidator"
           @update:value="updated"
           />
</template>

<script>
import Formatters from '../../utils/formatters';

export default {
  name: "FePhone",
  methods: {
    formatter: (type) => Formatters[type],
    updated: function(value) { this.$emit('update:value', value) }
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
    }
  }
}
</script>

<style>

</style>
