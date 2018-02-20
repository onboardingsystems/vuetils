<template>
  <span v-if="hint" class="fe-hint">{{hint}}</span>
</template>

<script>
export default {
  name: 'FeHint',
  props: {
    hint: {
      required: false,
      type: String,
      default: ''
    }
  }
}
</script>

<style>
  .fe-hint {
    margin: 0;
    font-weight: 300;
    color: #777;
    line-height: normal;
    font-size: 14px;
    margin-top: -2px;
    margin-bottom: 4px;
  }
</style>
