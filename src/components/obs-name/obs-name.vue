<template>
  <div :class="classes">
    <obs-label :text="label" :required="required" :htmlFor="id" :hint="hint" />
    <obs-compound-layout layout="inline">
      <div class="flex-grow-shrink">
        <obs-text-input :id="id"
          :value="valueFor(firstNameAttr)"
          @update:value="onFirstNameChanged"
          :required="required" :formatter="formatter('stringFormatter')"
          placeholder="First"
          :class="classesFor(firstNameAttr, 'name-first')"
          :on-change="onChangeEvent(firstNameAttr)"
          :on-blur="onBlurEvent(firstNameAttr)"
          :did-mount="register" :will-unmount="unregister"
          :autofocus="autofocus"
          :custom-validator="firstNameCustomValidator" />
      </div>
      <div class="flex-grow-shrink">
        <obs-text-input
          :value="valueFor(lastNameAttr)"
          @update:value="onLastNameChanged"
          :required="required" :formatter="formatter('stringFormatter')"
          placeholder="Last"
          :className="classesFor(lastNameAttr, 'name-last')"
          :on-change="onChangeEvent(lastNameAttr)"
          :on-blur="onBlurEvent(lastNameAttr)"
          :did-mount="register" :will-unmount="unregister"
          :custom-validator="lastNameCustomValidator" />
      </div>
    </obs-compound-layout >
    <obs-error :errors="errorsWithLabelNames()" />
    <obs-error :errors="internalErrors" />
  </div>
</template>

<script>
import Formatters from '../../utils/formatters';
import _ from 'lodash';
import cx from 'classnames';

function data() {
  return {
    inputs: [],
    internalErrors: []
  };
}

function classes() {
  return cx({
    'form-group': true,
    'has-child-error': !_.isEmpty(this.errorsWithLabelNames()),
    [ this.className ]: _.isString(this.className)
  });
}

function classesFor(attr, classes = "") {
  return cx({
    [classes]: _.isString(classes),
    "has-error": !_.isEmpty(this.nameErrors()[attr])
  });
}

  // takes the errors passed in and selects out only errors for this component
function nameErrors() {
  return _.pick(this.errors, [this.firstNameAttr, this.lastNameAttr])
}

function errorsWithLabelNames() {
  return _.reduce(this.nameErrors(), (acc, errors, attr)=> {
    var name
    if (attr === this.props.firstNameAttr)
      name = "First name"
    else
      name = "Last name"
    _.forEach(errors, (error)=> {
      acc.push(`${name} ${error}`)
    })
    return acc
  }, []);
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
      _this.internalErrors = errors;
    };
  }
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
  name: "ObsName",
  data,
  methods:{
    classesFor, nameErrors, errorsWithLabelNames,
    onFirstNameChanged, onLastNameChanged,
    onChangeEvent, onBlurEvent,
    formatter: (type) => Formatters[type],
    valueFor: function(attr) {return _.get((this.value || {}), attr)},
    register: function(input) {return _.concat(this.inputs, input)},
    unregister: function(input) {_.without(this.inputs, input)}
  },
  computed: {
    classes
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
      type: Array,
      default: () => []
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
    didMount: {
      required: false,
      type: Function
    },
    willUnmount: {
      required: false,
      type: Function
    },
    firstNameCustomValidator: {
      required: false,
      type: Function
    },
    lastNameCustomValidator: {
      required: false,
      type: Function
    }
  }
}
</script>

<style>

</style>
