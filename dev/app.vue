<template>
  <div>
    <h2>Label</h2>
    <div>
      <obs-label text="Hello World!" />
    </div>
    <h2>Label with Required</h2>
    <div>
      <obs-label text="Hello World!" :required="true" />
    </div>
    <h2>Label with Hint</h2>
    <div>
      <obs-label text="Hello World!" hint="Joe was here" />
    </div>
    <h2>Label with Nothing to Show</h2>
    <div>
      <obs-label />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Playground'
}
</script>

<style>

</style>
