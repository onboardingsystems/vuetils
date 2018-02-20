<template>
  <fe-text :value="value"          :defaultValue="defaultValue"
           :errors="errors"        :formatter="formatter('ordinalFormatter')"
           :id="id"                :className="className"
           :autofocus="autofocus"  :placeholder="placeholder"
           :label="label"          :hint="hint"
           :required="required"    type="text"
           :customValidator="customValidator"
           @update:value="updated"
           @update:parsed="parsed"
           :editable="editable"
           />
</template>

<script>
import Formatters from '../../utils/formatters';

export default {
  name: "FeOrdinal",
  methods: {
    formatter: (type) => Formatters[type],
    updated: function(value) { this.$emit('update:value', value) },
    parsed: function(value) { this.$emit('update:parsed', value) }
  },
  model: {
    prop: 'value',
    event: 'update:value'
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
    }
  }
}
</script>

<style>

</style>
