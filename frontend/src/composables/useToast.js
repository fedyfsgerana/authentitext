import { ref } from "vue";

const toasts = ref([]);

export function useToast() {
  function toast({ title, description, type = "default", duration = 3000 }) {
    const id = crypto.randomUUID();
    toasts.value.push({ id, title, description, type });
    setTimeout(() => {
      toasts.value = toasts.value.filter((t) => t.id !== id);
    }, duration);
  }

  function removeToast(id) {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  }

  return { toasts, toast, removeToast };
}
