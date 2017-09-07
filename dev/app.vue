<template>
  <div id="root">
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
    <h2>Single Error</h2>
    <div>
      <obs-error :errors="['Error 1']" />
    </div>
    <h2>Mutliple Errors</h2>
    <div>
      <obs-error :errors="['Error 1', 'Error 2']" />
    </div>
    <h2>No Errors</h2>
    <div>
      <obs-error :errors="null" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Playground'
}
</script>

<style scoped>
  #root {
    margin-left: 15px;
  }
</style>
