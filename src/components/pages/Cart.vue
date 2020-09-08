<template>
  <div class="cart">
    <div class="columns is-multiline">
      <template v-for="(item, index) in products">
        <product-item-carts :key="index" :keyProd="index" :product="item" />
      </template>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import ProductItemCarts from "../products/ProductItemCarts.vue";

@Component({
  components: {
    "product-item-carts": ProductItemCarts
  }
})
export default class Cart extends Vue {
  products: any = [];
  totalPrice: number;
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
    const retrieveCartObjects = localStorage.getItem("wooBuefyVueCart");
    const cartObjects = JSON.parse(retrieveCartObjects || "[]");

    if (cartObjects.length > 0) {
      for (let i = 0; i < cartObjects.length; i++) {
        const howMany = cartObjects[i].howMany;
        this.WooCommerce.get("products/" + cartObjects[i].productId)
          .then(response => {
            response.data.qty = howMany;
            this.totalPrice += Number(response.data.price) * response.data.qty;

            this.products = [...this.products, response.data];
          })
          .catch(error => {
            console.log("Error Data:", error);
          })
          .finally(() => {
            console.log("done finally");
          });
      }
    }
  }
}
</script>
<style></style>
