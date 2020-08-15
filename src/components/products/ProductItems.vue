<template>
  <div class="column" :key="keyProd">
    <div class="card">
      <div class="card-image">
        <figure class="image is-4by3">
          <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" />
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-4">{{ product.name }}</p>
            <p class="subtitle is-6">@johnsmith</p>
          </div>
        </div>

        <div class="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
          nec iaculis mauris.
          <a>@bulmaio</a>.
          <a href="#">#css</a>
          <a href="#">#responsive</a>
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
  @Prop({ type: Object as () => ProductListing })
  public product!: ProductListing;
  @Prop() private msg!: string;
  mounted() {
    console.log("mounted");
  }
  mapImage(image) {
    let imagePath = "";

    if (image === undefined) {
      imagePath = "noimagepath";
    } else {
      const imageName = image.src.split("/").slice(-1)[0];
      const imageExplode = imageName.split(".");
      const imageRename = imageExplode[0] + "-100x100." + imageExplode[1];

      const index = image.src.split("/").indexOf(imageName);

      const urlArray = image.src.split("/");

      urlArray.splice(index, 1);

      const finalUrl = urlArray.join("/") + "/" + imageRename;

      imagePath = finalUrl;
    }

    return imagePath;
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
