<template>
  <div :class="classes">
    <div class="children">
      <slot />
    </div>
  </div>
</template>

<script>

function classes() {
  return {
    'compound-field': true,
    'form-group': true,
    'layout-full':   this.layout === 'full',
    'layout-inline': this.layout === 'inline',
    [ this.className ]: _.isString(this.className)
  };
}

export default {
  name: 'FeCompoundLayout',
  computed: {
    classes
  },
  props: {
    layout: {
      // layouts: 'inline', 'full'
      required: false,
      type: String,
      default: 'inline'
    },
    className: {
      required: false,
      type: String
    }
  }
}
</script>

<style lang="sass">
  .flex-static {
    -webkit-flex: 0 0 auto;
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
    -webkit-align-self: flex-end;
    -ms-align-self: flex-end;
    align-self: flex-end;
  }

  .flex-grow-shrink {
    -webkit-flex: 1 1 auto;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    -webkit-align-self: flex-end;
    -ms-align-self: flex-end;
    align-self: flex-end;
  }

  .compound-field {
    &.form-group { margin-bottom: 0; }
    .form-group { margin-bottom: 0; }
    &:not(.layout-inline) {
      // in a vertical setup each child represents a row.  So put 5px of spacing
      // between all the rows except for the last row
      & > .children > * {
        margin-bottom: 8px;
      }
      & > .children > *:last-child {
        margin-bottom: 0px;
      }
    }

    &.layout-inline {
      // use a flex layout to achieve the horizontal layout
      & > .children {
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: row;
            -ms-flex-direction: row;
                flex-direction: row;
        -webkit-flex-wrap: nowrap;
            -ms-flex-wrap: nowrap;
                flex-wrap: nowrap;
      }

      // in a horizontal layout, each child is a cell in a row.  So we need to
      // space them left to right much like how we put space between rows in the
      // vertical layout.
      & > .children > * {
        margin-left: 8px;
      }
      & > .children > *:first-child {
        margin-left: 0px;
      }
    }
  }
</style>
