<template>
    <div v-if="direction === 'vertical'" :class="groupClasses" :id="id">
      <fe-label class="control-label" :hint="hint" :htmlFor="id" :required="required">{{label}}</fe-label>
      <div class="radio" v-for="option in options" :key="option.value">
        <label :class="{'radio-label': true, 'checked': isChecked(option)}">
          <input type="radio" :disabled="!isEditable" :name="initialId" :value="option.value" :checked="isChecked(option)" @change="handleChange" @blur="handleBlur" :autofocus="autofocus" />
          {{option.name}}
        </label>
      </div>
      <fe-error :errors="combinedErrors" />
    </div>
    <div v-else :class="groupClasses" :id="id">
      <fe-label class="control-label" :hint="hint" :htmlFor="id" :required="required">{{label}}</fe-label>
      <div class="radio" style="display: inline-block" v-for="option in options" :key="option.value">
        <label :class="{'radio-label': true, 'checked': isChecked(option), 'disabled': option['disabled'] === true}" style="margin-left: 10px;">
          <input type="radio" :disabled="!isEditable || option['disabled']" :name="initialId" :value="option.value" :checked="isChecked(option)" @change="handleChange" @blur="handleBlur" :autofocus="autofocus" />
          {{option.name}}
        </label>
      </div>
      <fe-error :errors="combinedErrors" />
    </div>
</template>

<script>
import _ from 'lodash';
import cx from 'classnames';

function data() {
  return {
    internalErrors: [],
    formEditable: null
  };
}

function groupClasses() {
  return cx({
    "form-group": true,
    "has-error":  !_.isEmpty(this.anyErrors()),
    [this.className]: _.isString(this.className)
  });
}

function isChecked(option) {
  return this.value === option.value;
}

function initialId() {
  if (_.isEmpty(this.id)) {
    return _.uniqueId('option_');
  }

  return this.id;
}

function mounted() {
  // If props.value is nil (undefined or null), fall back to
  // props.defaultValue and submit the formatted and parsed defaultValue back
  // to the formBuilder so we can be rendered again with a valid value in our
  // props.
  //
  // A defaultValue that responds to _.isNil will result in an infinate loop.
  // So check that the defaultValue will not respond to isNil before
  // submitting a new value for props.value.
  if (_.isNil(this.value) && !_.isNil(this.defaultValue)) {
    var {valid: valid, parsed: parsed, formatted: formatted} = this.formatAndValidate(this.defaultValue)
    if(valid) {
      this.$emit('update:value', formatted);
      this.$emit('change', formatted);
    }
  } else {
    var {valid: valid, formatted: formatted} = this.formatAndValidate(this.value)
    if(valid) {
      this.$emit('update:value', formatted);
      this.$emit('change', formatted);
    }
  }
}

function formatAndValidate(value) {
  var formatted, parsed, errors = []

  // rewrite "blank" values as null
  if (_.isNil(value))
    value = null;
  if (_.isEmpty(value))
    value = null;

  // both formatted and parsed values are the same.  This is by design to
  // simplify things.  Otherwise, the value props would have to be able to
  // accept the formatted or parsed value as valid input.
  formatted = value;
  parsed = value;

  // check for required
  if (this.required && _.isNull(parsed)) {
    errors.push('is required');
  }

  // check for inclusion in the list of options, but only if there wasn't a
  // requirement error first
  if (_.isEmpty(errors)) {
    let allowedValues = _.map(this.options, "value");

    if (!_.includes(allowedValues, value)) {
      errors.push('invalid value');
      parsed = null;
    }
  }

  return {
    valid: errors.length === 0,
    parsed,
    formatted,
    errors
  };
}

function handleChange(e) {
  this.internalErrors = [];
  let result = this.formatAndValidate(e.target.value);
  this.$emit('update:value', result.formatted);
  this.$emit('change', result.formatted);
}

function handleBlur() {
  this.internalErrors = [];
  let result = this.formatAndValidate(this.value);

  if (_.isFunction(this.$listeners.blur)) {
    this.$emit('blur', result)
    return result.errors;
  } else {
    this.internalErrors = result.errors;
  }
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

function isEditable() {
  if (_.isNil(this.formEditable)) {
    return this.editable;
  }

  return this.formEditable;
}

export default {
  name: "FeRadioGroup",
  data,
  mounted,
  methods: {
    isChecked, formatAndValidate, handleChange, handleBlur, anyErrors
  },
  computed: {
    groupClasses, initialId, combinedErrors, isEditable
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
    options: {
      required: false,
      type: Array,
      default: () => []
    },
    direction: {
      required: false,
      type: String,
      default: 'vertical'
    },
    errors: {
      required: false,
      type: Array,
      default: () => []
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
