<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import {
    Bot, ArrowLeft, Trash2, Loader2, AlertCircle,
    Wand2, ClipboardPaste, FileText, CheckCircle2,
    History, Info
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
const wordCount = computed(() => text.value.trim().split(/\s+/).filter(Boolean).length)

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

const placeholderExamples = [
    'Tempelkan artikel, esai, atau teks apapun di sini...',
    'Contoh: "Artificial intelligence has revolutionized..."',
    'Masukkan teks minimal 50 karakter untuk analisis...',
]

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
    { icon: FileText, text: 'Minimal 100 karakter untuk hasil akurat', color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { icon: CheckCircle2, text: 'Gunakan paragraf atau artikel lengkap', color: 'text-green-500', bg: 'bg-green-500/10' },
    { icon: AlertCircle, text: 'Hindari teks pendek atau berupa daftar', color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
]
</script>

<template>
    <div class="min-h-screen bg-background">

        <!-- Navbar -->
        <nav class="border-b border-border/50 sticky top-0 z-50 glass">
            <div class="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
                <div class="flex items-center gap-2.5 cursor-pointer group" @click="router.push('/')">
                    <div
                        class="w-6 h-6 rounded-lg bg-primary flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                        <Bot class="w-3.5 h-3.5 text-primary-foreground" />
                    </div>
                    <span class="font-bold text-sm">AuthentiText</span>
                </div>
                <div class="flex items-center gap-1 sm:gap-2">
                    <DarkModeToggle />
                    <Button variant="ghost" size="sm" class="text-xs sm:text-sm gap-1.5 hidden sm:flex"
                        @click="router.push('/history')">
                        <History class="w-3.5 h-3.5" />
                        Riwayat
                    </Button>
                </div>
            </div>
        </nav>

        <main class="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10">

            <!-- Tombol Kembali -->
            <button
                class="group flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-all duration-200 mb-6"
                @click="router.push('/')">
                <ArrowLeft class="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
                Kembali ke Beranda
            </button>

            <!-- Layout 2 kolom di desktop -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

                <!-- Kolom Kiri: Input (2/3) -->
                <div class="lg:col-span-2 flex flex-col gap-4">

                    <!-- Header -->
                    <div>
                        <div class="flex items-center gap-2 mb-1">
                            <Badge variant="secondary" class="gap-1.5 text-xs rounded-full">
                                <Wand2 class="w-3 h-3" />
                                Analisis Teks
                            </Badge>
                        </div>
                        <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight">
                            Tempel Teks Kamu
                        </h1>
                        <p class="text-muted-foreground text-sm mt-1">
                            Minimal <strong>{{ MIN_CHARS }} karakter</strong> untuk hasil yang akurat.
                        </p>
                    </div>

                    <!-- Input Area -->
                    <div class="relative rounded-2xl border-2 transition-all duration-300 overflow-hidden bg-background"
                        :class="{
                            'border-primary/60 shadow-lg shadow-primary/5': isFocused && charStatus !== 'valid' && charStatus !== 'over',
                            'border-destructive/60 shadow-lg shadow-destructive/5': isOverLimit,
                            'border-green-500/60 shadow-lg shadow-green-500/5': charStatus === 'valid',
                            'border-border hover:border-border/80': !isFocused && charStatus === 'empty',
                        }">
                        <!-- Top toolbar -->
                        <div
                            class="flex items-center justify-between px-4 py-2.5 border-b border-border/40 bg-muted/20">
                            <div class="flex items-center gap-3">
                                <div class="flex gap-1.5">
                                    <div class="w-3 h-3 rounded-full bg-red-400/70" />
                                    <div class="w-3 h-3 rounded-full bg-yellow-400/70" />
                                    <div class="w-3 h-3 rounded-full bg-green-400/70" />
                                </div>
                                <span
                                    class="text-xs text-muted-foreground font-mono hidden sm:block">teks-input.txt</span>
                            </div>
                            <div class="flex items-center gap-1">
                                <button
                                    class="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-all px-2.5 py-1.5 rounded-lg"
                                    @click="handlePaste">
                                    <ClipboardPaste class="w-3.5 h-3.5" />
                                    <span class="hidden sm:inline">Tempel</span>
                                </button>
                                <button v-if="text.length > 0"
                                    class="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all px-2.5 py-1.5 rounded-lg"
                                    @click="handleClear">
                                    <Trash2 class="w-3.5 h-3.5" />
                                    <span class="hidden sm:inline">Hapus</span>
                                </button>
                            </div>
                        </div>

                        <!-- Textarea -->
                        <textarea v-model="text" :placeholder="placeholderExamples[0]"
                            class="w-full h-64 sm:h-80 p-4 text-sm bg-transparent resize-none focus:outline-none leading-relaxed placeholder:text-muted-foreground/30"
                            :disabled="store.loading" @focus="isFocused = true" @blur="isFocused = false" />

                        <!-- Bottom status bar -->
                        <div
                            class="flex items-center justify-between px-4 py-2.5 border-t border-border/40 bg-muted/20">
                            <div class="flex items-center gap-3">
                                <div class="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                                    <div class="h-full rounded-full transition-all duration-300" :class="{
                                        'bg-green-500': charStatus === 'valid',
                                        'bg-destructive': charStatus === 'over',
                                        'bg-primary/70': charStatus === 'insufficient',
                                    }" :style="{ width: Math.min(progress, 100) + '%' }" />
                                </div>
                                <span class="text-xs tabular-nums font-medium transition-colors duration-200" :class="{
                                    'text-green-500': charStatus === 'valid',
                                    'text-destructive': charStatus === 'over',
                                    'text-muted-foreground': charStatus === 'insufficient' || charStatus === 'empty',
                                }">
                                    {{ charCount.toLocaleString('id-ID') }} / {{ MAX_CHARS.toLocaleString('id-ID') }}
                                </span>
                                <span v-if="charCount > 0" class="text-xs text-muted-foreground hidden sm:block">
                                    · {{ wordCount }} kata
                                </span>
                            </div>
                            <div class="flex items-center gap-1.5">
                                <span v-if="charStatus === 'valid'"
                                    class="text-xs text-green-500 flex items-center gap-1 font-medium">
                                    <CheckCircle2 class="w-3.5 h-3.5" />
                                    Siap dianalisis
                                </span>
                                <span v-else-if="validationMessage"
                                    class="text-xs text-muted-foreground flex items-center gap-1">
                                    <AlertCircle class="w-3 h-3" />
                                    {{ validationMessage }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- Tombol Analisis -->
                    <Button
                        class="w-full gap-2 h-12 text-base font-semibold transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] shadow-md shadow-primary/10 rounded-xl"
                        :disabled="!isValid || store.loading" @click="handleAnalyze">
                        <Loader2 v-if="store.loading" class="w-5 h-5 animate-spin" />
                        <Wand2 v-else class="w-5 h-5" />
                        {{ store.loading ? 'Menganalisis...' : 'Analisis Teks' }}
                    </Button>

                    <!-- Loading animation -->
                    <div v-if="store.loading" class="rounded-2xl border border-border bg-muted/20 p-5">
                        <div class="flex items-center gap-3 mb-4">
                            <div class="flex gap-1.5">
                                <span class="w-2 h-2 rounded-full bg-primary animate-bounce"
                                    style="animation-delay:0ms" />
                                <span class="w-2 h-2 rounded-full bg-primary animate-bounce"
                                    style="animation-delay:150ms" />
                                <span class="w-2 h-2 rounded-full bg-primary animate-bounce"
                                    style="animation-delay:300ms" />
                            </div>
                            <span class="text-sm font-semibold">Sedang menganalisis teks...</span>
                        </div>
                        <div class="space-y-2.5">
                            <div class="flex items-center gap-2">
                                <div class="w-24 h-2 bg-muted rounded shimmer" />
                                <div class="flex-1 h-2 bg-muted rounded shimmer" />
                            </div>
                            <div class="flex items-center gap-2">
                                <div class="w-16 h-2 bg-muted rounded shimmer" />
                                <div class="w-4/5 h-2 bg-muted rounded shimmer" />
                            </div>
                            <div class="flex items-center gap-2">
                                <div class="w-20 h-2 bg-muted rounded shimmer" />
                                <div class="w-3/5 h-2 bg-muted rounded shimmer" />
                            </div>
                        </div>
                    </div>

                </div>

                <!-- Kolom Kanan: Info Panel (1/3) -->
                <div class="flex flex-col gap-4">

                    <!-- Tips -->
                    <div class="rounded-2xl border border-border bg-background p-5">
                        <div class="flex items-center gap-2 mb-4">
                            <div class="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Info class="w-3.5 h-3.5 text-primary" />
                            </div>
                            <p class="text-sm font-bold">Tips Analisis</p>
                        </div>
                        <div class="space-y-3">
                            <div v-for="tip in tips" :key="tip.text" class="flex items-start gap-3">
                                <div class="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                                    :class="tip.bg">
                                    <component :is="tip.icon" class="w-3.5 h-3.5" :class="tip.color" />
                                </div>
                                <span class="text-xs text-muted-foreground leading-relaxed">{{ tip.text }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Cara Kerja -->
                    <div class="rounded-2xl border border-border bg-background p-5">
                        <p class="text-sm font-bold mb-4">Cara Kerja</p>
                        <div class="space-y-3">
                            <div v-for="(step, i) in [
                                { n: '1', text: 'Tempel teks yang ingin dianalisis' },
                                { n: '2', text: 'Klik tombol Analisis Teks' },
                                { n: '3', text: 'Lihat hasil probabilitas AI vs Manusia' },
                                { n: '4', text: 'Hasil tersimpan otomatis di Riwayat' },
                            ]" :key="i" class="flex items-start gap-3">
                                <div
                                    class="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 text-[11px] font-black mt-0.5">
                                    {{ step.n }}
                                </div>
                                <span class="text-xs text-muted-foreground leading-relaxed">{{ step.text }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Quick stats -->
                    <div class="rounded-2xl border border-border bg-muted/30 p-5">
                        <p class="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-3">Status Teks
                        </p>
                        <div class="grid grid-cols-2 gap-3">
                            <div class="text-center p-3 rounded-xl bg-background border border-border/50">
                                <div class="text-xl font-black tabular-nums mb-0.5 transition-colors duration-200"
                                    :class="{
                                        'text-green-500': charStatus === 'valid',
                                        'text-destructive': charStatus === 'over',
                                        'text-muted-foreground': charStatus === 'insufficient' || charStatus === 'empty',
                                    }">
                                    {{ charCount > 0 ? charCount.toLocaleString('id-ID') : '—' }}
                                </div>
                                <div class="text-[11px] text-muted-foreground">Karakter</div>
                            </div>
                            <div class="text-center p-3 rounded-xl bg-background border border-border/50">
                                <div class="text-xl font-black tabular-nums mb-0.5 text-foreground">
                                    {{ wordCount > 0 ? wordCount : '—' }}
                                </div>
                                <div class="text-[11px] text-muted-foreground">Kata</div>
                            </div>
                        </div>

                        <!-- Min chars indicator -->
                        <div class="mt-3 pt-3 border-t border-border/50">
                            <div class="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
                                <span>Minimum karakter</span>
                                <span class="font-medium"
                                    :class="charStatus === 'valid' || charStatus === 'over' ? 'text-green-500' : ''">
                                    {{ Math.min(charCount, MIN_CHARS) }}/{{ MIN_CHARS }}
                                </span>
                            </div>
                            <div class="h-1.5 bg-muted rounded-full overflow-hidden">
                                <div class="h-full rounded-full transition-all duration-300"
                                    :class="charStatus === 'valid' || charStatus === 'over' ? 'bg-green-500' : 'bg-primary/60'"
                                    :style="{ width: Math.min(progress, 100) + '%' }" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    </div>
</template>