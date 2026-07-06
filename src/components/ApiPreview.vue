<script setup lang="ts">
import { computed } from 'vue';
import { toast } from 'vue3-toastify';

const props = defineProps<{
    pixKey: string;
    receiverName: string;
    receiverCityName: string;
    amount: number;
}>();

const apiRequestExample = computed(() => {
    const payload = {
        amount: props.amount,
        pixKey: props.pixKey,
        receiverName: props.receiverName,
        receiverCityName: props.receiverCityName,
    };

    return `POST /api/pix/generate\nContent-Type: application/json\n\n${JSON.stringify(payload, null, 2)}`;
});

async function copyToClipboard() {
    try {
        await navigator.clipboard.writeText(apiRequestExample.value);
        toast.success('API request template copied!');
    } catch (err) {
        toast.error('Failed to copy API request');
    }
}
</script>

<template>
    <div class="space-y-2">
        <div class="flex items-center justify-between">
            <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">API Request Preview</span>
            <button
                type="button"
                @click="copyToClipboard"
                class="text-xs text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1 p-1 rounded hover:bg-slate-100 transition-all"
                title="Copy request example"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                    <path
                        d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"
                    />
                </svg>
                <span>Copy Template</span>
            </button>
        </div>

        <div class="relative bg-slate-900 border border-slate-800 rounded-md overflow-hidden p-4">
            <pre
                class="text-[11px] text-slate-300 font-mono whitespace-pre-wrap break-all leading-relaxed select-all"
                >{{ apiRequestExample }}</pre
            >
        </div>
    </div>
</template>
