<template>
  <b-card
    no-body
    img-left
    :class="{
      card: true,
      'mb-3': true,
      'no-borded': !borded,
      clickable: clickable,
    }"
    :imgSrc="imgSrc"
    :img-width="width"
    img-alt="Card image"
    @click="triggerCard"
  >
    <b-card-body>
      <slot name="body" />
    </b-card-body>
  </b-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Card extends Vue {
  @Prop({ required: true }) private width!: number;
  @Prop({ required: true }) private imgSrc!: string;
  @Prop({
    default: false,
  })
  private borded!: boolean;

  @Prop({
    default: false,
  })
  private clickable!: boolean;

  public triggerCard() {
    if (this.clickable) {
      this.$emit("onClick");
    }
  }
}
</script>
<style lang="scss" scoped>
.card {
  &.clickable:hover {
    cursor: pointer;
    background-color: var(--bs-gray-100);
    border: 1px solid var(--bs-gray-300);
  }

  &.no-borded {
    border: none;
  }

  .card-body {
    text-align: left;
  }
}
</style>
