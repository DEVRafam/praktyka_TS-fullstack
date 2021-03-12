import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
const app = createApp(App).use(router);
// styles
import "@/sass/main.sass";
// icons
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faUser, faArrowUp, faSignInAlt, faStoreAltSlash, faEye, faEyeSlash, faSignOutAlt, faUsers, faCar, faUniversity, faFootballBall, faTshirt, faTv, faHome, faHandshake, faTree, faGamepad, faHeart, faThLarge, faBars } from "@fortawesome/free-solid-svg-icons";
library.add(faSearch, faUser, faArrowUp, faSignInAlt, faStoreAltSlash, faEye, faEyeSlash, faSignOutAlt, faUsers, faCar, faUniversity, faFootballBall, faTshirt, faTv, faHome, faHandshake, faTree, faGamepad, faHeart, faThLarge, faBars);
app.component("font-awesome-icon", FontAwesomeIcon);
// global components
import Modal from "@/components/general/Modal.vue";
app.component("Modal", Modal);
//
//
//
app.mount("#app");
