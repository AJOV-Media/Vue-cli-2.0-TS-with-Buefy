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
            <b-icon icon="tshirt-crew" size="is-large" type="is-primary"></b-icon>
          </div>
          <div class="media-content">
            <p class="title is-5">{{ product.name }}</p>
            <p class="subtitle is-7">@johnsmith</p>
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

        <div class="content" v-html="product.short_description">
          <br />
          <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
        </div>
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
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
