<template>
  <div :class="classes">
    <fe-label :text="label" :hint="hint" :htmlFor="initialId" :required="required" />
    <textarea v-if="isEditable" :id="initialId" class="form-control fe-text-area" :rows="rows" :value="value"
      :placeholder="placeholder" @change="handleChange" @blur="handleBlur" />
    <pre v-if="!isEditable">{{value}}</pre>
    <fe-error :errors="combinedErrors" />
  </div>
</template>

<script>
import _ from 'lodash';
import Formatters from '../../utils/formatters';

function data() {
  return {
    internalErrors: [],
    formEditable: null
  }
}

function classes() {
  return {
    "form-group": true,
    "has-error":  !_.isEmpty(this.anyErrors())
  };
}

function format(value) {
  return this.formatter(value, {required: this.required});
}

// having a value of null can be bad for our controlled inputs, even if for a
// little while.  So since our defaultValue doesn't kick in right away we
// still need something here to help prevent bad values from being rendered.
function initialValue() {
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

function initialId() {
  if (_.isEmpty(this.id)) {
    return _.uniqueId('textarea_');
  }

  return this.id;
}

function handleChange(e) {
  this.internalErrors = [];
  let result = this.formatAndValidate(e.target.value);
  this.internalErrors = result.errors;

  this.$emit('update:value', result.formatted);
  this.$emit('input', result.formatted);
  this.$emit('update:parsed', result.parsed);
  this.$emit('parsed', result.parsed);
  this.$emit('change', result.formatted);
}

function handleBlur(e) {
  this.internalErrors = [];
  let result = this.formatAndValidate(e.target.value);
  this.internalErrors = result.errors;
  this.$emit('blur', result);
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

    this.$emit('update:value', formatted);
    this.$emit('input', formatted);
    this.$emit('update:parsed', parsed);
    this.$emit('parsed', parsed);
    this.$emit('change', formatted);
  } else {
    let {valid, formatted, parsed} = this.formatAndValidate(this.value);

    // Should only be pushed out if the value was changed by the formatter.
    if (this.value !== formatted) {
      this.$emit('update:value', formatted);
      this.$emit('input', formatted);
      this.$emit('update:parsed', parsed);
      this.$emit('parsed', parsed);
      this.$emit('change', formatted);
    }
  }
}

function combinedErrors() {
  return this.anyErrors();
}

function anyErrors(checkForErrors = false) {
  if (checkForErrors) {
    this.handleBlur({target: {value: this.value}});
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
  name: "FeTextarea",
  data,
  mounted,
  methods: {
    handleBlur, handleChange, formatAndValidate, format, anyErrors
  },
  computed: {
    classes, initialValue, combinedErrors, initialId, isEditable
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
    formatter: {
      requied: false,
      type: Function,
      default: Formatters.required
    },
    id: {
      required: false,
      type: String
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
    rows: {
      required: false,
      type: [String, Number],
      default: 3
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
