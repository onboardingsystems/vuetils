<template>
  <div :class="classes">
    <obs-label :text="label" :required="required" :htmlFor="id" />
    <obs-hint :hint="hint" />
    <obs-compound-layout layout="full">
      <obs-text-input :id="id" ref="street"
        :value="valueFor(streetNameAttr)"
        @update:value="streetChanged"
        :required="required" :formatter="formatter('stringFormatter')"
        placeholder="Address"
        :className="classesFor(streetNameAttr, 'address-line-1')"
        :on-change="onChangeEvent(streetNameAttr)"
        :on-blur="onBlurEvent(streetNameAttr)"
        :autofocus="autofocus" :custom-validator="streetCustomValidator" />

      <obs-compound-layout  layout="inline">
        <div className="flex-grow-shrink">
          <obs-text-input ref="city"
            :value="valueFor(cityNameAttr)"
            @update:value="cityChanged"
            :required="required" :formatter="formatter('stringFormatter')"
            placeholder="City"
            :className="classesFor(cityNameAttr, 'address-city')"
            :on-change="onChangeEvent(cityNameAttr)"
            :on-blur="onBlurEvent(cityNameAttr)"
            :custom-validator="cityCustomValidator" />
        </div>
        <div className="flex-static">
          <obs-text-input ref="state"
            :value="valueFor(stateNameAttr)"
            @update:value="stateChanged"
            :required="required" :formatter="formatter('stateFormatter')"
            placeholder="ST"
            :className="classesFor(stateNameAttr, 'address-state state')"
            :on-change="onChangeEvent(stateNameAttr)"
            :on-blur="onBlurEvent(stateNameAttr)"
            :custom-validator="stateCustomValidator" />
        </div>
        <div className="flex-static">
          <obs-text-input ref="zip"
            :value="valueFor(zipNameAttr)"
            @update:value="zipChanged"
            :required="required" :formatter="formatter('zipcodeFormatter')"
            placeholder="Zip"
            :className="classesFor(zipNameAttr, 'address-zipcode zipcode')"
            :on-change="onChangeEvent(zipNameAttr)"
            :on-blur="onBlurEvent(zipNameAttr)"
            :custom-validator="zipCustomValidator" />
        </div>
      </obs-compound-layout >
    </obs-compound-layout >
    <obs-error :errors="combinedErrors" />
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
    'address-us': true,
    'form-group': true,
    'has-child-error': !_.isEmpty(this.anyErrors()),
    [this.className]: _.isString(this.className)
  });
}

function classesFor(attr, classes = "") {
  return cx({
    [classes]: _.isString(classes),
    "has-error": !_.isEmpty(this.anyErrors())
  });
}

function onChangeEvent(attribute) {
  if (_.isFunction(this.onChange)) {
    return _.bind(this.onChange, this, attribute);
  }
}

function onBlurEvent(attribute) {
  let _this = this;
  if (_.isFunction(this.onBlur)) {
    return _.bind(this.onBlur, this, attribute);
  } else {
    return function({errors}) {
      let updatedErrors = {
        [_this.streetNameAttr]: _this.internalErrors[_this.streetNameAttr],
        [_this.cityNameAttr]: _this.internalErrors[_this.cityNameAttr],
        [_this.stateNameAttr]: _this.internalErrors[_this.stateNameAttr],
        [_this.zipNameAttr]: _this.internalErrors[_this.zipNameAttr]
      };

      updatedErrors[attribute] = errors;
      _this.internalErrors = updatedErrors
    };
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

  let streetErrors = externalStreetErrors.slice(0).concat(internalStreetErrors.slice(0));
  let cityErrors = externalCityErrors.slice(0).concat(internalCityErrors.slice(0));
  let stateErrors = externalStateErrors.slice(0).concat(internalStateErrors.slice(0));
  let zipErrors = externalZipErrors.slice(0).concat(internalZipErrors.slice(0));

  streetErrors = _.map(streetErrors, (message) => `Street ${message}`);
  cityErrors = _.map(cityErrors, (message) => `City ${message}`);
  stateErrors = _.map(stateErrors, (message) => `State ${message}`);
  zipErrors = _.map(zipErrors, (message) => `Zip Code ${message}`);

  return streetErrors.concat(cityErrors)
                     .concat(stateErrors)
                     .concat(zipErrors);
}

function valueUpdated(attribute, newValue) {
  console.log('Updated event');
  console.log(newValue);

  let existingValue = this.value || {};

  let value = {
    [this.streetNameAttr]: existingValue[this.streetNameAttr],
    [this.cityNameAttr]: existingValue[this.cityNameAttr],
    [this.stateNameAttr]: existingValue[this.stateNameAttr],
    [this.zipNameAttr]: existingValue[this.zipNameAttr]
  };

  value[attribute] = newValue;
  this.$emit('update:value', value);
}

export default {
  name: "ObsAddressUs",
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
    onChange: {
      required: false,
      type: Function
    },
    onBlur: {
      required: false,
      type: Function
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
    }
  }
}
</script>

<style lang="sass" scoped>
  .address-us {
    .address-state {
      width: 55px;
    }
    .address-zipcode {
      width: 74px;
    }
  }
</style>
