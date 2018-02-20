<template>
  <input v-if="isEditable" type="submit" class="fe-submit" :value="label" />
</template>

<script>
import _ from 'lodash';

function data() {
  return {
    formEditable: null
  }
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
    isEditable
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
    }
  }
}
</script>

<style>

</style>
