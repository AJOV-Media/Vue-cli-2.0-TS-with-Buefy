<template>
  <article class="media">
    <figure class="media-left">
      <p class="image is-64x64">
        <img src="https://bulma.io/images/placeholders/128x128.png" />
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <p>
          <strong>{{ product.name }}</strong>
          <b-field grouped group-multiline class="category-group">
            <template v-for="(item, index) in product.categories">
              <div class="control" :key="index">
                <b-taglist attached>
                  <b-tag type="is-dark">
                    <b-icon icon="view-dashboard" size="is-small"></b-icon>
                  </b-tag>
                  <b-tag type="is-info">{{ item.name }}</b-tag>
                </b-taglist>
              </div>
            </template>
          </b-field>
          <span class="product-description" v-html="product.short_description"></span>
        </p>
      </div>
      <nav class="level is-mobile">
        <div class="level-left">
          <b-taglist attached class="tag-time-price">
            <b-tag type="is-dark">
              <b-icon icon="cash-multiple" size="is-small"></b-icon>
            </b-tag>
            <b-tag type="is-danger" v-html="product.price_html"></b-tag>
          </b-taglist>
        </div>
      </nav>
    </div>
    <div class="media-right">
      <b-field label="Qty">
        <b-input type="number" class="howMany" value="1" v-model="howMany"></b-input>
      </b-field>
    </div>
  </article>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ProductListing from "@/types/ProductListing.interface";

@Component
export default class ProductItemCarts extends Vue {
  howMany = 1;
  mainImage = "";
  @Prop({ type: Object as () => ProductListing })
  public product!: ProductListing;
  @Prop() private keyProd!: string;
  get mainImagePath() {
    let imagePath = "";

    if (this.product.images[0] === undefined) {
      imagePath = "noimagepath";
    } else {
      const imageName = this.product.images[0].src.split("/").slice(-1)[0];
      const imageExplode = imageName.split(".");
      const imageRename = imageExplode[0] + "-100x100." + imageExplode[1];

      const index = this.product.images[0].src.split("/").indexOf(imageName);

      const urlArray = this.product.images[0].src.split("/");

      urlArray.splice(index, 1);

      const finalUrl = urlArray.join("/") + "/" + imageRename;

      imagePath = finalUrl;
    }

    return imagePath;
  }
  created() {
    this.howMany = this.product.qty;
  }
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
.howMany {
  width: 50px;
  margin-top: 10px;
}
.category-group {
  display: inline-block;
  margin-left: 20px;
}
.product-description {
  font-size: 14px;
}
</style>
