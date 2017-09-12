<template>
  <input v-if="editable" type="submit" class="" value="Save" />
</template>

<script>
export default {
  name: 'FeSubmit',
  props: {
    editable: {
      required: false,
      type: Boolean,
      default: true
    }
  },
  computed: {
  }
}
</script>

<style scoped>
  .error {
    color: #c0392b;
  }
</style>
