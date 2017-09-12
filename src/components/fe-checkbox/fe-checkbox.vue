<template>
  <div :class="className">
    <div :class="classes">
      <label>
        <input type="checkbox" ref="checkbox" :id="initialId" :checked="initialValue" @change="handleChange" />
        <slot>
          {{label}}
        </slot>
        <fe-required-marker :required="required" />
      </label>
      <fe-error :errors="errors" />
    </div>
    <fe-hint :hint="hint" />
  </div>
</template>

<script>
import _ from 'lodash';
import cx from 'classnames';

function classes() {
  return cx({
    "checkbox": true,
    "has-error":  !_.isEmpty(this.errors)
  });
}

// having a value of null can be bad for our controlled inputs, even if for a
// little while.  So since our defaultValue doesn't kick in right away we
// still need something here to help prevent bad values from being rendered.
function initialValue() {
  if (_.isBoolean(this.value)) {
    return this.value;
  } else {
    return this.defaultValue;
  }
}

function handleChange(e) {
  if (_.isFunction(this.onChange)) {
    this.onChange(e.target.checked);
  } else {
    this.$emit('update:value', e.target.checked);
  }
}

function mounted() {
  if (_.isFunction(this.onChange)) {
    this.onChange(this.$refs.checkbox.checked);
  } else {
    this.$emit('update:value', this.$refs.checkbox.checked);
  }
}

function initialId() {
  if (_.isEmpty(this.id)) {
    return _.uniqueId('checkbox_');
  }

  return this.id;
}

export default {
  name: "FeCheckbox",
  mounted,
  methods: {
    handleChange
  },
  computed: {
    classes, initialValue, initialId
  },
  props: {
    value: {
      required: false,
      type: Boolean
    },
    defaultValue: {
      required: false,
      type: Boolean,
      default: false
    },
    errors: {
      required: false,
      type: Array,
      default: function() {return []}
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
    onChange: {
      required: false,
      type: Function
    }
  }
}
</script>

<style>

</style>