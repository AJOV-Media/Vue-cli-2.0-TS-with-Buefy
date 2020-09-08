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
                <img :src="getImgThumbs(props)" :title="getImageName(props)" />
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
      <b-field label>
        <b-input type="number" class="howMany" value="1" v-model="howMany"></b-input>
      </b-field>
      <button class="button is-primary" @click="addToCart(productDetail.id)">Add to Cart?</button>
    </footer>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ProductFields from "@/types/ProductFields.interface";

@Component
export default class ProductDetails extends Vue {
  howMany = 1;
  @Prop({ type: Object as () => ProductFields })
  public productDetail!: ProductFields;
  getImgThumbs = value => {
    //Thumbnail image only
    let imagePath = "";
    const imageName = this.productDetail.images[value.i].src
      .split("/")
      .slice(-1)[0];
    const imageExplode = imageName.split(".");
    const imageRename = imageExplode[0] + "-150x150." + imageExplode[1];
    const index = this.productDetail.images[value.i].src
      .split("/")
      .indexOf(imageName);
    const urlArray = this.productDetail.images[0].src.split("/");

    urlArray.splice(index, 1);

    const finalUrl = urlArray.join("/") + "/" + imageRename;

    imagePath = finalUrl;

    return imagePath;
  };
  getImageName = value => {
    return this.productDetail.images[value.i].name;
  };
  addToCart(productId) {
    const retrieveCartObjects = localStorage.getItem("wooBuefyVueCart");
    const cartObjects = JSON.parse(retrieveCartObjects || "[]");

    if (cartObjects.length > 0) {
      let updateCartObject = {};
      const updatedCartObjects = JSON.parse("[]");
      let alreadyAdded = false;
      for (let i = 0; i < cartObjects.length; i++) {
        if (cartObjects[i].productId === productId) {
          //if product id is already on the cart
          alreadyAdded = true;
          updateCartObject = {
            productId: cartObjects[i].productId,
            howMany: Number(this.howMany)
          };
        } else {
          updateCartObject = {
            productId: cartObjects[i].productId,
            howMany: cartObjects[i].howMany
          };
        }
        updatedCartObjects.push(updateCartObject);
      }
      if (!alreadyAdded) {
        updateCartObject = {
          productId: productId,
          howMany: Number(this.howMany)
        };
        updatedCartObjects.push(updateCartObject);
        alreadyAdded = false;
      }
      localStorage.setItem(
        "wooBuefyVueCart",
        JSON.stringify(updatedCartObjects)
      );
    } else {
      //only if cart is all empty
      const addCartObject = {
        productId: productId,
        howMany: Number(this.howMany)
      };
      cartObjects.push(addCartObject);
      localStorage.setItem("wooBuefyVueCart", JSON.stringify(cartObjects));
    }
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
.image img {
  height: 400px;
}
.is-active .al img {
  filter: grayscale(0%);
}
.al img {
  filter: grayscale(100%);
  height: 50px;
  width: 70px;
}
.howMany {
  width: 50px;
  margin-top: 10px;
}
</style>
