<template>
  <input v-if="isEditable" type="submit" class="" value="Save" />
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
    }
  }
}
</script>

<style scoped>
  .error {
    color: #c0392b;
  }
</style>
