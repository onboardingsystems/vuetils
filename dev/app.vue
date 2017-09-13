<template>
  <div id="root">
    <h2>Form Builder</h2>
    <fe-checkbox :value.sync="editable">Fields are editable</fe-checkbox>

    <div class="col-xs-6">
      <fe-form @submit="onSubmit" :editable="editable" >
        <fe-text label="Username" :required="true" :value.sync="username" placeholder="joe, notjoe, ect." />
        <fe-textarea label="Job History" :required="true" :value.sync="jobHistory" placeholder="Stuff you did..." rows="6" />

        <fe-number label="Current Age" :required="true" :value.sync="currentAge" placeholder="24" />
        <fe-phone label="Home Number" :required="true" :value.sync="phone" />
        <fe-email label="Email Address" :required="true" :value.sync="email" />
        <fe-ssn label="Social Security Number" :required="true" :value.sync="ssn" />
        <fe-state label="US State Code" :required="true" :value.sync="state" />
        <fe-zipcode label="Zip Code" :required="true" :value.sync="zipcode" />
        <fe-currency label="Cost" :required="true" :value.sync="cost" />
        <fe-dollars label="Rent" :required="true" :value.sync="rent" />
        <fe-percent label="Sales Tax" :required="true" :value.sync="salesTax" :parsed.sync="parsedSalesTax" />
        <fe-date label="Start Date" :required="true" :value.sync="startDate" :parsed.sync="parsedStartDate" />
        <fe-date label="End Date" :required="true" :value.sync="endDate" :parsed.sync="parsedEndDate" format="month-year" />
        <fe-time label="Open Time" :required="true" :value.sync="openTime" />
        <fe-ordinal label="Ordinal" :required="true" :value.sync="ordinal" />

        <fe-name :value.sync="name" :required="true" />
        <fe-address :value.sync="address" :required="true"  />
        <fe-checkbox :value.sync="iAgree" :required="true" >I agree</fe-checkbox>

        <fe-radio-group label="Options to Select" :value.sync="optionValue" :required="true"
                        :options="[{value: '42', name: 'Choose Me'}, {value: '43', name: 'Don\'t Choose Me.'}]"
                        />
        <fe-submit value="Next" className="btn-success" />
      </fe-form>
    </div>
  </div>
</template>

<script>
function data() {
  return {
    editable: true,
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
