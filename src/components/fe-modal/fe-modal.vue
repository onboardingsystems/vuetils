<template>
  <fe-modal-render v-if="show" ref="modal" :id="id" :size="size" :class-name="className"
                   :title="title" :close-button="closeButton" :escape="escape" @close="handleClose">
    <slot>Please provide modal content...</slot>
    <div slot="footer" style="text-align: left">
      <div style="display: inline-block; float: left">
        <slot name="cancel"></slot>
      </div>
      <div style="display: inline-block; float: right">
        <slot name="confirm">
          <button type="button" class="btn btn-default btn-success" data-dismiss="modal">Add a Button To Do Something</button>
        </slot>
      </div>
    </div>
  </fe-modal-render>
</template>

<script>
import FeModalRender from './fe-render';

function handleClose() {
  this.$emit('close');
  this.$emit('update:show', false);
}

export default {
  name: "FeModal",
  methods: {
    handleClose,
    close() {this.$refs.modal.close()}
  },
  components: {
    FeModalRender
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
    show: {
      required: false,
      type: Boolean,
      default: true
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

<style>

</style>
