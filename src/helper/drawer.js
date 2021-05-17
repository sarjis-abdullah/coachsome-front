export default {
  toggleClientBackDrawer:(event)=> {
    this.$root.$emit("toggle-back-drawer", event);
  }
};
