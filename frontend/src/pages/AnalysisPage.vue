<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import {
    Bot, ArrowLeft, Trash2, Loader2, AlertCircle,
    Wand2, ClipboardPaste, FileText, CheckCircle2
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAnalysisStore } from '@/stores/useAnalysisStore'
import DarkModeToggle from '@/components/DarkModeToggle.vue'

const router = useRouter()
const store = useAnalysisStore()

const text = ref('')
const isFocused = ref(false)
const MIN_CHARS = 50
const MAX_CHARS = 5000

const charCount = computed(() => text.value.length)
const isValid = computed(() => charCount.value >= MIN_CHARS && charCount.value <= MAX_CHARS)
const isOverLimit = computed(() => charCount.value > MAX_CHARS)
const progress = computed(() => Math.min((charCount.value / MIN_CHARS) * 100, 100))

const charStatus = computed(() => {
    if (charCount.value === 0) return 'empty'
    if (charCount.value < MIN_CHARS) return 'insufficient'
    if (isOverLimit.value) return 'over'
    return 'valid'
})

const validationMessage = computed(() => {
    if (charCount.value === 0) return null
    if (charCount.value < MIN_CHARS) return `Kurang ${MIN_CHARS - charCount.value} karakter lagi`
    if (isOverLimit.value) return `Melebihi batas ${MAX_CHARS.toLocaleString('id-ID')} karakter`
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

async function handlePaste() {
    try {
        const t = await navigator.clipboard.readText()
        text.value = t
    } catch (e) {
        console.error(e)
    }
}

function handleClear() {
    text.value = ''
    store.clearResult()
}

const tips = [
    { icon: FileText, text: 'Minimal 100 karakter untuk hasil lebih akurat' },
    { icon: CheckCircle2, text: 'Gunakan paragraf atau artikel lengkap' },
    { icon: AlertCircle, text: 'Hindari teks terlalu pendek atau berupa daftar' },
]
</script>

<template>
    <div class="min-h-screen bg-background">

        <!-- Navbar -->
        <nav class="border-b border-border/50 sticky top-0 z-50 glass">
            <div class="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
                <div class="flex items-center gap-2.5 cursor-pointer group" @click="router.push('/')">
                    <div
                        class="w-6 h-6 rounded-lg bg-primary flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                        <Bot class="w-3.5 h-3.5 text-primary-foreground" />
                    </div>
                    <span class="font-bold text-sm">AuthentiText</span>
                </div>
                <div class="flex items-center gap-1 sm:gap-2">
                    <DarkModeToggle />
                    <Button variant="ghost" size="sm" class="text-xs sm:text-sm" @click="router.push('/history')">
                        Riwayat
                    </Button>
                </div>
            </div>
        </nav>

        <main class="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-10">

            <!-- Tombol Kembali -->
            <button
                class="group flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-all duration-200 mb-8"
                @click="router.push('/')">
                <ArrowLeft class="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
                Kembali ke Beranda
            </button>

            <!-- Header -->
            <div class="mb-8">
                <Badge variant="secondary" class="mb-3 gap-1.5 text-xs">
                    <Wand2 class="w-3 h-3" />
                    Analisis AI
                </Badge>
                <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
                    Analisis Teks
                </h1>
                <p class="text-muted-foreground text-sm leading-relaxed">
                    Tempel teks di bawah dan klik <strong>Analisis</strong>. Minimal {{ MIN_CHARS }} karakter
                    diperlukan.
                </p>
            </div>

            <!-- Input Area -->
            <div class="relative rounded-2xl border-2 transition-all duration-300 mb-4 overflow-hidden" :class="{
                'border-primary/50 shadow-lg shadow-primary/5': isFocused,
                'border-destructive/50': isOverLimit,
                'border-green-500/50': isValid && charCount > 0,
                'border-border': !isFocused && !isOverLimit && !(isValid && charCount > 0),
            }">
                <!-- Top bar -->
                <div class="flex items-center justify-between px-4 py-2.5 border-b border-border/50 bg-muted/30">
                    <div class="flex items-center gap-2">
                        <div class="flex gap-1.5">
                            <div class="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                            <div class="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                            <div class="w-2.5 h-2.5 rounded-full bg-green-400/60" />
                        </div>
                        <span class="text-xs text-muted-foreground font-mono">input.txt</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <button
                            class="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-muted"
                            @click="handlePaste">
                            <ClipboardPaste class="w-3 h-3" />
                            <span class="hidden sm:inline">Tempel</span>
                        </button>
                        <button v-if="text.length > 0"
                            class="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-colors px-2 py-1 rounded-md hover:bg-destructive/10"
                            @click="handleClear">
                            <Trash2 class="w-3 h-3" />
                            <span class="hidden sm:inline">Hapus</span>
                        </button>
                    </div>
                </div>

                <!-- Textarea -->
                <textarea v-model="text" placeholder="Tempel atau ketik teks di sini..."
                    class="w-full min-h-[220px] sm:min-h-[300px] p-4 text-sm bg-transparent resize-none focus:outline-none leading-relaxed placeholder:text-muted-foreground/40 font-mono"
                    :disabled="store.loading" @focus="isFocused = true" @blur="isFocused = false" />

                <!-- Bottom bar -->
                <div class="flex items-center justify-between px-4 py-2.5 border-t border-border/50 bg-muted/30">
                    <div class="flex items-center gap-3">
                        <!-- Progress bar -->
                        <div class="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
                            <div class="h-full rounded-full transition-all duration-300" :class="{
                                'bg-green-500': charStatus === 'valid',
                                'bg-destructive': charStatus === 'over',
                                'bg-primary': charStatus === 'insufficient',
                            }" :style="{ width: progress + '%' }" />
                        </div>
                        <span class="text-xs tabular-nums transition-colors duration-200" :class="{
                            'text-green-500 font-medium': charStatus === 'valid',
                            'text-destructive font-medium': charStatus === 'over',
                            'text-muted-foreground': charStatus === 'insufficient' || charStatus === 'empty',
                        }">
                            {{ charCount.toLocaleString('id-ID') }} / {{ MAX_CHARS.toLocaleString('id-ID') }}
                        </span>
                    </div>
                    <div class="flex items-center gap-1.5">
                        <span v-if="charStatus === 'valid'" class="text-xs text-green-500 flex items-center gap-1">
                            <CheckCircle2 class="w-3 h-3" />
                            Siap
                        </span>
                        <span v-else-if="validationMessage" class="text-xs text-destructive flex items-center gap-1">
                            <AlertCircle class="w-3 h-3" />
                            {{ validationMessage }}
                        </span>
                    </div>
                </div>
            </div>

            <!-- Tombol Analisis -->
            <Button
                class="w-full gap-2 h-12 text-base font-semibold transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-primary/10"
                :disabled="!isValid || store.loading" @click="handleAnalyze">
                <Loader2 v-if="store.loading" class="w-5 h-5 animate-spin" />
                <Wand2 v-else class="w-5 h-5" />
                {{ store.loading ? 'Menganalisis...' : 'Analisis Teks' }}
            </Button>

            <!-- Loading animation -->
            <div v-if="store.loading" class="mt-6 rounded-xl border border-border bg-muted/30 p-5">
                <div class="flex items-center gap-3 mb-3">
                    <div class="flex gap-1">
                        <span class="w-2 h-2 rounded-full bg-primary animate-bounce" style="animation-delay:0ms" />
                        <span class="w-2 h-2 rounded-full bg-primary animate-bounce" style="animation-delay:150ms" />
                        <span class="w-2 h-2 rounded-full bg-primary animate-bounce" style="animation-delay:300ms" />
                    </div>
                    <span class="text-sm font-medium">Sedang memproses teks...</span>
                </div>
                <div class="space-y-2">
                    <div class="h-2 bg-muted rounded shimmer" />
                    <div class="h-2 bg-muted rounded shimmer w-4/5" />
                    <div class="h-2 bg-muted rounded shimmer w-3/5" />
                </div>
            </div>

            <!-- Tips -->
            <div class="mt-6 p-5 rounded-2xl bg-muted/30 border border-border/50">
                <p class="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
                    Tips untuk Hasil Terbaik
                </p>
                <div class="space-y-2.5">
                    <div v-for="tip in tips" :key="tip.text" class="flex items-center gap-2.5">
                        <div class="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <component :is="tip.icon" class="w-3.5 h-3.5 text-primary" />
                        </div>
                        <span class="text-xs text-muted-foreground">{{ tip.text }}</span>
                    </div>
                </div>
            </div>

        </main>
    </div>
</template>