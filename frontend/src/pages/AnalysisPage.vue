<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Bot, ArrowLeft, Trash2, Loader2, FileText, AlertCircle, Sparkles } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useAnalysisStore } from '@/stores/useAnalysisStore'
import DarkModeToggle from '@/components/DarkModeToggle.vue'

const router = useRouter()
const store = useAnalysisStore()

const text = ref('')
const MIN_CHARS = 50
const MAX_CHARS = 5000

const charCount = computed(() => text.value.length)
const isValid = computed(() => charCount.value >= MIN_CHARS && charCount.value <= MAX_CHARS)
const isOverLimit = computed(() => charCount.value > MAX_CHARS)
const progress = computed(() => Math.min((charCount.value / MIN_CHARS) * 100, 100))

const validationMessage = computed(() => {
    if (charCount.value === 0) return null
    if (charCount.value < MIN_CHARS) return `Kurang ${MIN_CHARS - charCount.value} karakter lagi`
    if (isOverLimit.value) return `Batas maksimal terlampaui`
    return null
})

async function handleAnalyze() {
    if (!isValid.value || store.loading) return
    try {
        const result = await store.analyze(text.value)
        router.push({ name: 'Result', params: { id: result.id || 'latest' } })
    } catch (e) {
        console.error(e)
    }
}

function handleClear() {
    text.value = ''
    store.clearResult()
}
</script>

<template>
    <div class="min-h-screen bg-background">

        <!-- Navbar -->
        <nav class="border-b border-border sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
            <div class="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
                <div class="flex items-center gap-2 cursor-pointer" @click="router.push('/')">
                    <div
                        class="w-6 h-6 rounded-md bg-primary flex items-center justify-center transition-transform hover:scale-110">
                        <Bot class="w-3.5 h-3.5 text-primary-foreground" />
                    </div>
                    <span class="font-semibold text-sm">AuthentiText</span>
                </div>
                <div class="flex items-center gap-1 sm:gap-2">
                    <DarkModeToggle />
                    <Button variant="ghost" size="sm" class="text-xs sm:text-sm" @click="router.push('/history')">
                        Riwayat
                    </Button>
                </div>
            </div>
        </nav>

        <main class="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

            <!-- Tombol Kembali -->
            <button
                class="group flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-all duration-200 mb-6"
                @click="router.push('/')">
                <ArrowLeft class="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                Kembali ke Beranda
            </button>

            <!-- Header -->
            <div class="mb-6 sm:mb-8">
                <div class="flex items-center gap-2 mb-2">
                    <FileText class="w-5 h-5 text-muted-foreground" />
                    <h1 class="text-xl sm:text-2xl font-bold tracking-tight">Analisis Teks</h1>
                </div>
                <p class="text-muted-foreground text-sm">
                    Tempel teks di bawah ini. Minimal {{ MIN_CHARS }} karakter untuk hasil yang akurat.
                </p>
            </div>

            <!-- Input Card -->
            <Card
                class="mb-3 border-border transition-all duration-200 focus-within:shadow-md focus-within:border-primary/30">
                <CardContent class="p-0">
                    <textarea v-model="text" placeholder="Tempel teks kamu di sini..."
                        class="w-full min-h-[200px] sm:min-h-[280px] p-4 text-sm bg-transparent resize-none focus:outline-none rounded-lg leading-relaxed placeholder:text-muted-foreground/50"
                        :disabled="store.loading" :maxlength="MAX_CHARS + 100" />
                </CardContent>
            </Card>

            <!-- Progress Bar minimal chars -->
            <div class="h-1 bg-muted rounded-full overflow-hidden mb-4">
                <div class="h-full rounded-full transition-all duration-300"
                    :class="isValid ? 'bg-green-500' : 'bg-primary'" :style="{ width: progress + '%' }" />
            </div>

            <!-- Counter & Validasi -->
            <div class="flex items-center justify-between mb-5 sm:mb-6">
                <div class="flex flex-wrap items-center gap-2">
                    <span class="text-xs transition-colors duration-200"
                        :class="isOverLimit ? 'text-destructive font-medium' : isValid ? 'text-green-500' : 'text-muted-foreground'">
                        {{ charCount.toLocaleString('id-ID') }} / {{ MAX_CHARS.toLocaleString('id-ID') }} karakter
                    </span>
                    <span v-if="validationMessage" class="flex items-center gap-1 text-xs text-destructive">
                        <AlertCircle class="w-3 h-3 shrink-0" />
                        {{ validationMessage }}
                    </span>
                    <span v-else-if="isValid" class="text-xs text-green-500">
                        ✓ Siap dianalisis
                    </span>
                </div>
                <button v-if="text.length > 0"
                    class="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-colors duration-200 px-2 py-1 rounded hover:bg-destructive/10"
                    @click="handleClear">
                    <Trash2 class="w-3.5 h-3.5" />
                    <span class="hidden sm:inline">Hapus</span>
                </button>
            </div>

            <!-- Error -->
            <div v-if="store.error"
                class="mb-4 p-3 rounded-lg border border-destructive/30 bg-destructive/5 flex items-start gap-2">
                <AlertCircle class="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                <p class="text-sm text-destructive">{{ store.error }}</p>
            </div>

            <!-- Tombol Analisis -->
            <Button class="w-full gap-2 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]" size="lg"
                :disabled="!isValid || store.loading" @click="handleAnalyze">
                <Loader2 v-if="store.loading" class="w-4 h-4 animate-spin" />
                <Sparkles v-else class="w-4 h-4" />
                {{ store.loading ? 'Sedang menganalisis...' : 'Analisis Teks' }}
            </Button>

            <!-- Loading State -->
            <div v-if="store.loading" class="mt-6">
                <div class="flex flex-col items-center gap-3 py-4">
                    <div class="flex gap-1.5">
                        <span class="w-2 h-2 rounded-full bg-primary animate-bounce" style="animation-delay: 0ms" />
                        <span class="w-2 h-2 rounded-full bg-primary animate-bounce" style="animation-delay: 150ms" />
                        <span class="w-2 h-2 rounded-full bg-primary animate-bounce" style="animation-delay: 300ms" />
                    </div>
                    <p class="text-sm text-muted-foreground">Memproses dengan Claude AI...</p>
                </div>
            </div>

            <!-- Tips -->
            <div
                class="mt-6 sm:mt-8 p-4 rounded-lg bg-muted/40 border border-border hover:border-border/60 transition-colors duration-200">
                <p class="text-xs font-medium text-muted-foreground mb-2.5 uppercase tracking-wider">
                    Tips untuk hasil terbaik
                </p>
                <ul class="space-y-1.5">
                    <li class="text-xs text-muted-foreground flex items-start gap-2">
                        <span class="mt-0.5 shrink-0 text-primary">•</span>
                        Gunakan minimal 100 karakter untuk deteksi yang lebih akurat
                    </li>
                    <li class="text-xs text-muted-foreground flex items-start gap-2">
                        <span class="mt-0.5 shrink-0 text-primary">•</span>
                        Bekerja paling baik dengan paragraf atau artikel lengkap
                    </li>
                    <li class="text-xs text-muted-foreground flex items-start gap-2">
                        <span class="mt-0.5 shrink-0 text-primary">•</span>
                        Teks pendek atau daftar mungkin memberikan hasil kurang akurat
                    </li>
                </ul>
            </div>

        </main>
    </div>
</template>