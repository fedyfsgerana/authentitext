<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import {
    Bot, User, ArrowLeft, RotateCcw, Clock,
    CheckCircle, AlertCircle, Minus,
    FileJson, FileText, Share2, ChevronDown, ChevronUp, History
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAnalysisStore } from '@/stores/useAnalysisStore'
import { useToast } from '@/composables/useToast'
import DarkModeToggle from '@/components/DarkModeToggle.vue'
import ScoreChart from '@/components/ScoreChart.vue'
import TextHighlighter from '@/components/TextHighlighter.vue'

const router = useRouter()
const store = useAnalysisStore()
const { toast } = useToast()

const result = computed(() => store.result)
const showFullText = ref(false)
const isVisible = ref(false)

onMounted(() => {
    if (!result.value) { router.push('/analyze'); return }
    setTimeout(() => isVisible.value = true, 100)
})

const verdictConfig = computed(() => {
    if (!result.value) return {}
    const ai = result.value.ai_probability
    if (ai >= 80) return { label: 'Dibuat AI', variant: 'destructive', icon: Bot, color: 'text-destructive', bg: 'bg-destructive/10', border: 'border-destructive/30', glow: 'shadow-destructive/20' }
    if (ai >= 60) return { label: 'Kemungkinan AI', variant: 'destructive', icon: Bot, color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/30', glow: 'shadow-orange-500/20' }
    if (ai >= 40) return { label: 'Tidak Pasti', variant: 'secondary', icon: Minus, color: 'text-muted-foreground', bg: 'bg-muted', border: 'border-border', glow: '' }
    if (ai >= 20) return { label: 'Kemungkinan Manusia', variant: 'default', icon: User, color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/30', glow: 'shadow-green-500/20' }
    return { label: 'Ditulis Manusia', variant: 'default', icon: User, color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/30', glow: 'shadow-green-500/20' }
})

const confidenceIcon = computed(() => {
    if (!result.value) return Minus
    if (result.value.confidence === 'Tinggi') return CheckCircle
    if (result.value.confidence === 'Sedang') return Minus
    return AlertCircle
})

async function handleShare() {
    try {
        await navigator.clipboard.writeText(
            `AuthentiText Result:\nAI: ${result.value.ai_probability}% | Manusia: ${result.value.human_probability}%\nVerdict: ${result.value.verdict}\n${result.value.summary}`
        )
        toast({ title: 'Disalin!', description: 'Hasil analisis disalin ke clipboard', type: 'success' })
    } catch (e) {
        toast({ title: 'Gagal menyalin', type: 'error' })
    }
}

function formatDate(iso) {
    return new Date(iso).toLocaleString('id-ID', {
        day: 'numeric', month: 'long', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
    })
}
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

        <main v-if="result" class="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-10 transition-all duration-500"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'">

            <!-- Tombol Kembali -->
            <div class="flex items-center justify-between mb-8">
                <button
                    class="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200 px-3 py-2 rounded-xl hover:bg-muted/60 border border-transparent hover:border-border/50 -ml-3"
                    @click="router.push('/analyze')">
                    <div
                        class="w-6 h-6 rounded-lg bg-muted group-hover:bg-background border border-border/50 flex items-center justify-center transition-all duration-200 group-hover:scale-110">
                        <ArrowLeft class="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
                    </div>
                    <span>Analisis Baru</span>
                </button>

                <div
                    class="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/40 border border-border/50 px-3 py-1.5 rounded-full">
                    <Clock class="w-3 h-3" />
                    {{ formatDate(result.analyzedAt) }}
                </div>
            </div>

            <!-- Verdict Hero Card -->
            <div class="relative rounded-3xl border p-6 sm:p-8 mb-6 overflow-hidden transition-all duration-300 hover:shadow-xl"
                :class="[verdictConfig.border]">
                <div class="absolute inset-0 opacity-30 pointer-events-none"
                    :class="result.ai_probability >= 50 ? 'gradient-ai' : 'gradient-human'" />
                <div class="relative flex flex-col sm:flex-row items-center gap-6">
                    <div class="w-20 h-20 rounded-2xl flex items-center justify-center shrink-0 border transition-transform duration-300 hover:scale-105 shadow-lg"
                        :class="[verdictConfig.bg, verdictConfig.border]">
                        <component :is="verdictConfig.icon" class="w-10 h-10" :class="verdictConfig.color" />
                    </div>
                    <div class="text-center sm:text-left flex-1">
                        <Badge :variant="verdictConfig.variant" class="mb-2 text-xs px-3">
                            {{ verdictConfig.label }}
                        </Badge>
                        <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight mb-1">Analisis Selesai</h1>
                        <div
                            class="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-muted-foreground">
                            <Clock class="w-3 h-3" />
                            {{ formatDate(result.analyzedAt) }}
                        </div>
                    </div>
                    <div class="flex sm:flex-col gap-3 sm:gap-2 shrink-0">
                        <div class="text-center px-4 py-2 rounded-xl bg-background/60 border border-border/50">
                            <div class="text-2xl font-black tabular-nums text-destructive">{{ result.ai_probability }}%
                            </div>
                            <div class="text-xs text-muted-foreground">AI</div>
                        </div>
                        <div class="text-center px-4 py-2 rounded-xl bg-background/60 border border-border/50">
                            <div class="text-2xl font-black tabular-nums text-green-500">{{ result.human_probability }}%
                            </div>
                            <div class="text-xs text-muted-foreground">Manusia</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Chart + Detail -->
            <div class="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-5">
                <Card class="sm:col-span-2 border-border card-interactive">
                    <CardContent class="p-6 flex items-center justify-center">
                        <ScoreChart :ai-score="result.ai_probability" :human-score="result.human_probability" />
                    </CardContent>
                </Card>
                <div class="sm:col-span-3 flex flex-col gap-3">
                    <Card class="border-border card-interactive-ai flex-1">
                        <CardContent class="p-4 sm:p-5">
                            <div class="flex items-center justify-between mb-2">
                                <div class="flex items-center gap-2">
                                    <div class="w-7 h-7 rounded-lg bg-destructive/10 flex items-center justify-center">
                                        <Bot class="w-3.5 h-3.5 text-destructive" />
                                    </div>
                                    <span class="text-sm font-semibold">Probabilitas AI</span>
                                </div>
                                <span class="text-3xl font-black tabular-nums text-destructive">{{ result.ai_probability
                                    }}%</span>
                            </div>
                            <div class="h-3 bg-muted rounded-full overflow-hidden">
                                <div class="h-full rounded-full transition-all duration-700 bg-gradient-to-r from-destructive/80 to-destructive"
                                    :style="{ width: result.ai_probability + '%' }" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card class="border-border card-interactive-human flex-1">
                        <CardContent class="p-4 sm:p-5">
                            <div class="flex items-center justify-between mb-2">
                                <div class="flex items-center gap-2">
                                    <div class="w-7 h-7 rounded-lg bg-green-500/10 flex items-center justify-center">
                                        <User class="w-3.5 h-3.5 text-green-500" />
                                    </div>
                                    <span class="text-sm font-semibold">Probabilitas Manusia</span>
                                </div>
                                <span class="text-3xl font-black tabular-nums text-green-500">{{
                                    result.human_probability }}%</span>
                            </div>
                            <div class="h-3 bg-muted rounded-full overflow-hidden">
                                <div class="h-full rounded-full transition-all duration-700 bg-gradient-to-r from-green-500/80 to-green-500"
                                    :style="{ width: result.human_probability + '%' }" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card class="border-border card-interactive">
                        <CardContent class="p-4 sm:p-5">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-2">
                                    <div class="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <component :is="confidenceIcon" class="w-3.5 h-3.5 text-primary" />
                                    </div>
                                    <span class="text-sm font-semibold">Tingkat Kepercayaan</span>
                                </div>
                                <Badge variant="outline" class="font-semibold">{{ result.confidence }}</Badge>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <!-- Ringkasan -->
            <Card class="mb-4 border-border card-interactive-primary">
                <CardHeader class="pb-2 px-5 pt-5">
                    <CardTitle class="text-sm font-bold flex items-center gap-2">
                        <div class="w-5 h-5 rounded bg-primary/10 flex items-center justify-center">
                            <FileJson class="w-3 h-3 text-primary" />
                        </div>
                        Ringkasan Analisis
                    </CardTitle>
                </CardHeader>
                <CardContent class="px-5 pb-5">
                    <p class="text-sm text-muted-foreground leading-relaxed">{{ result.summary }}</p>
                </CardContent>
            </Card>

            <!-- Indikator -->
            <Card v-if="result.highlights?.length" class="mb-4 border-border">
                <CardHeader class="pb-2 px-5 pt-5">
                    <CardTitle class="text-sm font-bold flex items-center gap-2">
                        <div class="w-5 h-5 rounded bg-yellow-500/10 flex items-center justify-center">
                            <AlertCircle class="w-3 h-3 text-yellow-500" />
                        </div>
                        Indikator Utama
                    </CardTitle>
                </CardHeader>
                <CardContent class="px-5 pb-5 space-y-2.5">
                    <div v-for="(h, i) in result.highlights" :key="i"
                        class="p-3.5 rounded-xl bg-muted/40 border border-border/50 transition-all duration-200 hover:bg-muted/70 hover:border-border hover:shadow-sm">
                        <p class="text-xs font-semibold mb-1.5 italic text-foreground/80">"{{ h.text }}"</p>
                        <p class="text-xs text-muted-foreground leading-relaxed">{{ h.reason }}</p>
                    </div>
                </CardContent>
            </Card>

            <!-- Teks yang Dianalisis dengan Highlight -->
            <Card class="mb-6 border-border card-interactive">
                <CardHeader class="px-5 pt-5 pb-3">
                    <div class="flex items-start justify-between gap-3">
                        <CardTitle class="text-sm font-bold flex items-center gap-2">
                            <div class="w-5 h-5 rounded bg-muted flex items-center justify-center shrink-0">
                                <FileText class="w-3 h-3 text-muted-foreground" />
                            </div>
                            Teks yang Dianalisis
                        </CardTitle>
                        <div class="flex items-center gap-3 shrink-0">
                            <div class="flex items-center gap-1.5">
                                <span
                                    class="inline-block w-3 h-3 rounded-sm bg-destructive/20 border-b-2 border-destructive/50" />
                                <span class="text-xs text-muted-foreground">Terindikasi AI</span>
                            </div>
                            <div class="flex items-center gap-1.5">
                                <span class="inline-block w-3 h-3 rounded-sm bg-transparent border border-border" />
                                <span class="text-xs text-muted-foreground">Normal</span>
                            </div>
                        </div>
                    </div>
                    <div class="mt-3 flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/40 border border-border/50">
                        <AlertCircle class="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                        <p class="text-xs text-muted-foreground">
                            Teks dengan <span class="text-destructive font-medium">warna merah</span> terindikasi
                            ditulis oleh AI berdasarkan pola bahasa yang terdeteksi.
                        </p>
                    </div>
                </CardHeader>
                <CardContent class="px-5 pb-5">
                    <div class="relative rounded-xl border border-border/50 bg-muted/20 p-4 overflow-hidden transition-all duration-300"
                        :class="showFullText ? '' : 'max-h-48'">
                        <TextHighlighter :text="result.text" :highlights="result.highlights" />
                        <div v-if="!showFullText && result.text.length > 300"
                            class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />
                    </div>
                    <button v-if="result.text.length > 300"
                        class="mt-3 w-full flex items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-all duration-200 py-2 rounded-lg hover:bg-muted/50 border border-transparent hover:border-border/50"
                        @click="showFullText = !showFullText">
                        <component :is="showFullText ? ChevronUp : ChevronDown" class="w-3.5 h-3.5" />
                        {{ showFullText ? 'Tampilkan lebih sedikit' : 'Tampilkan teks lengkap' }}
                    </button>
                    <div class="mt-3 flex flex-wrap gap-3 pt-3 border-t border-border/50">
                        <div class="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <span class="font-medium text-foreground">{{ result.text.length.toLocaleString('id-ID')
                                }}</span>
                            karakter
                        </div>
                        <div class="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <span class="font-medium text-foreground">{{
                                result.text.split(/\s+/).filter(Boolean).length.toLocaleString('id-ID') }}</span>
                            kata
                        </div>
                        <div v-if="result.highlights?.length"
                            class="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <span class="font-medium text-destructive">{{ result.highlights.length }}</span>
                            frasa terindikasi AI
                        </div>
                    </div>
                </CardContent>
            </Card>

            <!-- Aksi -->
            <div class="flex flex-col sm:flex-row gap-3">
                <Button
                    class="flex-1 gap-2 h-11 font-semibold transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] shadow-md shadow-primary/10 rounded-xl"
                    @click="router.push('/analyze')">
                    <RotateCcw class="w-4 h-4" />
                    Analisis Lagi
                </Button>
                <Button variant="outline"
                    class="flex-1 gap-2 h-11 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] rounded-xl"
                    @click="handleShare">
                    <Share2 class="w-4 h-4" />
                    Salin Hasil
                </Button>
                <Button variant="outline"
                    class="flex-1 gap-2 h-11 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] rounded-xl"
                    @click="router.push('/history')">
                    <History class="w-4 h-4" />
                    Riwayat
                </Button>
            </div>

        </main>
    </div>
</template>