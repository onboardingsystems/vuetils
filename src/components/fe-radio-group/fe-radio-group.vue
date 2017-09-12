<template>
    <div :class="groupClasses" :id="id">
      <fe-label class="radio-group-label" :hint="hint" :htmlFor="id" :required="required">{{label}}</fe-label>
      <fe-error :errors="errors" />
    </div>
</template>

<script>
import Formatters from '../../utils/formatters';
import _ from 'lodash';
import cx from 'classnames';

function groupClasses() {
  return cx({
    "form-group": true,
    "has-error":  !_.isEmpty(this.errors),
    [this.className]: _.isString(this.className)
  });
}

export default {
  name: "FeRadioGroup",
  computed: {
    groupClasses
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
    options: {
      required: false,
      type: Array,
      default: () => []
    },
    errors: {
      required: false,
      type: Array,
      default: () => {}
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
    label: {
      required: false,
      type: String
    },
    hint: {
      required: false,
      type: String
    },
    required: {
      required: false,
      type: Boolean,
      default: true
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
