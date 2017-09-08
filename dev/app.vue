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
      <obs-text-input label="Username" placeholder="example: joe, notjoe" :autofocus="true" />
    </div>
    <h2>Text Input Required</h2>
    <div>
      <obs-text-input label="Username" placeholder="example: joe, notjoe" :required="true" />
    </div>
    <h2>Text Input Default</h2>
    <div>
      <obs-text-input label="Username" placeholder="example: joe, notjoe" default-value="Default Value" :value.sync="textRequired"/>
    </div>

    <h2>Text Area</h2>
    <div>
      <obs-text-area label="Content" placeholder="example: joe, notjoe" />
    </div>
    <h2>Text Area Required</h2>
    <div>
      <obs-text-area label="Content" placeholder="example: joe, notjoe" :required="true"/>
    </div>
    <h2>Text Area Default</h2>
    <div>
      <obs-text-area label="Content" placeholder="example: joe, notjoe" default-value="Default Value" :value.sync="textAreaRequired"/>
    </div>



    <h2>Form Builder</h2>
    <div>
      <obs-form-builder :onsubmit="onSubmit" >
        <div class="col-xs-6">
          <obs-text-input label="Age" :value.sync="age" />
        </div>
        <div class="col-xs-6">
          <obs-text-input label="Color" :value.sync="color" />
        </div>

        <obs-submit />
      </obs-form-builder>
    </div>
  </div>
</template>

<script>
function data() {
  return {
    age: 0,
    color: 'red',
    textRequired: null,
    textAreaRequired: null
  };
}

function onSubmit(e) {
  console.log('On change:');
  console.log(this.age);
  console.log(this.color);
}

export default {
  name: 'Playground',
  data,
  methods: {
    onSubmit
  }
}
</script>

<style scoped>
  #root {
    margin-left: 15px;
  }
</style>
