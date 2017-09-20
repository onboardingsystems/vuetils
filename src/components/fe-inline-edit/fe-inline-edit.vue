<template>
  <div v-if="editMode" class="inline-edit">
    <component :is="`fe-${editor}`"
            :errors="errors"
            :value="value"          :defaultValue="defaultValue"
            :id="id"                :className="className"
            :autofocus="autofocus"  :placeholder="placeholder"
            :label="label"          :hint="hint"
            :required="required"
            :customValidator="customValidator"
            @update:value="updated"
            @update:parsed="parsed"
            :editable="editable"
            />
    <button class="btn btn-sm btn-success" @click.prevent.stop="saveValue">
      <i class="fa fa-check"/>
    </button>
    <button class="btn btn-sm btn-default" @click.prevent.stop="enterShowMode">
      <i class="fa fa-times text-danger"/>
    </button>
  </div>
  <div v-else class="inline-edit">
    <span v-if="displayValue" class="showing-text" @click="nameClicked">
      <span v-if="displayLink">
        <router-link v-if="target === '_self'" :to="displayLink">{{displayValue}}</router-link>
        <a v-else :href="displayLink" target="_blank">{{displayValue}}</a>
      </span>
      <span v-else>{{displayValue}}</span>
    </span>
    <a v-else-if="clickNameToEdit" class="showing-text" @click="nameClicked">{{value}}</a>
    <span v-else>{{value}}</span>

    <a class="edit" @click.prevent="enterEditMode"><i class="fa fa-pencil"/></a>
  </span>
  </div>
</template>

<script>

function data() {
  return {
    editMode: false
  };
}

export default {
  name: "FeInlineEdit",
  data,
  methods: {
    updated: function(value) {
      this.enterShowMode();
      this.$emit('update:value', value);
    },
    parsed: function(value) { this.$emit('update:parsed', value) },
    nameClicked: function() {if (this.clickNameToEdit) this.enterEditMode()},
    enterEditMode: function() {
      this.editMode = true;
    },
    enterShowMode: function() {this.editMode = false}
  },
  props: {
    editor: {
      required: false,
      type: String,
      default: 'text'
    },
    value: {
      required: false,
      type: String
    },
    defaultValue: {
      required: false,
      type: String,
      default: ''
    },
    errors: {
      required: false,
      type: Array,
      default: function() {return []}
    },
    id: {
      required: false,
      type: String
    },
    className: {
      required: false,
      type: String
    },
    autofocus: {
      required: false,
      type: Boolean,
      default: false
    },
    placeholder: {
      required: false,
      type: String,
      default: ''
    },
    label: {
      required: false,
      type: String,
      default: ''
    },
    hint: {
      required: false,
      type: String,
      default: ''
    },
    required: {
      required: false,
      type: Boolean,
      default: false
    },
    customValidator: {
      required: false,
      type: Function
    },
    editable: {
      required: false,
      type: Boolean,
      default: true
    },
    displayValue: {
      required: false,
      type: String
    },
    displayLink: {
      required: false,
      type: String
    },
    clickNameToEdit: {
      required: false,
      type: Boolean,
      default: true
    },
    target: {
      required: false,
      type: String,
      default: '_self'
    }
  }
}
</script>

<style lang="sass" scoped>
  .inline-edit {
    input[type=text] {
      background-color: transparent;
      font-size: inherit;
      padding: 0 5px;
      height: auto;
      color: inherit;
      font-family: inherit;
      line-height: normal;
      min-height: 30px;
    }

    .btn + .btn {
      margin-left: 5px;
    }
    .btn {
      width: 34px;
    }

    a.edit {
      font-size: 0.8em;
      vertical-align: text-bottom;
    }

    a.showing-text {
      margin-right: 0.3em;
    }
    a.showing-text.click-to-edit {
      color: inherit;
      text-decoration: none;
      &:hover, &:focus {
        border-bottom: dashed 1px;
      }
    }

  }
</style>
