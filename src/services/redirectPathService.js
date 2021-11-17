const KEY = "redirect-path";
export default {
  get() {
    return localStorage.getItem(KEY);
  },
  set(path) {
    localStorage.setItem(KEY, path);
  },
  has() {
    return localStorage.getItem(KEY) ? true : false;
  },
  destroy() {
    localStorage.removeItem(KEY);
  }
};
