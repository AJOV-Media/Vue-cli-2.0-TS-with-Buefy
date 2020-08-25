<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">Product</p>
      <button type="button" class="delete" @click="$emit('close')" />
    </header>
    <section class="modal-card-body"></section>
    <footer class="modal-card-foot">
      <button class="button" type="button" @click="$emit('close')">Close</button>
      <button class="button is-primary">Add to Cart?</button>
    </footer>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ProductFields from "@/types/ProductFields.interface";

@Component
export default class ProductDetails extends Vue {
  @Prop({ type: Object as () => ProductFields })
  public productDetail!: ProductFields;
}
</script>
<style scoped>
</style>>
