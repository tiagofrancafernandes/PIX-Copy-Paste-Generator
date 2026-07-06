<script setup lang="ts">
import { toast } from 'vue3-toastify';

const props = defineProps<{
    copyAndPasteCode: string;
    qrCodeBase64: string;
    amount: string;
}>();

async function copyCode() {
    try {
        await navigator.clipboard.writeText(props.copyAndPasteCode);
        toast.success('PIX copy and paste code copied to clipboard!');
    } catch (err) {
        toast.error('Failed to copy PIX code');
    }
}
</script>

<template>
    <div class="bg-white border border-slate-200 rounded-md p-6 shadow-sm space-y-6">
        <div class="flex flex-col items-center text-center space-y-4">
            <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">PIX Payment Ready</span>

            <!-- QR Code -->
            <div
                class="p-4 bg-slate-50 border border-slate-200 rounded-md shadow-inner flex items-center justify-center"
            >
                <img :src="qrCodeBase64" alt="PIX QR Code" class="h-44 w-44 object-contain" />
            </div>

            <!-- Amount -->
            <div class="space-y-1">
                <span class="text-xs text-slate-500 font-medium">Payment Amount</span>
                <div class="text-2xl font-bold text-slate-800">R$ {{ amount }}</div>
            </div>
        </div>

        <!-- Copy Paste Code -->
        <div class="space-y-2">
            <div class="flex items-center justify-between">
                <label for="copyAndPasteInput" class="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Copy and Paste Code
                </label>
                <button
                    type="button"
                    @click="copyCode"
                    class="text-xs text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1 p-1 rounded hover:bg-slate-50 transition-all"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                        <path
                            d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"
                        />
                    </svg>
                    <span>Copy Code</span>
                </button>
            </div>

            <div class="relative flex items-stretch">
                <textarea
                    id="copyAndPasteInput"
                    readonly
                    rows="3"
                    :value="copyAndPasteCode"
                    class="w-full bg-slate-50 border border-slate-200 rounded-md p-3 text-xs font-mono text-slate-600 leading-relaxed resize-none focus:outline-none focus:ring-0 focus:ring-primary-500"
                    @click="(e) => (e.target as HTMLTextAreaElement).select()"
                ></textarea>
            </div>
        </div>
    </div>
</template>
