<template>
  <client-only>
    <div class="textarea-autocomplete">
      <vue-tribute :options="options">
        <textarea
          :value="value"
          @change.stop="$emit('update:value', $event.target.value)"
          placeholder="Press { to get variable .."
          rows="5"
        ></textarea>
      </vue-tribute>
    </div>
  </client-only>
</template>

<script>
export default {
  props: ["value", "options"],
  data() {
    return {};
  },
  watch: {},
  methods: {}
};
</script>

<style lang="scss">
.textarea-autocomplete {
  width: 100%;
  position: relative;
  textarea {
    appearance: none;
    border: none;
    background: #eee;
    padding: 1rem;
    color: #666;
    width: 100%;
    border-radius: 0.25rem;
    font-size: 16px;
    outline: none;
  }
}
.tribute-container {
  top: 90.7188px;
  left: 907.5px;
  position: absolute;
  display: block;
  height: auto;
  max-height: 300px;
  max-width: 500px;
  overflow: auto;
  z-index: 999999;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgb(0 0 0 / 13%);
  ul {
    margin: 0;
    margin-top: 2px;
    padding: 0;
    list-style: none;
    background: #fff;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.13);
    background-clip: padding-box;
    overflow: hidden;
  }
  li {
    color: #3f5efb;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 14px;
  }

  li.highlight,
  li:hover {
    background: #3f5efb;
    color: #fff;
  }
}
</style>
