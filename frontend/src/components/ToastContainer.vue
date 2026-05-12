<script setup>
import { CheckCircle, AlertCircle, X } from 'lucide-vue-next'
import { useToast } from '@/composables/useToast'

const { toasts, removeToast } = useToast()
</script>

<template>
    <div class="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-80">
        <TransitionGroup name="toast">
            <div v-for="toast in toasts" :key="toast.id"
                class="flex items-start gap-3 p-4 rounded-lg border shadow-lg bg-background" :class="{
                    'border-green-500/30 bg-green-500/5': toast.type === 'success',
                    'border-destructive/30 bg-destructive/5': toast.type === 'error',
                    'border-border': toast.type === 'default',
                }">
                <CheckCircle v-if="toast.type === 'success'" class="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                <AlertCircle v-else-if="toast.type === 'error'" class="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium">{{ toast.title }}</p>
                    <p v-if="toast.description" class="text-xs text-muted-foreground mt-0.5">{{ toast.description }}</p>
                </div>
                <button @click="removeToast(toast.id)" class="text-muted-foreground hover:text-foreground shrink-0">
                    <X class="w-3.5 h-3.5" />
                </button>
            </div>
        </TransitionGroup>
    </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
    transition: all 0.3s ease;
}

.toast-enter-from {
    opacity: 0;
    transform: translateX(100%);
}

.toast-leave-to {
    opacity: 0;
    transform: translateX(100%);
}
</style>