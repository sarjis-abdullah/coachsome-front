import Vue from "vue";
import userRole from "@/mixins/userRole";
import nodeEnvironment from "@/mixins/nodeEnvironment";

Vue.mixin(userRole);
Vue.mixin(nodeEnvironment);