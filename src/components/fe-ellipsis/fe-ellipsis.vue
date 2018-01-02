<template>
  <span class="loading-ellipsis">
    <slot>
      loading
    </slot>
    <span class="dot-holder">
      <span class="invisi-dots">...</span>
      <span class="dots">{{dots}}</span>
    </span>
  </span>
</template>

<script>

function data() {
  return {
    dotInterval: null,
    dotCount: 0,
    dots: ''
  };
}

function mounted() {
  this.dotInterval = setInterval(this.updateDots, 500);
}

function beforeDestroy() {
  clearInterval(this.dotInterval);
}

function updateDots() {
  let count = this.dotCount + 1;

  if (count >= 4) count = 0;

  let dots = ".".repeat(count);
  this.dotCount = count;
  this.dots = dots;
}

export default {
  name: 'FeEllipsis',
  mounted,
  beforeDestroy,
  data,
  methods: {
    updateDots
  }
}
</script>

<style lang="sass">
  .loading-ellipsis {
    opacity: 0.75;
    font-style: italic;

    .dot-holder {
      position: relative;

      .invisi-dots {
        opacity: 0.0;
      }

      .dots {
        position: absolute;
        top: 0;
        left: 0;
      }
    }
  }
</style>
