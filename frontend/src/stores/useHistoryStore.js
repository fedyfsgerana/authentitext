import { defineStore } from "pinia";
import { ref } from "vue";

export const useHistoryStore = defineStore("history", () => {
  const history = ref([]);

  function load() {
    history.value = JSON.parse(
      localStorage.getItem("authentitext_history") || "[]",
    );
  }

  function remove(id) {
    history.value = history.value.filter((item) => item.id !== id);
    localStorage.setItem("authentitext_history", JSON.stringify(history.value));
  }

  function clear() {
    history.value = [];
    localStorage.removeItem("authentitext_history");
  }

  return { history, load, remove, clear };
});
