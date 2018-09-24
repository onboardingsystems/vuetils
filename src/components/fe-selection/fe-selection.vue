<template>
    <div :class="classes">
      <fe-label :text="label" :hint="hint" :htmlFor="initialId" :required="required" />
      <select key="inputElement" class="form-control" :id="initialId" @change="handleChange" @blur="handleBlur" :disabled="!isEditable">
        <option v-if="placeholder !== null && value === null" disabled selected>{{placeholder}}</option>
        <option v-for="option in options" :key="option.value"
                :value="option.value" :selected="value === option.value">{{option.name}}</option>
      </select>
      <fe-error :errors="combinedErrors" />
    </div>
</template>

<script>
import Formatters from '../../utils/formatters';
import _ from 'lodash';

function data() {
  return {
    internalErrors: [],
    formEditable: null,
    gotFocus: false
  }
}

function created() {
  // Push the default selected value back out to the parent component data.
  // Otherwise nothing will be set if the select box does not change the value.
  if (_.isNil(this.placeholder) && _.isNil(this.value)) {
    this.$emit('update:value', _.first(this.options).value);
    this.$emit('input', _.first(this.options).value);
  }

  this.$emit('change', {valid: true, parsed: _.first(this.options).value, formatted: _.first(this.options).value});
}

function handleChange({target}) {
  let currentSelected = target.options[target.selectedIndex].value;
  this.$emit('change', {valid: true, parsed: currentSelected, formatted: currentSelected});
  this.$emit('update:value', currentSelected);
  this.$emit('input', currentSelected);
  this.internalErrors = [];
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

function format(value) {
  return this.formatter(value, {required: this.required});
}

function classes() {
  return {
    "form-group": true,
    "has-error":  !_.isEmpty(this.anyErrors())
  };
}

function executeFocus() {
  if (this.focus && !this.gotFocused) {

    this.$nextTick(() => {
      this.$refs.inputElement.focus();
    });

    this.gotFocused = true;
  }
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
  data,
  created,
  mounted() {this.executeFocus()},
  methods: {
    handleChange, handleBlur, anyErrors, format, formatAndValidate,
    executeFocus
  },
  computed: {
    classes, initialId, combinedErrors,
    isEditable() {
      if (_.isNil(this.formEditable)) {
        return this.editable
      }

      return this.formEditable
    }
  },
  watch: {
    focus(newValue) {
      if (!newValue) {
        this.gotFocused = false;
      }

      this.executeFocus();
    }
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
    focus: {
      required: false,
      type: Boolean,
      default: false
    },
    placeholder: {
      required: false,
      type: String,
      default: null
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
    formatter: {
      requied: false,
      type: Function,
      default: Formatters.string
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
