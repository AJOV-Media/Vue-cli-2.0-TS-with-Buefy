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
          <small>@johnsmith</small>
          <small>31m</small>
          <br />Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
        </p>
      </div>
      <nav class="level is-mobile">
        <div class="level-left">
          <a class="level-item">
            <span class="icon is-small">
              <i class="fas fa-reply"></i>
            </span>
          </a>
          <a class="level-item">
            <span class="icon is-small">
              <i class="fas fa-retweet"></i>
            </span>
          </a>
          <a class="level-item">
            <span class="icon is-small">
              <i class="fas fa-heart"></i>
            </span>
          </a>
        </div>
      </nav>
    </div>
    <div class="media-right">
      <button class="delete"></button>
    </div>
  </article>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ProductListing from "@/types/ProductListing.interface";

@Component
export default class ProductItemCarts extends Vue {
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
</style>
