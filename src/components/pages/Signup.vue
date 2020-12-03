<template>
  <div class="signup">
    <div class="columns is-multiline">
      <div class="column is-full">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">Woo Signup</p>
            <a href="#" class="card-header-icon" aria-label="more options">
              <span class="icon">
                <i class="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </a>
          </header>
          <div class="card-content">
            <div class="content">
              <b-steps
                v-model="signupStep"
                :position="position"
                :label-position="labelPosition"
                @input="validateStep()"
                vertical
              >
                <b-step-item label="Personal Information" icon="account-key">
                  <h3 class="subtitle">Personal Information:</h3>
                  <b-field>
                    <b-input
                      placeholder="First name"
                      ref="firstName"
                      v-model="user.first_name"
                      required
                      type="text"
                      icon="form-textbox"
                    ></b-input>
                  </b-field>

                  <b-field>
                    <b-input
                      placeholder="Last name"
                      v-model="user.last_name"
                      ref="lastName"
                      required
                      type="text"
                      icon="form-textbox"
                    ></b-input>
                  </b-field>

                  <b-field>
                    <b-input
                      placeholder="Email"
                      v-model="user.email"
                      ref="email"
                      type="email"
                      icon="email"
                      required
                      icon-right="close-circle"
                      icon-right-clickable
                      @icon-right-click="clearEmailIconClick"
                    ></b-input>
                  </b-field>

                  <b-field>
                    <b-input
                      type="password"
                      placeholder="Password"
                      ref="password"
                      v-model="user.password"
                      required
                      icon="form-textbox"
                    ></b-input>
                  </b-field>
                  <b-field
                    :type="typeConfirmPassword"
                    :message="messageConfirmPassword"
                  >
                    <b-input
                      type="password"
                      placeholder="Confirm Password"
                      v-model="confirmPassword"
                      icon="form-textbox"
                    ></b-input>
                  </b-field>
                </b-step-item>

                <b-step-item label="Billing Information" icon="crosshairs-gps">
                  <b-field>
                    <b-input
                      placeholder="Billing Address 1"
                      ref="billing.address_1"
                      v-model="user.billing.address_1"
                      required
                      type="text"
                      icon="form-textbox"
                    ></b-input>
                  </b-field>
                  <b-field>
                    <b-input
                      placeholder="Billing Address 2"
                      ref="billing_address_2"
                      v-model="user.billing.address_2"
                      type="text"
                      icon="form-textbox"
                    ></b-input>
                  </b-field>
                  <b-field>
                    <b-input
                      placeholder="City"
                      ref="city"
                      v-model="user.billing.city"
                      required
                      type="text"
                      icon="form-textbox"
                    ></b-input>
                  </b-field>
                  <b-field>
                    <b-input
                      placeholder="State"
                      ref="state"
                      v-model="user.billing.state"
                      required
                      type="text"
                      icon="form-textbox"
                    ></b-input>
                  </b-field>
                  <b-field>
                    <b-input
                      placeholder="Postcode"
                      ref="postcode"
                      v-model="user.billing.postcode"
                      required
                      type="text"
                      icon="form-textbox"
                    ></b-input>
                  </b-field>
                  <b-field>
                    <b-input
                      placeholder="Country"
                      ref="country"
                      v-model="user.billing.country"
                      required
                      type="text"
                      icon="form-textbox"
                    ></b-input>
                  </b-field>
                  <b-field>
                    <b-input
                      placeholder="Billing Email"
                      v-model="user.billing.email"
                      ref="billing_email"
                      type="email"
                      icon="email"
                      required
                      icon-right="close-circle"
                      icon-right-clickable
                      @icon-right-click="clearEmailIconClick"
                    ></b-input>
                  </b-field>
                  <b-field>
                    <b-input
                      placeholder="Phone"
                      ref="phone"
                      v-model="user.billing.phone"
                      required
                      type="text"
                      icon="form-textbox"
                    ></b-input>
                  </b-field>
                </b-step-item>

                <b-step-item
                  label="Shipping Information"
                  icon="map-marker"
                  disabled
                  >Shipping information fields here</b-step-item
                >
              </b-steps>
            </div>
          </div>
          <footer class="card-footer">
            <p class="card-footer-item">
              &nbsp;
              <b-button @click="validateStep()" type="is-primary is-light"
                >Next</b-button
              >
              <br />
            </p>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { UserFields } from "@/types";

@Component
export default class Signup extends Vue {
  user: UserFields = {
    email: "",
    password: "",
    billing: {},
  };
  $refs: {
    firstName: HTMLFormElement;
    lastName: HTMLFormElement;
    email: HTMLFormElement;
    password: HTMLFormElement;
  };
  confirmPassword: string = "";
  labelPosition: "bottom";
  position: "0";
  typeConfirmPassword: string = "";
  messageConfirmPassword: string = "";
  signupStep: number = 0;
  WooCommerce: any = new WooCommerceRestApi({
    url: "https://woocommerce.local:8091/",
    consumerKey: "ck_e69ffab389c5ab9957b0f3e67a0398047f9d62d9",
    consumerSecret: "cs_30d030a4f3d6a1e132a9b0bdb8fc35f0b81171c7",
    version: "wc/v3",
    verifySsl: true,
    queryStringAuth: true,
  });
  @Prop() private msg!: string;
  created() {
    this.labelPosition = "bottom";
    this.position = "0";
  }
  clearEmailIconClick() {
    this.user.email = "";
  }
  validateStep() {
    const validFirstName = this.$refs.firstName.checkHtml5Validity();
    const validLastName = this.$refs.lastName.checkHtml5Validity();
    const validEmail = this.$refs.email.checkHtml5Validity();
    const validPassword = this.$refs.password.checkHtml5Validity();

    if (this.signupStep === 0) {
      if (this.user.password != this.confirmPassword) {
        this.typeConfirmPassword = "is-danger";
        this.messageConfirmPassword = "Password doesn't Match";
        return false;
      } else {
        this.typeConfirmPassword = "";
        this.messageConfirmPassword = "";
      }
      if (!validFirstName || !validLastName || !validEmail || !validPassword) {
        return false;
      } else {
        this.signupStep = 1;
      }
    }
  }
}
</script>
<style></style>
