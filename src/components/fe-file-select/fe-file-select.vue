<template>
  <label :class="classes" :title="title">
    <input ref="file" type="file" @change.prevent="handleFileSelected" />
    <slot>
      <i class="fa fa-cloud-upload fa-lg dark-gray"></i>
    </slot>
  </label>
</template>

<script>
import cx from 'classnames';

function classes() {
  return cx({
    "fe-file-select": true,
    [ this.className ]: _.isString(this.className)
  });
}

function handleFileSelected() {
  if (this.$refs.file.files.length > 0) {
    this.$emit('fileselect', this.$refs.file.files[0]);
    this.$refs.file.value = '';
  }
}

export default {
  name: 'FeFileSelect',
  methods: {
    handleFileSelected
  },
  computed: {
    classes
  },
  props: {
    title: {
      required: false,
      type: String
    }
  }
}
</script>

<style lang="sass">
  .fe-file-select {
    margin-bottom: 0;

    &:hover {
      cursor: pointer;
    }

    input[type=file] {
      position: absolute;
      left: -9999px;
    }
  }
</style>