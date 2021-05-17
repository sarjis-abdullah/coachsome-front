<template>
  <div class="footer--client--back">
    <v-footer app inset height="auto" class="px-0 py-0">
      <v-card tile width="100%" height="40" >
        <v-row class="pt-2 pb-5">
          <v-col md="6" col="3">
              <slot name="left"></slot>
          </v-col>
          <v-col md="6" col="9" class="text-right">
            <slot name="right">
              <span class="d-sm-flex d-xs-flex d-lg-none justify-end">
                <drawer-toggle-btn />
              </span>
            </slot>
          </v-col>
        </v-row>
      </v-card>
    </v-footer>
  </div>
</template>

<script>
import DrawerToggleBtn from "./DrawerToggleBtn";

export default {
  components: {
    DrawerToggleBtn,
  },
};
</script>

<style lang="scss" scoped></style>
