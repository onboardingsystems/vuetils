<template>
  <span v-if="required" aria-hidden="true" class="fe-required-marker" title="Required Field">*</span>
</template>

<script>
export default {
  name: 'FeRequiredMarker',
  props: {
    required: {
      required: false,
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>
  .fe-required-marker {
    padding-left: 3px;
  }
</style>
