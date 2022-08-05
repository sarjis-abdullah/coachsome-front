export default {
    calculatePackagePrice: function (session, minutePerSession, rate) {
      let price = 0.00;
      if (session || minutePerSession) {
        if (session && !minutePerSession) {
          price = rate * session;
        }
        if (!session && minutePerSession) {
          price = rate * (minutePerSession / 60);
        }
        if (session && minutePerSession) {
          price =
            session *
            (rate * (minutePerSession / 60));
        }
      } else {
        price = rate;
      }
      return Number(price).toFixed(2)
    }
  };