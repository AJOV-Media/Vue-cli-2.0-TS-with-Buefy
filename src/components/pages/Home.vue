<template>
  <div class="home">
    <div class="columns">
      <template v-for="(item, index) in products">
        <product-items :key="index" :product="item" />
      </template>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import ProductItems from "../products/ProductItems.vue";

@Component({
  components: {
    "product-items": ProductItems
  }
})
export default class Home extends Vue {
  products: any = [];
  WooCommerce: any = new WooCommerceRestApi({
    url: "https://woocommerce.local:8091/",
    consumerKey: "ck_e69ffab389c5ab9957b0f3e67a0398047f9d62d9",
    consumerSecret: "cs_30d030a4f3d6a1e132a9b0bdb8fc35f0b81171c7",
    version: "wc/v3",
    verifySsl: true,
    queryStringAuth: true
  });

  @Prop() private msg!: string;
  created() {
    this.fetchProducts();
  }
  fetchProducts() {
    this.WooCommerce.get("products", { page: 1 })
      .then(response => {
        Object.keys(response.data).forEach(key => {
          this.products = [...this.products, response.data[key]];
        });
      })
      .catch(error => {
        console.log("Error Data:", error);
      })
      .finally(() => {
        // console.log(this.products);
      });
  }
}
</script>
<style></style>
