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
    <h2>Text Input</h2>
    <div>
      <obs-text-input label="Username:" placeholder="example: joe, notjoe" :autofocus="true" />
    </div>

    <h2>Form Builder</h2>
    <div>
      <obs-form-builder>
        <div>
          Normal Content
          <obs-text-input label="Username:" placeholder="example: joe, notjoe" :autofocus="true" />
        </div>
        <div>
          <obs-text-input label="Username:" placeholder="example: joe, notjoe" :autofocus="true" />
        </div>
      </obs-form-builder>
    </div>
  </div>
</template>

<script>
function onChange(e) {
  console.log('On change:');
  console.log(e);
}

function onBlur(e) {
  console.log('On Blur:');
  console.log(e);
}

export default {
  name: 'Playground',
  methods: {
    onChange, onBlur
  }
}
</script>

<style scoped>
  #root {
    margin-left: 15px;
  }
</style>
