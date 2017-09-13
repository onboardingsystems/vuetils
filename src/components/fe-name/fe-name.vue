<template>
  <div :class="classes">
    <fe-label :text="label" :required="required" :htmlFor="id" :hint="hint" />
    <fe-compound-layout layout="inline">
      <div class="flex-grow-shrink">
        <fe-text :id="id" ref="firstNameField"
          :value="valueFor(firstNameAttr)"
          @update:value="onFirstNameChanged"
          :required="required" :formatter="formatter('stringFormatter')"
          placeholder="First"
          :class="classesFor(firstNameAttr, 'name-first')"
          @change="value => onChangeEvent(firstNameAttr, value)"
          @blur="result => onBlurEvent(firstNameAttr, result)"
          :autofocus="autofocus"
          :custom-validator="firstNameCustomValidator"
          :editable="editable" />
      </div>
      <div class="flex-grow-shrink">
        <fe-text ref="lastNameField"
          :value="valueFor(lastNameAttr)"
          @update:value="onLastNameChanged"
          :required="required" :formatter="formatter('stringFormatter')"
          placeholder="Last"
          :className="classesFor(lastNameAttr, 'name-last')"
          @change="value => onChangeEvent(lastNameAttr, value)"
          @blur="result => onBlurEvent(lastNameAttr, result)"
          :custom-validator="lastNameCustomValidator"
          :editable="editable" />
      </div>
    </fe-compound-layout >
    <fe-error :errors="combinedErrors" />
  </div>
</template>

<script>
import Formatters from '../../utils/formatters';
import _ from 'lodash';
import cx from 'classnames';

function data() {
  return {
    inputs: [],
    internalErrors: {}
  };
}

function classes() {
  return cx({
    'form-group': true,
    'has-child-error': !_.isEmpty(this.anyErrors()),
    [ this.className ]: _.isString(this.className)
  });
}

function classesFor(attr, classes = "") {
  return cx({
    [classes]: _.isString(classes),
    "has-error": !_.isEmpty(this.anyErrors())
  });
}

function combinedErrors() {
  return this.anyErrors();
}

function onChangeEvent(attribute, value) {
  this.$emit('change', attribute, value);
}

function onBlurEvent(attribute, result) {
  if (_.isFunction(this.$listeners.blur)) {
    this.$emit('blur', attribute, result);
  } else {
    if (attribute === this.firstNameAttr) {
      this.internalErrors = {
        [this.firstNameAttr]: result.errors,
        [this.lastNameAttr]: this.internalErrors[this.lastNameAttr]
      };
    } else {
      this.internalErrors = {
        [this.firstNameAttr]: this.internalErrors[this.firstNameAttr],
        [this.lastNameAttr]: result.errors
      };
    }
  }
}

function anyErrors(checkForErrors = false) {
  if (checkForErrors) {
    this.$refs.firstNameField.anyErrors(checkForErrors);
    this.$refs.lastNameField.anyErrors(checkForErrors);
  }

  let errors = this.errors || {};

  let externalFirstNameErrors = errors[this.firstNameAttr] || [];
  let internalFirstNameErrors = this.internalErrors[this.firstNameAttr] || [];
  let externalLastNameErrors = errors[this.lastNameAttr] || [];
  let internalLastNameErrors = this.internalErrors[this.lastNameAttr] || [];

  let firstNameErrors, lastNameErrors;

  if (checkForErrors) {
    firstNameErrors = internalFirstNameErrors.slice(0);
    lastNameErrors = internalLastNameErrors.slice(0);
  } else {
    firstNameErrors = externalFirstNameErrors.slice(0).concat(internalFirstNameErrors.slice(0));
    lastNameErrors = externalLastNameErrors.slice(0).concat(internalLastNameErrors.slice(0));
  }

  firstNameErrors = _.map(firstNameErrors, (message) => `First Name ${message}`);
  lastNameErrors = _.map(lastNameErrors, (message) => `Last Name ${message}`);

  return firstNameErrors.concat(lastNameErrors);
}

function onFirstNameChanged(value) {
  this.$emit('update:value', {
    [this.firstNameAttr]: value,
    [this.lastNameAttr]: this.valueFor(this.lastNameAttr)
  });
}

function onLastNameChanged(value) {
  this.$emit('update:value', {
    [this.firstNameAttr]: this.valueFor(this.firstNameAttr),
    [this.lastNameAttr]: value
  });
}

export default {
  name: "FeName",
  data,
  methods:{
    classesFor, anyErrors,
    onFirstNameChanged, onLastNameChanged,
    onChangeEvent, onBlurEvent,
    formatter: (type) => Formatters[type],
    valueFor: function(attr) {return _.get((this.value || {}), attr)}
  },
  computed: {
    classes, combinedErrors
  },
  props: {
    value: {
      required: false,
      type: Object
    },
    firstNameAttr: {
      required: false,
      type: String,
      default: "first_name"
    },
    lastNameAttr: {
      required: false,
      type: String,
      default: "last_name"
    },
    errors: {
      required: false,
      type: Object,
      default: () => {}
    },
    label: {
      required: false,
      type: String,
      default: 'Name'
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
    firstNameCustomValidator: {
      required: false,
      type: Function
    },
    lastNameCustomValidator: {
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
