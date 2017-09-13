<template>
  <div class={classes} onMouseDown={this.mouseDown} onMouseUp={this.mouseUp}>
    <div class="message">{this.renderLabel()}</div>
      <div v-if="this.mouseDown" class="progress">
        <div class="progress-bar progress-bar-striped" role="progressbar" :style="{width: `${percent}%`, background: transitionColor}"></div>
      </div>
    <i class={doneIcon} style={{color: this.props.doneColor}}/>
  </div>
</template>

<script>
import _ from 'lodash';

function data() {
  return {
    clicked: false,
    percent: 0,
    mouseDown: null,
    timeout: null,
    increment: 100
  };
}

function classes() {
  return {
    "btn": true,
    [this.className]: _.isString(this.className)
  };
}

export default {
  name: 'FeHoldButton',
  props: {
    label: {
      required: false,
      type: String,
      default: 'Delete'
    },
    className: {
      required: false,
      type: String,
      default: 'btn-default'
    },
    doneIcon: {
      required: false,
      type: String,
      default: 'check-circle-o'
    },
    wait: {
      required: false,
      type: Number,
      default: 750
    },
    transitionColor: {
      required: false,
      type: String,
      default: '#337ab7'
    },
    transitionColor: {
      required: false,
      type: String,
      default: '#27ae60'
    },
  }
}
</script>

<style>

</style>
