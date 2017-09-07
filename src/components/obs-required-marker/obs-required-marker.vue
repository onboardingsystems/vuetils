<template>
  <span v-if="required" aria-hidden="true" class="required-marker obs-required-marker" title="Required Field">*</span>
</template>

<script>
export default {
  name: 'ObsRequiredMarker',
  props: {
    required: {
      required: false,
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
  .required-marker {
    padding-left: 3px;
  }
</style>
