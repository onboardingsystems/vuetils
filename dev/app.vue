<template>
  <div id="root">
    <h2>Modal</h2>
    <fe-checkbox v-model="showTestModal">Show Modal</fe-checkbox>
    <fe-modal id="testModal" ref="testModal" title="Sample Dialog" v-model="showTestModal" :close-button="true" :escape="false">
      <button slot="confirm" class="btn btn-default btn-success" @click="$refs.testModal.close()">Confirm from parent</button>
      <button slot="cancel" class="btn btn-default btn-danger" data-dismiss="modal">Cancel</button>
      Hello World.
    </fe-modal>

    <h2>Form Builder</h2>
    <fe-checkbox v-model="editable">Fields are editable</fe-checkbox>

    <div class="col-xs-6">
      <fe-form @submit="onSubmit" :editable="editable" >
        <fe-text label="Username" :required="true" v-model="username" placeholder="joe, notjoe, ect." />
        <fe-textarea label="Job History" :required="true" v-model="jobHistory" placeholder="Stuff you did..." rows="6" />

        <fe-selection label="Choose a color" v-model="color" :options="[{value: 'red', name: 'Red'}, { value: 'blue', name: 'Blue'}]" :required="true" />
        <fe-selection label="Choose a color (with placeholder)" v-model="color2" placeholder="Please Select" :options="[{value: 'red', name: 'Red'}, { value: 'blue', name: 'Blue'}]" :required="true" />

        <fe-number label="Current Age" :required="true" v-model="currentAge" placeholder="24" />
        <fe-phone label="Home Number" :required="true" v-model="phone" />
        <fe-email label="Email Address" :required="true" v-model="email" />
        <fe-ssn label="Social Security Number" :required="true" v-model="ssn" />
        <fe-state label="US State Code" :required="true" v-model="state" />
        <fe-zipcode label="Zip Code" :required="true" v-model="zipcode" />
        <fe-currency label="Cost" :required="true" v-model="cost" />
        <fe-dollars label="Rent" :required="true" v-model="rent" />
        <fe-percent label="Sales Tax" :required="true" v-model="salesTax" :parsed.sync="parsedSalesTax" />
        <fe-date label="Start Date" :required="false" v-model="startDate" :parsed.sync="parsedStartDate" />
        <fe-date label="End Date" :required="true" v-model="endDate" :parsed.sync="parsedEndDate" format="month-year" />
        <fe-time label="Open Time" :required="true" v-model="openTime" />
        <fe-ordinal label="Ordinal" :required="true" v-model="ordinal" />

        <fe-name v-model="name" :required="true" />
        <fe-address v-model="address" :required="true"  />
        <fe-checkbox v-model="iAgree" :required="true">I agree</fe-checkbox>

        <fe-radio-group label="Options to Select" v-model="optionValue" :required="true"
                        :options="[{value: '42', name: 'Choose Me'}, {value: '43', name: 'Don\'t Choose Me'}]"
                        />

        <fe-radio-group label="Options to Select (Horizontal)" v-model="optionValue" direction="horizontal"
                        :options="[{value: '42', name: 'Choose Me', disabled: true}, {value: '43', name: 'Don\'t Choose Me'}]"
                        />

        <fe-submit value="Next" className="btn-success" />
      </fe-form>
    </div>

    <div class="col-xs-12">
      <h2>File Selector</h2>

      <h3>Default Icon</h3>
      <fe-file-select title="This will select a file to be uploaded." @fileselect="log" />

      <h3>Custom Content</h3>
      <fe-file-select title="This will select a file to be uploaded." @fileselect="log">
        <span style="color: blue">Click me to Select a file</span>
      </fe-file-select>
    </div>

    <div class="col-xs-12">
      <h2>Buttons</h2>
      <fe-confirm-button @action="action" @confirm="confirm" />
      <fe-hold-button />
      <fe-ellipsis>Getting stuff done</fe-ellipsis>
    </div>
  </div>
</template>

<script>
function data() {
  return {
    showTestModal: false,
    editable: true,
    color: "blue",
    color2: null,
    ordinal: null,
    openTime: null,
    startDate: null,
    parsedStartDate: null,
    endDate: null,
    parsedEndDate: null,
    username: null,
    salesTax: null,
    parsedSalesTax: null,
    cost: null,
    rent: null,
    ssn: null,
    state: null,
    zipcode: null,
    email: null,
    optionValue: null,
    currentAge: null,
    phone: null,
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
    onSubmit,
    action: function() {console.log('Clicked Delete')},
    confirm: function() {console.log('Confirmed')},
    log: function(entry) {console.log(entry)}
  }
}
</script>

<style scoped>
  #root {
    margin: 15px;
  }
</style>
