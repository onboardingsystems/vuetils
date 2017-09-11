<template>
  <div :class="classes">
    <fe-label :text="label" :hint="hint" :htmlFor="initialId" :required="required" />
    <input :id="initialId" class="form-control fe-text" :type="type" :value="value"
      :placeholder="placeholder"
      @change="handleChange" @blur="handleBlur"
      :autofocus="autofocus" />
    <fe-error :errors="combinedErrors" />
  </div>
</template>

<script>
import _ from 'lodash';
import Formatters from '../../utils/formatters';
import cx from 'classnames';

function data() {
  return {
    internalErrors: []
  };
}

function classes() {
  return cx({
    "form-group": true,
    "has-error":  !_.isEmpty(this.anyErrors()),
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
  if (newProps.value !== currentValue && _.isFunction(this.onChange)) {
    var result = this.formatAndValidate(newProps.value);
    if (result.valid) {
      this.onChange(result.formatted);
    }
  }

  if (_.isNil(this.value)) {
    return "";
  } else {
    return this.formatAndValidate(value);
  }
}

function formatAndValidate(value) {
  let formatResult = this.format(value);
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
    var result = this.formatAndValidate(e.target.value);
    this.$emit('update:value', result.formatted);
  }
}

function handleBlur() {
  this.internalErrors = [];
  let result = this.formatAndValidate(this.value);

  if (_.isFunction(this.onBlur)) {
    this.onBlur(result);
    return result.errors;
  } else {
    this.internalErrors = result.errors;
  }
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
    let {valid, parsed, formatted} = this.formatAndValidate(this.defaultValue);

    if(valid && _.isFunction(this.onChange)) {
      this.onChange(formatted);
    } else {
      this.$emit('update:value', formatted);
    }
  } else {
    let {valid, formatted} = this.formatAndValidate(this.value);

    if (valid && _.isFunction(this.onChange)) {
      this.onChange({formatted});
    } else {
      this.$emit('update:value', formatted);
    }
  }
}

function initialId() {
  if (_.isEmpty(this.id)) {
    return _.uniqueId('text_');
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

  return externalErrors.concat(internalErrors);
}

export default {
  name: "FeText",
  data,
  mounted,
  methods: {
    handleBlur, handleChange, anyErrors, formatAndValidate, format
  },
  computed: {
    classes, initialValue, combinedErrors, initialId
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
    }
  }
}
</script>

<style>

</style>
