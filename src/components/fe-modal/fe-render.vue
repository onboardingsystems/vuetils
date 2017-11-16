<template>
  <div :id="id" :class="classes" role="dialog">
    <div :class="{'modal-dialog': size === 'dialog', 'modal-sm': size === 'small',
                  'modal-sm': size === 'medium', 'modal-lg': size === 'large'}">

      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button v-if="closeButton" type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">{{title}}</h4>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <slot name="footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </slot>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import cx from 'classnames';

function classes() {
  return cx({
    "modal": true,
    "fade":  true,
    [ this.className ]: _.isString(this.className)
  });
}

function mounted() {
  let options = {show: true};

  if (!this.escape) {
    options['backdrop'] = 'static';
    options['keyboard'] = false;
  }

  $('#' + this.id).on('hidden.bs.modal', () => {
    this.$emit('close');
  });
  $('#' + this.id).modal(options);
}

function beforeDestroy() {
  $('div.modal-backdrop').remove();
}

export default {
  name: "FeModalRender",
  mounted,
  beforeDestroy,
  methods: {
    close() {$('#' + this.id).modal('toggle')}
  },
  computed: {
    classes
  },
  props: {
    id: {
      required: true,
      type: String
    },
    title: {
      required: true,
      type: String
    },
    size: {
      // options: 'dialog', 'small', 'medium', 'large'
      required: false,
      type: String,
      default: 'dialog'
    },
    className: {
      required: false,
      type: String
    },
    closeButton: {
      required: false,
      type: Boolean,
      default: false
    },
    escape: {
      required: false,
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>
  .close {
    color: red;
  }
</style>
