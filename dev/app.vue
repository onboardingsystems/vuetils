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

    <!-- <h2>Text Input Required</h2>
    <div>
      <fe-text label="Username" placeholder="example: joe, notjoe" :required="true" :value.sync="text2" />
    </div> -->

    <h2>Form Builder</h2>
    <div class="col-xs-6">
      <fe-form @submit="onSubmit" >
        <fe-text label="Username" :required="true" :value.sync="username" placeholder="joe, notjoe, ect." />
        <fe-textarea label="Job History" :required="true" :value.sync="jobHistory" placeholder="Stuff you did..." rows="6" />

        <fe-number label="Current Age" :required="true" :value.sync="currentAge" placeholder="24" />
        <fe-phone label="Home Number" :required="true" :value.sync="phone" />
        <fe-email label="Email Address" :required="true" :value.sync="email" />
        <fe-ssn label="Social Security Number" :required="true" :value.sync="ssn" />
        <fe-state label="US State Code" :required="true" :value.sync="state" />

        <fe-name :value.sync="name" :required="true" />
        <fe-address-us :value.sync="address" :required="true"  />
        <fe-checkbox :value.sync="iAgree" :required="true">I agree</fe-checkbox>

        <fe-radio-group label="Options to Select" :value.sync="optionValue" :required="true" :options="[{value: '42', name: 'Choose Me'}, {value: '43', name: 'Don\'t Choose Me.'}]" />
        <fe-submit />
      </fe-form>
    </div>
  </div>
</template>

<script>
function data() {
  return {
    username: null,
    ssn: null,
    state: null,
    email: null,
    optionValue: null,
    currentAge: null,
    phone: null,
    color: 'red',
    jobHistory: null,
    name: null,
    address: null,
    iAgree: false,
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
