<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
    ArrowRight, Zap, Shield, Clock, Bot, User,
    ChevronRight, Sparkles, TrendingUp, BarChart3
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import DarkModeToggle from '@/components/DarkModeToggle.vue'

const router = useRouter()
const isVisible = ref(false)

onMounted(() => {
    setTimeout(() => isVisible.value = true, 100)
})

const stats = [
    { label: 'Teks Dianalisis', value: '10K+', icon: BarChart3 },
    { label: 'Akurasi Model', value: '94%', icon: TrendingUp },
    { label: 'Waktu Analisis', value: '<3s', icon: Zap },
]

const features = [
    {
        icon: Zap,
        title: 'Analisis Instan',
        description: 'Dapatkan hasil dalam hitungan detik dengan mesin deteksi bertenaga Claude AI.',
        color: 'text-yellow-500',
        bg: 'bg-yellow-500/10',
        hoverBg: 'group-hover:bg-yellow-500/20',
        border: 'group-hover:border-yellow-500/30',
    },
    {
        icon: Shield,
        title: 'Akurasi Tinggi',
        description: 'Didukung model bahasa terdepan untuk deteksi yang andal dan konsisten.',
        color: 'text-blue-500',
        bg: 'bg-blue-500/10',
        hoverBg: 'group-hover:bg-blue-500/20',
        border: 'group-hover:border-blue-500/30',
    },
    {
        icon: Clock,
        title: 'Riwayat Analisis',
        description: 'Semua hasil tersimpan otomatis. Akses kapan saja tanpa perlu login.',
        color: 'text-purple-500',
        bg: 'bg-purple-500/10',
        hoverBg: 'group-hover:bg-purple-500/20',
        border: 'group-hover:border-purple-500/30',
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
                    <Button variant="ghost" size="sm" class="text-xs sm:text-sm hidden sm:flex"
                        @click="router.push('/history')">
                        Riwayat
                    </Button>
                    <Button size="sm" class="text-xs sm:text-sm gap-1.5 transition-all duration-200 hover:gap-2.5"
                        @click="router.push('/analyze')">
                        <span class="hidden sm:inline">Mulai Analisis</span>
                        <span class="sm:hidden">Mulai</span>
                        <ArrowRight class="w-3.5 h-3.5" />
                    </Button>
                </div>
            </div>
        </nav>

        <!-- Hero -->
        <section class="relative gradient-hero">
            <!-- Background decoration -->
            <div class="absolute inset-0 overflow-hidden pointer-events-none">
                <div class="absolute top-20 left-1/4 w-64 h-64 bg-destructive/5 rounded-full blur-3xl" />
                <div class="absolute top-32 right-1/4 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />
            </div>

            <div class="relative max-w-6xl mx-auto px-4 sm:px-6 pt-16 sm:pt-28 pb-12 sm:pb-20 text-center transition-all duration-700"
                :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'">
                <Badge variant="secondary" class="mb-6 gap-1.5 text-xs px-3 py-1">
                    <Sparkles class="w-3 h-3 text-yellow-500" />
                    Didukung Claude AI · Gratis Selamanya
                </Badge>

                <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-5">
                    Deteksi teks
                    <span class="relative inline-block">
                        <span class="text-destructive">AI</span>
                        <svg class="absolute -bottom-1 left-0 w-full" viewBox="0 0 100 8" preserveAspectRatio="none">
                            <path d="M0,5 Q25,0 50,5 Q75,10 100,5" stroke="currentColor" stroke-width="2" fill="none"
                                class="text-destructive/40" />
                        </svg>
                    </span>
                    <span class="text-muted-foreground"> vs </span>
                    <span class="relative inline-block">
                        <span class="text-green-500">Manusia</span>
                        <svg class="absolute -bottom-1 left-0 w-full" viewBox="0 0 100 8" preserveAspectRatio="none">
                            <path d="M0,5 Q25,0 50,5 Q75,10 100,5" stroke="currentColor" stroke-width="2" fill="none"
                                class="text-green-500/40" />
                        </svg>
                    </span>
                    <br class="hidden sm:block" />
                    <span class="text-muted-foreground text-3xl sm:text-4xl md:text-5xl font-normal"> dalam detik</span>
                </h1>

                <p class="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                    Tempel teks apapun dan langsung ketahui apakah ditulis oleh manusia atau dibuat AI.
                    Tanpa login, tanpa biaya, hasil langsung tersedia.
                </p>

                <!-- CTA -->
                <div class="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
                    <Button size="lg"
                        class="w-full sm:w-auto gap-2 px-8 h-12 text-base font-semibold transition-all duration-200 hover:scale-105 hover:gap-3 active:scale-95 shadow-lg shadow-primary/20"
                        @click="router.push('/analyze')">
                        <Sparkles class="w-4 h-4" />
                        Coba Sekarang — Gratis
                        <ArrowRight class="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="lg"
                        class="w-full sm:w-auto h-12 text-base transition-all duration-200 hover:scale-105 active:scale-95"
                        @click="router.push('/history')">
                        Lihat Riwayat
                    </Button>
                </div>

                <!-- Stats -->
                <div
                    class="inline-flex flex-wrap justify-center gap-4 sm:gap-8 px-6 py-4 rounded-2xl bg-muted/50 border border-border/50">
                    <div v-for="stat in stats" :key="stat.label" class="flex items-center gap-2">
                        <component :is="stat.icon" class="w-4 h-4 text-muted-foreground" />
                        <span class="font-bold text-sm">{{ stat.value }}</span>
                        <span class="text-xs text-muted-foreground hidden sm:inline">{{ stat.label }}</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- Contoh Hasil -->
        <section class="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
            <div class="text-center mb-8">
                <p class="text-xs sm:text-sm text-muted-foreground uppercase tracking-widest font-semibold mb-2">
                    Contoh Hasil Nyata
                </p>
                <h2 class="text-2xl sm:text-3xl font-bold tracking-tight">Lihat Cara Kerjanya</h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div v-for="(example, i) in examples" :key="i"
                    class="group relative rounded-2xl border p-5 sm:p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer overflow-hidden"
                    :class="example.isAi
                        ? 'border-destructive/20 hover:border-destructive/50 hover:shadow-destructive/10'
                        : 'border-green-500/20 hover:border-green-500/50 hover:shadow-green-500/10'"
                    @click="router.push('/analyze')">
                    <!-- Background gradient -->
                    <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        :class="example.isAi ? 'gradient-ai' : 'gradient-human'" />

                    <div class="relative">
                        <!-- Label -->
                        <div class="flex items-center justify-between mb-4">
                            <Badge variant="outline" class="text-xs gap-1"
                                :class="example.isAi ? 'border-destructive/30 text-destructive' : 'border-green-500/30 text-green-600 dark:text-green-400'">
                                <component :is="example.isAi ? Bot : User" class="w-3 h-3" />
                                {{ example.label }}
                            </Badge>
                            <Badge :variant="example.isAi ? 'destructive' : 'default'" class="text-xs">
                                {{ example.isAi ? 'Dibuat AI' : 'Ditulis Manusia' }}
                            </Badge>
                        </div>

                        <!-- Text preview -->
                        <p
                            class="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-2 italic group-hover:text-foreground/70 transition-colors duration-200">
                            "{{ example.text }}"
                        </p>

                        <!-- Score bars -->
                        <div class="space-y-3 mb-4">
                            <div class="flex items-center gap-3">
                                <div class="flex items-center gap-1.5 w-24 shrink-0">
                                    <Bot class="w-3.5 h-3.5 text-destructive" />
                                    <span class="text-xs font-semibold text-destructive">AI</span>
                                </div>
                                <div class="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                    <div class="h-full bg-destructive rounded-full transition-all duration-1000"
                                        :style="{ width: example.ai + '%' }" />
                                </div>
                                <span class="text-xs font-bold w-9 text-right tabular-nums">{{ example.ai }}%</span>
                            </div>
                            <div class="flex items-center gap-3">
                                <div class="flex items-center gap-1.5 w-24 shrink-0">
                                    <User class="w-3.5 h-3.5 text-green-500" />
                                    <span class="text-xs font-semibold text-green-500">Manusia</span>
                                </div>
                                <div class="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                    <div class="h-full bg-green-500 rounded-full transition-all duration-1000"
                                        :style="{ width: example.human + '%' }" />
                                </div>
                                <span class="text-xs font-bold w-9 text-right tabular-nums">{{ example.human }}%</span>
                            </div>
                        </div>

                        <!-- Footer -->
                        <div class="flex items-center justify-between pt-3 border-t border-border/50">
                            <span class="text-xs text-muted-foreground">Kepercayaan: <strong>{{ example.confidence
                                    }}</strong></span>
                            <span
                                class="text-xs text-muted-foreground group-hover:text-foreground transition-colors flex items-center gap-1">
                                Coba sendiri
                                <ChevronRight class="w-3 h-3" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Fitur -->
        <section class="border-y border-border/50 bg-muted/20">
            <div class="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
                <div class="text-center mb-10">
                    <p class="text-xs sm:text-sm text-muted-foreground uppercase tracking-widest font-semibold mb-2">
                        Fitur Unggulan
                    </p>
                    <h2 class="text-2xl sm:text-3xl font-bold tracking-tight">Mengapa AuthentiText?</h2>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div v-for="feature in features" :key="feature.title"
                        class="group relative p-6 rounded-2xl border border-border bg-background transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                        :class="feature.border">
                        <div class="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
                            :class="[feature.bg, feature.hoverBg]">
                            <component :is="feature.icon" class="w-5 h-5" :class="feature.color" />
                        </div>
                        <h3 class="font-bold text-sm mb-2">{{ feature.title }}</h3>
                        <p class="text-sm text-muted-foreground leading-relaxed">{{ feature.description }}</p>

                        <!-- Hover arrow -->
                        <div
                            class="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-1 group-hover:translate-x-0">
                            <ChevronRight class="w-4 h-4 text-muted-foreground" />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA -->
        <section class="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
            <div class="relative rounded-3xl border border-border bg-muted/30 overflow-hidden p-8 sm:p-12 text-center">
                <!-- Decoration -->
                <div
                    class="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                <div class="absolute inset-0 pointer-events-none">
                    <div class="absolute top-8 left-8 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
                    <div class="absolute bottom-8 right-8 w-32 h-32 bg-destructive/5 rounded-full blur-2xl" />
                </div>

                <div class="relative">
                    <Badge variant="secondary" class="mb-4 gap-1.5">
                        <Sparkles class="w-3 h-3" />
                        Mulai Sekarang
                    </Badge>
                    <h2 class="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3">
                        Siap mendeteksi teks AI?
                    </h2>
                    <p class="text-muted-foreground text-sm sm:text-base mb-8 max-w-md mx-auto">
                        Tanpa daftar. Tanpa kartu kredit. Hasil instan.
                    </p>
                    <Button size="lg"
                        class="w-full sm:w-auto gap-2 px-10 h-12 text-base font-semibold transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
                        @click="router.push('/analyze')">
                        <Sparkles class="w-4 h-4" />
                        Analisis Sekarang
                        <ArrowRight class="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="border-t border-border/50">
            <div class="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <div class="w-5 h-5 rounded bg-primary flex items-center justify-center">
                        <Bot class="w-3 h-3 text-primary-foreground" />
                    </div>
                    <span class="text-xs text-muted-foreground font-medium">AuthentiText AI</span>
                </div>
                <span class="text-xs text-muted-foreground">Didukung Claude · © 2025</span>
            </div>
        </footer>

    </div>
</template>