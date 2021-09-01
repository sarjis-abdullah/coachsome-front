import { storageHelper } from "@/helper";

export default {
  destroyBookingInfo: function() {
    storageHelper.destroy("booking");
  },
  setBookingInfo(booking) {
    storageHelper.set("booking", booking);
  },
  getBookingInfo() {
    return storageHelper.get("booking");
  }
};
