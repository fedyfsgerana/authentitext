import { defineStore } from "pinia";
import { ref } from "vue";
import { analyzeText } from "@/composables/useAiDetection";
import { useToast } from "@/composables/useToast";

export const useAnalysisStore = defineStore("analysis", () => {
  const result = ref(null);
  const loading = ref(false);
  const { toast } = useToast();

  async function analyze(text) {
    loading.value = true;
    result.value = null;

    try {
      const data = await analyzeText(text);
      result.value = data;
      saveToHistory(data);
      toast({
        title: "Analisis Selesai",
        description: `Hasil: ${data.verdict}`,
        type: "success",
      });
      return data;
    } catch (err) {
      const message = err.message || "Analisis gagal, coba lagi";
      toast({
        title: "Analisis Gagal",
        description: message,
        type: "error",
        duration: 5000,
      });
      throw err;
    } finally {
      loading.value = false;
    }
  }

  function loadFromHistory(item) {
    result.value = item;
  }

  function saveToHistory(data) {
    const history = JSON.parse(
      localStorage.getItem("authentitext_history") || "[]",
    );
    history.unshift({
      ...data,
      id: crypto.randomUUID(),
      savedAt: new Date().toISOString(),
    });
    localStorage.setItem(
      "authentitext_history",
      JSON.stringify(history.slice(0, 50)),
    );
  }

  function clearResult() {
    result.value = null;
  }

  return { result, loading, analyze, loadFromHistory, clearResult };
});
