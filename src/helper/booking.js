export default {
  removeBookingInfoFromStorage: function() {
    if(process.client){
      localStorage.removeItem('booking');
    }
  },
};
