<template>
  <div id="root">
    <!-- <h2>Label</h2>
    <div>
      <fe-label text="Hello World!" />
    </div>
    <h2>Label with Required</h2>
    <div>
      <fe-label text="Hello World!" :required="true" />
    </div>
    <h2>Label with Hint</h2>
    <div>
      <fe-label text="Hello World!" hint="Joe was here" />
    </div>
    <h2>Label with Nothing to Show</h2>
    <div>
      <fe-label />
    </div>

    <h2>Single Error</h2>
    <div>
      <fe-error :errors="['Error 1']" />
    </div>
    <h2>Mutliple Errors</h2>
    <div>
      <fe-error :errors="['Error 1', 'Error 2']" />
    </div>
    <h2>No Errors</h2>
    <div>
      <fe-error :errors="null" />
    </div>

    <h2>Text Input</h2>
    <div>
      <fe-text-input label="Username" placeholder="example: joe, notjoe" :autofocus="true" :value.sync="text1" />
    </div>
    <h2>Text Input Required</h2>
    <div>
      <fe-text-input label="Username" placeholder="example: joe, notjoe" :required="true" :value.sync="text2" />
    </div>
    <h2>Text Input Default</h2>
    <div>
      <fe-text-input label="Username" placeholder="example: joe, notjoe" default-value="Default Value" :value.sync="textRequired" />
    </div>

    <h2>Text Area</h2>
    <div>
      <fe-text-area label="Content" placeholder="example: joe, notjoe" :value.sync="textArea1" />
    </div>
    <h2>Text Area Required</h2>
    <div>
      <fe-text-area label="Content" placeholder="example: joe, notjoe" :required="true" :value.sync="textArea2" />
    </div>
    <h2>Text Area Default</h2>
    <div>
      <fe-text-area label="Content" placeholder="example: joe, notjoe" default-value="Default Value" :value.sync="textAreaRequired" />
    </div> -->

    <h2>US Address Field</h2>
    <div>
      <fe-address-us :value.sync="address" :required="true"  />
    </div>

    <!-- <h2>Form Builder</h2>
    <div>
      <fe-form-builder @submit="onSubmit" >
        <fe-name :value.sync="name" :required="true" />

        <fe-submit />
      </fe-form-builder>
    </div> -->
  </div>
</template>

<script>
function data() {
  return {
    text1: '',
    text2: '',
    textArea1: '',
    textArea2: '',
    age: 0,
    color: 'red',
    textRequired: null,
    textAreaRequired: null,
    name: null,
    address: null,
    formName: null
  };
}

function onSubmit() {
  console.log('On change:');
  console.log(this.name);
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
