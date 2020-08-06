<template>
  <div class="control">
    <label>{{ label }}</label>
    <input v-model="v" type="text">
    <span v-if="errorState" class="error">{{ errorState }}</span>
  </div>
</template>
<script>
export default {
  name: "Input",
  props: {
    value: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      v: this.value
    };
  },
  watch: {
    value(v) {
      if (this.errorState) {
        this.clearError();
      }
      this.v = v;
    },
    v(v) {
      this.$emit("input", v);
    }
  }
};
</script>

<style scoped>
.control {
  margin-top: 10px;
}
label {
  display: block;
}
.error {
  display: block;
  margin-top: 3px;
}
</style>