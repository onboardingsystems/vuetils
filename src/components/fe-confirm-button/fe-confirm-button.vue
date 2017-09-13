<template>
  <div :class="classes" @mouseover="onMouseOver" @mouseout="onMouseOut" @click.stop="onClick">
    <slot>
      {{content}}
    </slot>
  </div>
</template>

<script>
import cx from 'classnames';
import _ from 'lodash';

function data() {
  return {
    confirm: this.mode === "confirm",
    timeout: null
  };
}

function classes() {
  if (this.$slot !== undefined) {
    return cx({});
  } else {
    return cx({
      'btn': true,
      'btn-default': !this.confirm,
      'btn-danger': this.confirm
    });
  }
}

function content() {
  if (this.confirm) {
    return this.message;
  } else {
    return this.label;
  }
}

function beforeDestroy() {
  this.clearTimeout();
}

function clearTimeout() {
  if(this.timeout != null) {
    this.timeout = null;
  }
}

function onTimeout() {
  this.$emit('timeout');
  this.endConfirm();
}

function endConfirm() {
  this.clearTimeout();
  this.confirm = false;
}

function onMouseOver() {
  if(this.confirm) {
    this.clearTimeout();
  }
}

function onMouseOut() {
  if(this.confirm) {
    let timeout = setTimeout(this.onTimeout, this.wait);
    this.timeout = timeout;
  }
}

function onClick() {
  if(this.confirm) {
    this.endConfirm();
    this.$emit('action');
  } else {
    this.confirm = true;
    this.$emit('confirm');
  }
}

export default {
  name: 'FeConfirmButton',
  data,
  beforeDestroy,
  methods: {
    onMouseOver, onMouseOut, onClick, clearTimeout,
    onTimeout, endConfirm
  },
  computed: {
    classes, content
  },
  props: {
    label: {
      required: false,
      type: String,
      default: 'Delete'
    },
    message: {
      required: false,
      type: String,
      default: 'Are you sure?'
    },
    mode: {
      required: false,
      type: String,
      default: null
    },
    wait: {
      required: false,
      type: Number,
      default: 3000
    }
  }
}
</script>

<style>

</style>
