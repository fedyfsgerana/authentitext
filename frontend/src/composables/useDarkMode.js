import { ref, onMounted, watch } from "vue";

const isDark = ref(false);

export function useDarkMode() {
  onMounted(() => {
    const saved = localStorage.getItem("authentitext_theme");
    if (saved === "dark") {
      isDark.value = true;
      document.documentElement.classList.add("dark");
    } else if (saved === "light") {
      isDark.value = false;
      document.documentElement.classList.remove("dark");
    } else {
      isDark.value = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (isDark.value) document.documentElement.classList.add("dark");
    }
  });

  watch(isDark, (val) => {
    if (val) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("authentitext_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("authentitext_theme", "light");
    }
  });

  function toggle() {
    isDark.value = !isDark.value;
  }

  return { isDark, toggle };
}
