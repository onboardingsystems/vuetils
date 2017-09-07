<template>
  <span v-if="hint" class="help-block obs-hint">{{hint}}</span>
</template>

<script>
export default {
  name: 'ObsHint',
  props: {
    hint: {
      required: false,
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
  .help-block {
    margin: 0;
    font-weight: 300;
    color: #777;
    line-height: normal;
    font-size: 14px;
    margin-top: -2px;
    margin-bottom: 4px;
  }
</style>
