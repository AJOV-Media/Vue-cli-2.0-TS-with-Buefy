<template>
  <div class="column is-one-third" :key="keyProd">
    <div class="card">
      <div class="card-image">
        <figure class="image is-4by3">
          <img :src="mainImagePath" alt="Placeholder image" />
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <b-icon
              icon="tshirt-crew"
              size="is-large"
              type="is-primary"
            ></b-icon>
          </div>
          <div class="media-content">
            <p class="title is-5">{{ product.name }}</p>
            <p class="subtitle is-7">
              <b-taglist attached class="tag-time-price">
                <b-tag type="is-dark">
                  <b-icon icon="clock-time-twelve" size="is-small"></b-icon>
                </b-tag>
                <b-tag type="is-info"
                  ><time style="font-size: 10px;">{{
                    product.date_created | moment("MMMM Do YYYY")
                  }}</time></b-tag
                >
              </b-taglist>

              <b-taglist attached class="tag-time-price">
                <b-tag type="is-dark">
                  <b-icon icon="cash-multiple" size="is-small"></b-icon>
                </b-tag>
                <b-tag type="is-danger" v-html="product.price_html"></b-tag>
              </b-taglist>
            </p>
          </div>
        </div>

        <b-field grouped group-multiline>
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

        <div class="content" v-html="product.short_description"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ProductListing from "@/types/ProductListing.interface";

@Component
export default class ProductItems extends Vue {
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

  mounted() {
    console.log("mounted");
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
