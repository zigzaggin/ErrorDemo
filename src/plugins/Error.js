import { isArray } from "lodash";

export default {
  install: function (Vue, { store }) {
    store.registerModule(
      "errors",
      {
        namespaced: true,
        state: { errors: {} },
        mutations: {
          setError(state, payload) {
            Vue.set(state.errors, payload.key, payload.value);
          },
          clear(state) {
            state.errors = {};
          }
        },
        getters: {
          getError: (state) => (key) => {
            return state.errors[key];
          }
        }
      },
      { preserveState: false }
    );

    if (!Vue.prototype.$errors) {
      Vue.mixin({
        props: {
          observeError: {
            type: [String, Array],
            default: ""
          }
        },
        computed: {
          errorState() {
            if (this.observeError) {
              if (typeof this.observeError === "string") {
                return store.getters["errors/getError"](this.observeError);
              } else if (isArray(this.observeError)) {
                return this.observeError
                  .map((f) => {
                    return store.getters["errors/getError"](f);
                  })
                  .filter((f) => f)
                  .join(" ");
              }
            }

            return "";
          }
        },
        methods: {
          clearError() {
            if (this.observeError)
              if (typeof this.observeError === "string")
                store.commit("errors/setError", {
                  key: this.observeError,
                  value: ""
                });
              else if (isArray(this.observeError)) {
                this.observeError.forEach((f) => {
                  store.commit("errors/setError", { key: f, value: "" });
                });
              }
          }
        }
      });

      Vue.prototype.$errors = {
        setError(target, error) {
          store.commit("errors/setError", { key: target, value: error });
        },
        clearError(target) {
          store.commit("errors/setError", { key: target, value: "" });
        },
        getError(target) {
          return store.getters["errors/getError"](target);
        },
        clear() {
          store.commit("errors/clear");
        },
        hasErrors(keys) {
          return !!keys
            .map((f) => {
              return store.getters["errors/getError"](f);
            })
            .join("");
        },
        findObservers(origin) {
          const observers = [];

          function walk(v) {
            v.$children.forEach((f) => {
              const errors = f.$options.propsData["observeError"];
              if (errors && isArray(errors)) {
                observers.push(...errors);
              } else if (errors) {
                observers.push(errors);
              }

              if (f.$children && f.$children.length > 0) {
                walk(f);
              }
            });
          }

          walk(origin);
          return observers;
        }
      };
    }
  }
};
