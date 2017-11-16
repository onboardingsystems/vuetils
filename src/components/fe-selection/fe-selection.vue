<template>
    <div :class="classes">
      <fe-label :text="label" :hint="hint" :htmlFor="initialId" :required="required" />
      <select class="form-control" :id="initialId" :autofocus="autofocus" @change="handleChange" @blur="handleBlur">
        <option v-for="option in options" :key="option.value"
                :value="option.value" :selected="value === option.value">{{option.name}}</option>
      </select>
      <fe-error :errors="combinedErrors" />
    </div>
</template>

<script>
import cx from 'classnames';
import _ from 'lodash';

function data() {
  return {
    internalErrors: [],
    formEditable: null
  }
}

function created() {
  // Push the default selected value back out to the parent component data.
  // Otherwise nothing will be set if the select box does not change the value.
  if (_.isNil(this.value)) {
    this.$emit('update:value', _.first(this.options).value);
  }

  this.$emit('change', {valid: true, parsed: _.first(this.options).value, formatted: _.first(this.options).value});
}

function handleChange({target}) {
  let currentSelected = target.options[target.selectedIndex].value;
  this.$emit('change', {valid: true, parsed: currentSelected, formatted: currentSelected});
  this.$emit('update:value', currentSelected);
}

function handleBlur() {
  this.internalErrors = [];

  if (_.isFunction(this.$listeners.blur)) {
    this.$emit('blur', result)
    return result.errors;
  }
}

function classes() {
  return cx({
    "form-group": true,
    "has-error":  !_.isEmpty(this.anyErrors()),
    [ this.className ]: _.isString(this.className)
  });
}

function initialId() {
  if (_.isEmpty(this.id)) {
    return _.uniqueId('selection_');
  }

  return this.id;
}

function combinedErrors() {
  return this.anyErrors();
}

function anyErrors(checkForErrors = false) {
  if (checkForErrors) {
    this.handleBlur();
  }

  let externalErrors = this.errors || [];
  let internalErrors = this.internalErrors || [];

  if (checkForErrors) {
    return internalErrors;
  } else {
    return externalErrors.concat(internalErrors);
  }
}

export default {
  name: 'FeSelection',
  created,
  methods: {
    handleChange, handleBlur, anyErrors
  },
  computed: {
    classes, initialId, combinedErrors
  },
  props: {
    id: {
      required: false
    },
    label: {
      required: false,
      type: String,
    },
    hint: {
      required: false,
      type: String
    },
    value: {
      required: false,
      type: String
    },
    required: {
      required: false,
      type: Boolean
    },
    options: {
      required: true,
      type: Array
    },
    autofocus: {
      required: false,
      type: Boolean,
      default: false
    },
    errors: {
      required: false,
      type: Array,
      default: () => []
    }
  }
}
</script>

<style>

</style>
