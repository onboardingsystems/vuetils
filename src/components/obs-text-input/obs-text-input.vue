<template>
  <div :class="classes">
    <ObsLabel :text="label" :hint="hint" :htmlFor="id" :required="required" />
    <input :id="id" class="form-control obs-text-input" :type="type" :value="value"
      :placeholder="placeholder"
      @change="handleChange" @blur="handleBlur"
      :autofocus="autofocus" />
    <ObsError :errors="errors" />
  </div>
</template>

<script>
import _ from 'lodash';
import Formatters from '../../utils/formatters';
import cx from 'classnames';

function classes() {
  return cx({
    "form-group": true,
    "has-error":  !_.isEmpty(this.errors),
    [ this.className ]: _.isString(this.className)
  });
}

function format(value) {
  return this.formatter(value, {required: this.required});
}

// having a value of null can be bad for our controlled inputs, even if for a
// little while.  So since our defaultValue doesn't kick in right away we
// still need something here to help prevent bad values from being rendered.
function initialValue() {
  let currentValue = document.getElementById(this.id).value;
  if (newProps.value !== currentValue && _.isFunction(this.props.onChange)) {
    var result = this.formatAndValidate(newProps.value)
    if (result.valid)
      this.props.onChange(result.formatted)
  }

  if (_.isNil(this.value)) {
    return "";
  } else {
    return this.formatAndValidate(value);
  }
}

function formatAndValidate(value) {
  let formatResult = format.apply(this, value);
  // run the customValidator if there is one.  Modify the formatResults if
  // there are errors.
  if (_.isFunction(this.customValidator)) {
    let customErrors = this.customValidator(formatResult.formatted);
    if (!_.isEmpty(customErrors)) {
      formatResult.valid = false;
      formatResult.parsed = null;
      formatResult.errors = _.concat(formatResult.errors, customErrors);
    }
  }
  return formatResult;
}

function handleChange(e) {
  if (_.isFunction(this.onChange)) {
    this.onChange(e.target.value);
  } else {
    this.$emit('update:value', e.target.value);
  }
}

function handleBlur() {
  if (_.isFunction(this.onBlur)) {
    var result = formatAndValidate.apply(this, this.value);
    this.onBlur(result);
    return result.errors;
  }
}

function isValid() {
  return false;
}

export default {
  name: "ObsTextInput",
  methods: {
    handleBlur, handleChange, isValid
  },
  computed: {
    classes, initialValue
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
    formatter: {
      requied: false,
      type: Function,
      default: Formatters.requiredFormatter
    },
    id: {
      required: false,
      type: String,
      default: _.uniqueId('text_')
    },
    className: {
      required: false,
      type: String,
      default: ''
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
    type: {
      required: false,
      type: String,
      default: 'text'
    },
    customValidator: {
      required: false,
      type: Function
    },
    onChange: {
      required: false,
      type: Function
    },
    onBlur: {
      required: false,
      type: Function
    },
    didMount: {
      required: false,
      type: Function
    },
    willUnmount: {
      required: false,
      type: Function
    }
  }
}
</script>

<style>

</style>
