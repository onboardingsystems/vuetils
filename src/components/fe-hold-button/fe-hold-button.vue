<template>
  <div :class="classes" @mousedown="onMouseDown" @mouseup="onMouseUp">
    <div class="message">
      <span v-if="clicked">Hold to</span> {{label}}
    </div>
    <div v-if="mouseDown" class="progress">
      <div class="progress-bar progress-bar-striped" role="progressbar" :style="{width: `${percent}%`, background: transitionColor}"></div>
    </div>
    <i :class="doneIconClasses" :style="{color: doneColor}"/>
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

function beforeDestroy() {
  if (this.timeout !== null) {
    window.clearTimeout(this.timeout);
  }
}

function classes() {
  return {
    "btn": true,
    [this.className]: _.isString(this.className),
    "hold-button": true,
    "disabled": this.percent === 100,
    "done": this.percent === 100,
  };
}

function doneIconClasses() {
  return {
    "fa": true,
    [`fa-${this.doneIcon}`]: _.isNil(this.doneIcon),
    "done-icon": true
  };
}

function onMouseDown() {
  if (this.percent < 100) {
    let timeout = setTimeout(this.onTimeout, this.increment);
    this.startAction();
    this.clicked = true;
    this.percent = 0;
    this.timeout = timeout;
    this.mouseDown = new Date();
  }
}

function onMouseUp() {
  window.clearTimeout(this.timeout);

  if (this.percent < 100) {
    this.stopAction();
    this.clicked = false;
    this.percent = 0;
    this.timeout = null;
    this.mouseDown = null;
  }
}

function onTimeout() {
  if (this.mouseDown != null) {
    let percent = this.incrementPercent();
    let timeout = null;

    if (percent >= 100) {
      percent = 100;
      setTimeout(this.fireAction, 100);
    } else {
      timeout = setTimeout(this.onTimeout, this.increment);
    }

    this.percent = percent;
    this.timeout = timeout;
  }
}

function startAction() {
  this.$emit('start');
}

function stopAction() {
  this.$emit('stop');
}

function fireAction() {
  this.$emit('action');
}

function incrementPercent() {
  return Math.floor(((this.increment / this.wait) * 100) + this.percent);
}

export default {
  name: 'FeHoldButton',
  data,
  beforeDestroy,
  methods: {
    onMouseDown, onMouseUp, onTimeout, startAction,
    stopAction, fireAction, incrementPercent
  },
  computed: {
    classes, doneIconClasses
  },
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
    doneColor: {
      required: false,
      type: String,
      default: '#27ae60'
    },
  }
}
</script>

<style lang="sass">
  $hold-button-height: 6px;

  .hold-button {
    position: relative;

    .message, .progress {
      -webkit-transition: opacity 0.5s ease-in-out;
      -moz-transition: opacity 0.5s ease-in-out;
      -o-transition: opacity 0.5s ease-in-out;
      transition: opacity 0.5s ease-in-out;
    }

    .progress {
      position: absolute;
      top: 0px;
      left: 0px;
      margin-bottom: -1 * ($hold-button-height + 1px);
      width: 100%;
      height: 100%;
      background: transparent;
      -webkit-box-shadow: none;
      box-shadow: none;

      .progress-bar {
        // Change transition time so it matches refresh timeout in hold button component
        transition: width .1s ease !important;
      }
    }

    .done-icon {
      opacity: 0;
      font-size: 24px;
      color: #2ecc71;
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      line-height: 30px;
      -webkit-transition: opacity 1s ease-in-out;
      -moz-transition: opacity 1s ease-in-out;
      -o-transition: opacity 1s ease-in-out;
      transition: opacity 1s ease-in-out;
    }

    &.done {
      .progress, .message {
        opacity: 0;
      }

      .done-icon {
        opacity: 100;
      }
    }
  }
</style>
