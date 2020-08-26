<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">{{ productDetail.name }}</p>
      <button type="button" class="delete" @click="$emit('close')" />
    </header>
    <section class="modal-card-body">
      <div class="card">
        <div class="card-image">
          <b-carousel :indicator-inside="false">
            <b-carousel-item v-for="(item, i) in productDetail.images" :key="i">
              <span class="image">
                <img :src="item.src" />
              </span>
            </b-carousel-item>
            <template slot="indicators" slot-scope="props">
              <span class="al image">
                <img :src="getImgThumbs(props)" />
              </span>
            </template>
          </b-carousel>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="subtitle is-6">
                <b-taglist attached class="tag-time-price">
                  <b-tag type="is-dark">
                    <b-icon icon="clock-time-twelve" size="is-small"></b-icon>
                  </b-tag>
                  <b-tag type="is-info">
                    <time style="font-size: 10px;">
                      {{
                      productDetail.date_created | moment("MMMM Do YYYY")
                      }}
                    </time>
                  </b-tag>
                </b-taglist>

                <b-taglist attached class="tag-time-price">
                  <b-tag type="is-dark">
                    <b-icon icon="cash-multiple" size="is-small"></b-icon>
                  </b-tag>
                  <b-tag type="is-danger" v-html="productDetail.price_html"></b-tag>
                </b-taglist>
              </p>
            </div>
          </div>

          <div class="content" v-html="productDetail.description"></div>
        </div>
      </div>
    </section>
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
  getImgThumbs = value => {
    return this.productDetail.images[value.i].src;
  };
}
</script>
<style scoped>
.field.is-grouped.is-grouped-multiline > .control:last-child,
.field.is-grouped.is-grouped-multiline > .control:not(:last-child) {
  margin-bottom: 0.3rem;
}
.field.is-grouped > .control:not(:last-child) {
  margin-right: 0.3rem;
}
.tag-time-price {
  margin-bottom: 0px;
  padding-bottom: 0px;
  height: 26px;
}
.is-active .al img {
  filter: grayscale(0%);
}
.al img {
  filter: grayscale(100%);
}
</style>>
