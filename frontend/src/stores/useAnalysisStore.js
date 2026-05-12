import { defineStore } from "pinia";
import { ref } from "vue";
import { analyzeText } from "@/composables/useAiDetection";
import { useToast } from "@/composables/useToast";

export const useAnalysisStore = defineStore("analysis", () => {
  const result = ref(null);
  const loading = ref(false);
  const error = ref(null);
  const { toast } = useToast();

  async function analyze(text) {
    loading.value = true;
    error.value = null;
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
      error.value = err.message || "Analisis gagal";
      toast({
        title: "Analisis Gagal",
        description: error.value,
        type: "error",
      });
      throw err;
    } finally {
      loading.value = false;
    }
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
    error.value = null;
  }

  return { result, loading, error, analyze, clearResult };
});
