<template>
  <input v-if="isEditable" :class="classes" type="submit" class="fe-submit" :value="label" />
</template>

<script>
import _ from 'lodash';
import cx from 'classnames';

function data() {
  return {
    formEditable: null
  }
}

function classes() {
  return cx({
    "btn": true,
    [ this.className ]: _.isString(this.className)
  });
}

function isEditable() {
  if (_.isNil(this.formEditable)) {
    return this.editable;
  }

  return this.formEditable;
}

export default {
  name: 'FeSubmit',
  data,
  computed: {
    isEditable, classes
  },
  props: {
    editable: {
      required: false,
      type: Boolean,
      default: true
    },
    label: {
      required: false,
      type: String,
      default: 'Save'
    },
    className: {
      required: false,
      type: String,
      default: 'btn-primary'
    }
  }
}
</script>

<style>

</style>
