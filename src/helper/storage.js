export default {
  set: function(key, value) {
    if (!key || !value) {
      return;
    }

    if (typeof value === "object") {
      value = JSON.stringify(value);
    }
    process.client && localStorage.setItem(key, value);
  },
  get: function(key) {
    let value = localStorage.getItem(key);

    if (!value) {
      return;
    }

    if (value[0] === "{") {
      value = JSON.parse(value);
    }

    return value;
  },
  destroy: key => {
    process.client && localStorage.removeItem(key);
  }
};
