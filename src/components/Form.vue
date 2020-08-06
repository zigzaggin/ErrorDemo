<template>
  <div>
    <Input v-model="e1" label="Example 1" observe-error="error1"/>
    <Input v-model="e2" label="Example 2" observe-error="error2"/>
    <Input v-model="e3" label="Example 3" :observe-error="['error2', 'error3']"/>

    <a @click="setError('error1')">Set Error 1</a>
    <a @click="setError('error2')">Set Error 2</a>
    <a @click="setError('error3')">Set Error 3</a>
    <a @click="clear">Clear Errors</a>

    <div>E1: {{e1}}</div>
    <div>E2: {{e2}}</div>
    <div>E3: {{e3}}</div>
  </div>
</template>
<script>
import Input from "./Input";
export default {
  name: "Form",
  components: { Input },
  data() {
    return {
      e1: "",
      e2: "",
      e3: ""
    };
  },
  methods: {
    setError(error) {
      this.$errors.setError(
        error,
        `This is an example error for key: ${error}`
      );
    },
    clear() {
      this.$errors.clear();
    }
  }
};
</script>

<style scoped>
a {
  cursor: pointer;
  margin-top: 10px;
  background: #5c7c90;
  padding: 10px;
  display: inline-block;
  color: white;
  transition: 0.3s;
  border-radius: 3px;
}
a:hover {
  background: #3b5261;
  transition: 0.3s;
}
a + a {
  margin-left: 10px;
}
</style>