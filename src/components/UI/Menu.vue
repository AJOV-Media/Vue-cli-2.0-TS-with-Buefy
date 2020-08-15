<template>
  <b-sidebar
    position="static"
    :mobile="mobile"
    :expand-on-hover="expandOnHover"
    :reduce="reduce"
    type="is-light"
    open
  >
    <div class="p-1">
      <div class="block">
        <img
          src="@/assets/images/api-logo.png"
          alt="Lightweight UI components for Vue.js based on Bulma"
        />
      </div>
      <b-menu class="is-custom-mobile">
        <b-menu-list label="Menu">
          <b-menu-item icon="information-outline" label="Info"></b-menu-item>
          <b-menu-item active expanded icon="settings" label="Administrator">
            <b-menu-item icon="account" label="Users"></b-menu-item>
            <b-menu-item icon="cellphone-link" label="Devices"></b-menu-item>
            <b-menu-item
              icon="cash-multiple"
              label="Payments"
              disabled
            ></b-menu-item>
          </b-menu-item>
          <b-menu-item icon="account" label="My Account">
            <b-menu-item icon="account-box" label="Account data"></b-menu-item>
            <b-menu-item icon="home-account" label="Addresses"></b-menu-item>
          </b-menu-item>
        </b-menu-list>
        <b-menu-list>
          <b-menu-item label="Expo" icon="link"></b-menu-item>
        </b-menu-list>
        <b-menu-list label="Actions">
          <b-menu-item icon="logout" label="Logout"></b-menu-item>
        </b-menu-list>
      </b-menu>
    </div>
  </b-sidebar>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      expandOnHover: false,
      mobile: "reduce",
      reduce: false,
    };
  },
});
</script>
<style>
.p-1 {
  padding: 1em;
}

.sidebar-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
}
.sidebar-page .sidebar-layout {
  display: flex;
  flex-direction: row;
  min-height: 100%;
}

@media screen and (max-width: 1023px) {
  .b-sidebar
    .sidebar-content.is-mini-mobile:not(.is-mini-expand)
    .menu-list
    li
    a
    span:nth-child(2),
  .b-sidebar
    .sidebar-content.is-mini-mobile.is-mini-expand:not(:hover)
    .menu-list
    li
    a
    span:nth-child(2) {
    display: none;
  }
  .b-sidebar
    .sidebar-content.is-mini-mobile:not(.is-mini-expand)
    .menu-list
    li
    ul,
  .b-sidebar
    .sidebar-content.is-mini-mobile.is-mini-expand:not(:hover)
    .menu-list
    li
    ul {
    padding-left: 0;
  }
  .b-sidebar
    .sidebar-content.is-mini-mobile:not(.is-mini-expand)
    .menu-list
    li
    ul
    li
    a,
  .b-sidebar
    .sidebar-content.is-mini-mobile.is-mini-expand:not(:hover)
    .menu-list
    li
    ul
    li
    a {
    display: inline-block;
  }
  .b-sidebar
    .sidebar-content.is-mini-mobile:not(.is-mini-expand)
    .menu-label:not(:last-child),
  .b-sidebar
    .sidebar-content.is-mini-mobile.is-mini-expand:not(:hover)
    .menu-label:not(:last-child) {
    margin-bottom: 0;
  }
}
@media screen and (min-width: 1024px) {
  .b-sidebar
    .sidebar-content.is-mini:not(.is-mini-expand)
    .menu-list
    li
    a
    span:nth-child(2),
  .b-sidebar
    .sidebar-content.is-mini.is-mini-expand:not(:hover)
    .menu-list
    li
    a
    span:nth-child(2) {
    display: none;
  }
  .b-sidebar .sidebar-content.is-mini:not(.is-mini-expand) .menu-list li ul,
  .b-sidebar
    .sidebar-content.is-mini.is-mini-expand:not(:hover)
    .menu-list
    li
    ul {
    padding-left: 0;
  }
  .b-sidebar
    .sidebar-content.is-mini:not(.is-mini-expand)
    .menu-list
    li
    ul
    li
    a,
  .b-sidebar
    .sidebar-content.is-mini.is-mini-expand:not(:hover)
    .menu-list
    li
    ul
    li
    a {
    display: inline-block;
  }
  .b-sidebar
    .sidebar-content.is-mini:not(.is-mini-expand)
    .menu-label:not(:last-child),
  .b-sidebar
    .sidebar-content.is-mini.is-mini-expand:not(:hover)
    .menu-label:not(:last-child) {
    margin-bottom: 0;
  }
}
</style>
