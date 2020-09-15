import Home from "./components/pages/Home.vue";
import Cart from "./components/pages/Cart.vue";
import Signup from "./components/pages/Signup.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/cart", component: Cart },
  { path: "/signup", component: Signup },
];

export default routes;
