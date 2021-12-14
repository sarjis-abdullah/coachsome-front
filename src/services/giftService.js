import { storageHelper } from "@/helper";

export default {
  destroyGift: function() {
    storageHelper.destroy("gift");
  },
  setGift(gift) {
    storageHelper.set("gift", gift);
  },
  getGift() {
    return storageHelper.get("gift");
  }
};
