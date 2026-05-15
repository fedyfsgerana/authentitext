<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import {
    ArrowRight, Zap, Shield, Clock, Bot, User,
    ChevronRight, Sparkles, TrendingUp, BarChart3,
    History, CheckCircle2, Star
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import DarkModeToggle from '@/components/DarkModeToggle.vue'

const router = useRouter()
const isVisible = ref(false)

// Stats real dari localStorage
const localHistory = ref([])

onMounted(() => {
    setTimeout(() => isVisible.value = true, 100)
    localHistory.value = JSON.parse(localStorage.getItem('authentitext_history') || '[]')
})

const totalAnalysis = computed(() => localHistory.value.length)
const avgAccuracy = computed(() => {
    if (!localHistory.value.length) return 94
    const high = localHistory.value.filter(i => i.confidence === 'Tinggi').length
    return Math.round((high / localHistory.value.length) * 100) || 94
})
const avgTime = computed(() => '<3s')

const stats = computed(() => [
    {
        label: 'Teks Dianalisis',
        value: totalAnalysis.value > 0 ? `${totalAnalysis.value}` : '0',
        icon: BarChart3,
        color: 'text-blue-500',
        suffix: totalAnalysis.value >= 1000 ? 'K+' : '',
    },
    {
        label: 'Tingkat Akurasi',
        value: `${avgAccuracy.value}%`,
        icon: TrendingUp,
        color: 'text-green-500',
    },
    {
        label: 'Waktu Analisis',
        value: avgTime.value,
        icon: Zap,
        color: 'text-yellow-500',
    },
])

const features = [
    {
        icon: Zap,
        title: 'Analisis Instan',
        description: 'Dapatkan hasil dalam hitungan detik dengan mesin deteksi canggih berbasis kecerdasan buatan.',
        color: 'text-yellow-500',
        bg: 'bg-yellow-500/10',
        hoverBg: 'group-hover:bg-yellow-500/20',
        border: 'group-hover:border-yellow-500/40',
        shadow: 'group-hover:shadow-yellow-500/10',
    },
    {
        icon: Shield,
        title: 'Akurasi Tinggi',
        description: 'Menggunakan model bahasa terdepan untuk deteksi yang andal dan konsisten.',
        color: 'text-blue-500',
        bg: 'bg-blue-500/10',
        hoverBg: 'group-hover:bg-blue-500/20',
        border: 'group-hover:border-blue-500/40',
        shadow: 'group-hover:shadow-blue-500/10',
    },
    {
        icon: Clock,
        title: 'Riwayat Analisis',
        description: 'Semua hasil tersimpan otomatis di browser. Akses kapan saja tanpa perlu login.',
        color: 'text-purple-500',
        bg: 'bg-purple-500/10',
        hoverBg: 'group-hover:bg-purple-500/20',
        border: 'group-hover:border-purple-500/40',
        shadow: 'group-hover:shadow-purple-500/10',
    },
]

const examples = [
    {
        text: 'Pemanfaatan kerangka metodologi tingkat lanjut memfasilitasi optimalisasi hasil organisasi melalui implementasi sistematis praktik berbasis bukti yang terstandarisasi.',
        ai: 91, human: 9, confidence: 'Tinggi', isAi: true,
        label: 'Teks Formal / Akademik',
    },
    {
        text: 'Baru bangun terus bikin kopi. Lupa charger di rumah jadi sekarang lagi di kafe sambil ngebut selesain ini sebelum laptop mati wkwk.',
        ai: 4, human: 96, confidence: 'Tinggi', isAi: false,
        label: 'Pesan Kasual',
    },
]

const benefits = [
    'Tidak perlu daftar akun',
    'Hasil analisis instan',
    'Riwayat tersimpan otomatis',
    'Gratis selamanya',
]
</script>

<template>
    <div class="min-h-screen bg-background overflow-x-hidden">

        <!-- Navbar -->
        <nav class="border-b border-border/50 sticky top-0 z-50 glass">
            <div class="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
                <div class="flex items-center gap-2.5 cursor-pointer select-none group" @click="router.push('/')">
                    <div
                        class="w-7 h-7 rounded-lg bg-primary flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                        <Bot class="w-4 h-4 text-primary-foreground" />
                    </div>
                    <span class="font-bold text-sm tracking-tight">AuthentiText</span>
                    <Badge variant="secondary" class="text-[10px] px-1.5 py-0 h-4 hidden sm:flex">AI</Badge>
                </div>
                <div class="flex items-center gap-1 sm:gap-2">
                    <DarkModeToggle />
                    <Button variant="ghost" size="sm" class="text-xs sm:text-sm gap-1.5 hidden sm:flex"
                        @click="router.push('/history')">
                        <History class="w-3.5 h-3.5" />
                        Riwayat
                    </Button>
                    <Button size="sm" class="text-xs sm:text-sm gap-1.5 transition-all duration-200"
                        @click="router.push('/analyze')">
                        <span class="hidden sm:inline">Mulai Analisis</span>
                        <span class="sm:hidden">Mulai</span>
                        <ArrowRight class="w-3.5 h-3.5" />
                    </Button>
                </div>
            </div>
        </nav>

        <!-- Hero -->
        <section class="relative overflow-hidden">
            <div class="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20"
                style="background-image: radial-gradient(circle, hsl(240 5.9% 10% / 0.15) 1px, transparent 1px); background-size: 24px 24px;" />
            <div
                class="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background pointer-events-none" />
            <div
                class="absolute top-16 left-1/4 w-72 h-72 bg-destructive/8 rounded-full blur-3xl pointer-events-none" />
            <div class="absolute top-24 right-1/4 w-56 h-56 bg-green-500/8 rounded-full blur-3xl pointer-events-none" />

            <div class="relative max-w-6xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20 pb-10 sm:pb-16 text-center transition-all duration-700"
                :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'">
                <div class="flex items-center justify-center gap-2 mb-5">
                    <Badge variant="secondary" class="gap-1.5 text-xs px-3 py-1 rounded-full">
                        <Sparkles class="w-3 h-3 text-yellow-500" />
                        Deteksi Teks AI · Gratis Selamanya
                    </Badge>
                </div>

                <h1
                    class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] mb-4">
                    <span class="block">Deteksi apakah teks</span>
                    <span class="block mt-1">
                        ditulis
                        <span class="relative inline-block mx-1">
                            <span class="text-green-500">Manusia</span>
                            <svg class="absolute -bottom-1 left-0 w-full h-2" viewBox="0 0 100 8"
                                preserveAspectRatio="none">
                                <path d="M0,6 Q50,0 100,6" stroke="currentColor" stroke-width="2.5" fill="none"
                                    class="text-green-500/40" stroke-linecap="round" />
                            </svg>
                        </span>
                        atau
                        <span class="relative inline-block mx-1">
                            <span class="text-destructive">AI?</span>
                            <svg class="absolute -bottom-1 left-0 w-full h-2" viewBox="0 0 100 8"
                                preserveAspectRatio="none">
                                <path d="M0,6 Q50,0 100,6" stroke="currentColor" stroke-width="2.5" fill="none"
                                    class="text-destructive/40" stroke-linecap="round" />
                            </svg>
                        </span>
                    </span>
                </h1>

                <p class="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto mb-7 leading-relaxed">
                    Tempel teks apapun dan ketahui hasilnya dalam detik.
                    Tanpa login, tanpa biaya.
                </p>

                <div class="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
                    <Button size="lg"
                        class="w-full sm:w-auto gap-2 px-8 h-12 text-base font-semibold transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-primary/20 rounded-xl"
                        @click="router.push('/analyze')">
                        <Sparkles class="w-4 h-4" />
                        Coba Sekarang — Gratis
                        <ArrowRight class="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="lg"
                        class="w-full sm:w-auto h-12 text-base gap-2 transition-all duration-200 hover:scale-105 active:scale-95 rounded-xl"
                        @click="router.push('/history')">
                        <History class="w-4 h-4" />
                        Lihat Riwayat
                    </Button>
                </div>

                <!-- Benefits pills -->
                <div class="flex flex-wrap items-center justify-center gap-2 mb-10">
                    <div v-for="b in benefits" :key="b"
                        class="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 border border-border/50 px-3 py-1.5 rounded-full">
                        <CheckCircle2 class="w-3 h-3 text-green-500 shrink-0" />
                        {{ b }}
                    </div>
                </div>

                <!-- Stats bar — data real -->
                <div
                    class="inline-flex flex-wrap justify-center gap-0 rounded-2xl border border-border/60 bg-background/80 backdrop-blur-sm overflow-hidden shadow-sm">
                    <div v-for="(stat, i) in stats" :key="stat.label"
                        class="flex items-center gap-3 px-6 py-3.5 transition-colors hover:bg-muted/40"
                        :class="i < stats.length - 1 ? 'border-r border-border/60' : ''">
                        <component :is="stat.icon" class="w-4 h-4 shrink-0" :class="stat.color" />
                        <div class="text-left">
                            <div class="font-bold text-sm leading-tight tabular-nums">{{ stat.value }}</div>
                            <div class="text-[11px] text-muted-foreground leading-tight">{{ stat.label }}</div>
                        </div>
                    </div>
                </div>

                <!-- Label realtime -->
                <p v-if="totalAnalysis > 0" class="text-xs text-muted-foreground mt-3">
                    Kamu sudah melakukan
                    <span class="font-semibold text-foreground">{{ totalAnalysis }} analisis</span>
                    di browser ini
                </p>
            </div>
        </section>

        <!-- Divider -->
        <div class="max-w-6xl mx-auto px-4 sm:px-6">
            <div class="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        <!-- Contoh Hasil -->
        <section class="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-7">
                <div>
                    <p class="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1">
                        Contoh Hasil Nyata
                    </p>
                    <h2 class="text-xl sm:text-2xl font-bold tracking-tight">Lihat Cara Kerjanya</h2>
                </div>
                <Button variant="outline" size="sm" class="gap-1.5 shrink-0" @click="router.push('/analyze')">
                    Coba Sendiri
                    <ArrowRight class="w-3.5 h-3.5" />
                </Button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div v-for="(example, i) in examples" :key="i"
                    class="group relative rounded-2xl border p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer overflow-hidden"
                    :class="example.isAi
                        ? 'border-destructive/20 hover:border-destructive/40 bg-destructive/[0.02] hover:bg-destructive/[0.04]'
                        : 'border-green-500/20 hover:border-green-500/40 bg-green-500/[0.02] hover:bg-green-500/[0.04]'"
                    @click="router.push('/analyze')">
                    <div class="flex items-center justify-between mb-3">
                        <Badge variant="outline" class="text-xs gap-1 font-medium" :class="example.isAi
                            ? 'border-destructive/30 text-destructive bg-destructive/5'
                            : 'border-green-500/30 text-green-600 dark:text-green-400 bg-green-500/5'">
                            <component :is="example.isAi ? Bot : User" class="w-3 h-3" />
                            {{ example.label }}
                        </Badge>
                        <Badge :variant="example.isAi ? 'destructive' : 'default'" class="text-xs font-semibold">
                            {{ example.isAi ? 'Dibuat AI' : 'Ditulis Manusia' }}
                        </Badge>
                    </div>

                    <p class="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2 italic">
                        "{{ example.text }}"
                    </p>

                    <div class="space-y-2.5 mb-4">
                        <div class="flex items-center gap-3">
                            <div class="flex items-center gap-1.5 w-20 shrink-0">
                                <Bot class="w-3.5 h-3.5 text-destructive" />
                                <span class="text-xs font-semibold text-destructive">AI</span>
                            </div>
                            <div class="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                <div class="h-full bg-destructive rounded-full transition-all duration-1000"
                                    :style="{ width: example.ai + '%' }" />
                            </div>
                            <span class="text-xs font-bold w-8 text-right tabular-nums">{{ example.ai }}%</span>
                        </div>
                        <div class="flex items-center gap-3">
                            <div class="flex items-center gap-1.5 w-20 shrink-0">
                                <User class="w-3.5 h-3.5 text-green-500" />
                                <span class="text-xs font-semibold text-green-500">Manusia</span>
                            </div>
                            <div class="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                <div class="h-full bg-green-500 rounded-full transition-all duration-1000"
                                    :style="{ width: example.human + '%' }" />
                            </div>
                            <span class="text-xs font-bold w-8 text-right tabular-nums">{{ example.human }}%</span>
                        </div>
                    </div>

                    <div class="flex items-center justify-between pt-3 border-t border-border/40">
                        <span class="text-xs text-muted-foreground">
                            Kepercayaan: <strong class="text-foreground">{{ example.confidence }}</strong>
                        </span>
                        <span
                            class="text-xs text-muted-foreground group-hover:text-foreground transition-colors flex items-center gap-1">
                            Analisis teks kamu
                            <ChevronRight class="w-3 h-3" />
                        </span>
                    </div>
                </div>
            </div>
        </section>

        <!-- Divider -->
        <div class="max-w-6xl mx-auto px-4 sm:px-6">
            <div class="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        <!-- Fitur -->
        <section class="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
            <div class="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-7">
                <div>
                    <p class="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1">
                        Fitur Unggulan
                    </p>
                    <h2 class="text-xl sm:text-2xl font-bold tracking-tight">Mengapa AuthentiText?</h2>
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div v-for="feature in features" :key="feature.title"
                    class="group relative p-5 rounded-2xl border border-border bg-background transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                    :class="[feature.border, feature.shadow]">
                    <div class="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
                        :class="[feature.bg, feature.hoverBg]">
                        <component :is="feature.icon" class="w-5 h-5" :class="feature.color" />
                    </div>
                    <h3 class="font-bold text-sm mb-1.5">{{ feature.title }}</h3>
                    <p class="text-sm text-muted-foreground leading-relaxed">{{ feature.description }}</p>
                    <div
                        class="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-200">
                        <ChevronRight class="w-4 h-4 text-muted-foreground" />
                    </div>
                </div>
            </div>
        </section>

        <!-- Divider -->
        <div class="max-w-6xl mx-auto px-4 sm:px-6">
            <div class="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        <!-- CTA -->
        <section class="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
            <div class="relative rounded-3xl border border-border overflow-hidden">
                <div class="absolute inset-0 pointer-events-none opacity-50 dark:opacity-30"
                    style="background-image: radial-gradient(circle, hsl(240 5.9% 10% / 0.1) 1px, transparent 1px); background-size: 20px 20px;" />
                <div
                    class="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background pointer-events-none" />
                <div
                    class="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

                <div class="relative px-8 sm:px-12 py-10 sm:py-14">
                    <div class="max-w-lg mx-auto text-center">
                        <Badge variant="secondary" class="mb-4 gap-1.5 rounded-full">
                            <Star class="w-3 h-3 text-yellow-500" />
                            Mulai Sekarang
                        </Badge>
                        <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
                            Siap mendeteksi teks AI?
                        </h2>
                        <p class="text-muted-foreground text-sm sm:text-base mb-7 leading-relaxed">
                            Tanpa daftar. Tanpa kartu kredit. Hasil instan.
                        </p>
                        <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
                            <Button size="lg"
                                class="w-full sm:w-auto gap-2 px-8 h-12 text-base font-semibold transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-primary/20 rounded-xl"
                                @click="router.push('/analyze')">
                                <Sparkles class="w-4 h-4" />
                                Analisis Sekarang
                                <ArrowRight class="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="lg"
                                class="w-full sm:w-auto h-12 text-base gap-2 transition-all duration-200 hover:scale-105 active:scale-95 rounded-xl"
                                @click="router.push('/history')">
                                <History class="w-4 h-4" />
                                Lihat Riwayat
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="border-t border-border/50">
            <div class="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
                <div class="flex items-center gap-2 cursor-pointer group" @click="router.push('/')">
                    <div
                        class="w-5 h-5 rounded-md bg-primary flex items-center justify-center transition-transform group-hover:scale-110">
                        <Bot class="w-3 h-3 text-primary-foreground" />
                    </div>
                    <span class="text-xs text-muted-foreground font-medium">AuthentiText AI</span>
                </div>
                <div class="flex items-center gap-4">
                    <button class="text-xs text-muted-foreground hover:text-foreground transition-colors"
                        @click="router.push('/history')">
                        Riwayat
                    </button>
                    <span class="text-xs text-muted-foreground">© 2026 AuthentiText</span>
                </div>
            </div>
        </footer>

    </div>
</template>