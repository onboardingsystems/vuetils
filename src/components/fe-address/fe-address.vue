<template>
  <div :class="classes">
    <fe-label :text="label" :required="required" :htmlFor="id" />
    <fe-hint :hint="hint" />
    <fe-compound-layout layout="full">
      <fe-text :id="id" ref="street"
        :value="valueFor(streetNameAttr)"
        @input="streetChanged"
        :required="required" :formatter="formatter('stringFormatter')"
        placeholder="Address"
        :class="classesFor(streetNameAttr, 'address-line-1')"
        @change="value => onChangeEvent(streetNameAttr, value)"
        @blur="result => onBlurEvent(streetNameAttr, result)"
        :editable="editable"
        :autofocus="autofocus" :custom-validator="streetCustomValidator" />

      <fe-compound-layout  layout="inline">
        <div class="flex-grow-shrink">
          <fe-text ref="city"
            :value="valueFor(cityNameAttr)"
            @input="cityChanged"
            :required="required" :formatter="formatter('stringFormatter')"
            placeholder="City"
            :class="classesFor(cityNameAttr, 'address-city')"
            @change="value => onChangeEvent(cityNameAttr, value)"
            @blur="result => onBlurEvent(cityNameAttr, result)"
            :editable="editable"
            :custom-validator="cityCustomValidator" />
        </div>
        <div class="flex-static">
          <fe-text ref="state"
            :value="valueFor(stateNameAttr)"
            @input="stateChanged"
            :required="required" :formatter="formatter('stateFormatter')"
            placeholder="ST"
            :class="classesFor(stateNameAttr, 'fe-address-state state')"
            @change="value => onChangeEvent(stateNameAttr, value)"
            @blur="result => onBlurEvent(stateNameAttr, result)"
            :editable="editable"
            :custom-validator="stateCustomValidator" />
        </div>
        <div class="flex-static">
          <fe-text ref="zip"
            :value="valueFor(zipNameAttr)"
            @input="zipChanged"
            :required="required" :formatter="formatter('zipcodeFormatter')"
            placeholder="Zip"
            :class="classesFor(zipNameAttr, 'fe-address-zipcode zipcode')"
            @change="value => onChangeEvent(zipNameAttr, value)"
            @blur="result => onBlurEvent(zipNameAttr, result)"
            :editable="editable"
            :custom-validator="zipCustomValidator" />
        </div>
      </fe-compound-layout >
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
    internalErrors: []
  };
}

function classes() {
  return cx({
    'fe-address-us': true,
    'form-group': true,
    'has-child-error': !_.isEmpty(this.anyErrors()),
    "has-error": !_.isEmpty(this.anyErrors()),
    [this.className]: _.isString(this.className)
  });
}

function classesFor(attr, classes = "") {
  return cx({
    [classes]: _.isString(classes),
    "has-error": !_.isEmpty(this.anyErrors())
  });
}

function onChangeEvent(attribute, value) {
  this.$emit('change', attribute, value);
}

function onBlurEvent(attribute, result) {
  if (_.isFunction(this.$listeners.blur)) {
    this.$emit('blur', attribute, result);
  } else {
    let updatedErrors = {
      [this.streetNameAttr]: this.internalErrors[this.streetNameAttr],
      [this.cityNameAttr]: this.internalErrors[this.cityNameAttr],
      [this.stateNameAttr]: this.internalErrors[this.stateNameAttr],
      [this.zipNameAttr]: this.internalErrors[this.zipNameAttr]
    };

    updatedErrors[attribute] = result.errors;
    this.internalErrors = updatedErrors
  }
}

function combinedErrors() {
  return this.anyErrors();
}

function anyErrors(checkForErrors = false) {
  if (checkForErrors) {
    this.$refs.street.anyErrors(checkForErrors);
    this.$refs.city.anyErrors(checkForErrors);
    this.$refs.state.anyErrors(checkForErrors);
    this.$refs.zip.anyErrors(checkForErrors);
  }

  let errors = this.errors || {};

  let externalStreetErrors = errors[this.streetNameAttr] || [];
  let internalStreetErrors = this.internalErrors[this.streetNameAttr] || [];
  let externalCityErrors = errors[this.cityNameAttr] || [];
  let internalCityErrors = this.internalErrors[this.cityNameAttr] || [];
  let externalStateErrors = errors[this.stateNameAttr] || [];
  let internalStateErrors = this.internalErrors[this.stateNameAttr] || [];
  let externalZipErrors = errors[this.zipNameAttr] || [];
  let internalZipErrors = this.internalErrors[this.zipNameAttr] || [];

  let streetErrors, cityErrors, stateErrors, zipErrors;

  if (checkForErrors) {
    streetErrors = internalStreetErrors.slice(0);
    cityErrors = internalCityErrors.slice(0);
    stateErrors = internalStateErrors.slice(0);
    zipErrors = internalZipErrors.slice(0);
  } else {
    streetErrors = externalStreetErrors.slice(0).concat(internalStreetErrors.slice(0));
    cityErrors = externalCityErrors.slice(0).concat(internalCityErrors.slice(0));
    stateErrors = externalStateErrors.slice(0).concat(internalStateErrors.slice(0));
    zipErrors = externalZipErrors.slice(0).concat(internalZipErrors.slice(0));
  }

  streetErrors = _.map(streetErrors, (message) => `Street ${message}`);
  cityErrors = _.map(cityErrors, (message) => `City ${message}`);
  stateErrors = _.map(stateErrors, (message) => `State ${message}`);
  zipErrors = _.map(zipErrors, (message) => `Zip Code ${message}`);

  return streetErrors.concat(cityErrors)
                     .concat(stateErrors)
                     .concat(zipErrors);
}

function valueUpdated(attribute, newValue) {
  let existingValue = this.value || {};

  let value = {
    [this.streetNameAttr]: existingValue[this.streetNameAttr],
    [this.cityNameAttr]: existingValue[this.cityNameAttr],
    [this.stateNameAttr]: existingValue[this.stateNameAttr],
    [this.zipNameAttr]: existingValue[this.zipNameAttr]
  };

  value[attribute] = newValue;
  this.$emit('update:value', value);
  this.$emit('input', value);
}

export default {
  name: "FeAddress",
  data,
  methods:{
    anyErrors, onChangeEvent, onBlurEvent,
    classesFor, valueUpdated,
    streetChanged: function(newValue) {this.valueUpdated(this.streetNameAttr, newValue)},
    cityChanged: function(newValue) {this.valueUpdated(this.cityNameAttr, newValue)},
    stateChanged: function(newValue) {this.valueUpdated(this.stateNameAttr, newValue)},
    zipChanged: function(newValue) {this.valueUpdated(this.zipNameAttr, newValue)},
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
    streetNameAttr: {
      required: false,
      type: String,
      default: 'street_1'
    },
    cityNameAttr: {
      required: false,
      type: String,
      default: 'city'
    },
    stateNameAttr: {
      required: false,
      type: String,
      default: 'state'
    },
    zipNameAttr: {
      required: false,
      type: String,
      default: 'zip'
    },
    errors: {
      required: false,
      type: Object,
      default: () => {}
    },
    label: {
      required: false,
      type: String,
      default: 'Address'
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
    streetCustomValidator: {
      required: false,
      type: Function
    },
    cityCustomValidator: {
      required: false,
      type: Function
    },
    stateCustomValidator: {
      required: false,
      type: Function
    },
    zipCustomValidator: {
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

<style lang="sass">
  .fe-address-us {
    .fe-address-state {
      width: 55px;
    }
    .fe-address-zipcode {
      width: 74px;
    }
  }
</style>
