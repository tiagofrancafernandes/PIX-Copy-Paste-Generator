<script setup lang="ts">
import { computed } from 'vue';
import { useReceivers } from '@/composables/useReceivers';
import { usePixGenerator } from '@/composables/usePixGenerator';
import ApiPreview from '@/components/ApiPreview.vue';
import PixResult from '@/components/PixResult.vue';

function validateAmountKey(event: KeyboardEvent) {
  const allowedKeys = ['0','1','2','3','4','5','6','7','8','9','.','Backspace','Delete','ArrowLeft','ArrowRight','Tab','Home','End'];
  if (event.ctrlKey || event.metaKey) {
    return;
  }
  if (!allowedKeys.includes(event.key)) {
    event.preventDefault();
    return;
  }
  // Prevent multiple dots
  if (event.key === '.' && (event.target as HTMLInputElement).value.includes('.')) {
    event.preventDefault();
  }
}

function onAmountInput(event: Event) {
  const input = event.target as HTMLInputElement;
  // Remove any non‑numeric characters except a single dot
  let cleaned = input.value.replace(/[^0-9.]/g, '');
  const parts = cleaned.split('.');
  if (parts.length > 2) {
    // Keep only first dot
    cleaned = parts[0] + '.' + parts.slice(1).join('');
  }
  input.value = cleaned;
  // Update the bound amount (v-model)
  amount.value = cleaned ? Number(cleaned) : 0;
  // Clear previous result if any
  clearResult();
}

const { receivers, selectedReceiver, select } = useReceivers();
const { amount, amountInCents, isGenerating, generatedResult, generate, clearResult } = usePixGenerator();

const canGenerate = computed(() => {
    if (!selectedReceiver.value) {
        return false;
    }

    if (!amount.value || amount.value < 1.0) {
        return false;
    }

    return true;
});

async function handleGenerate() {
    if (!selectedReceiver.value) {
        return;
    }

    await generate(selectedReceiver.value);
}

function handleSelectChange(event: Event) {
    const target = event.target as HTMLSelectElement;

    select(target.value || null);
    clearResult();
}
</script>

<template>
    <div class="space-y-8">
        <div class="space-y-1">
            <h1 class="text-2xl font-bold text-slate-800 tracking-tight">Generate PIX Payment</h1>
            <p class="text-sm text-slate-500">
                Select a receiver and enter the amount to generate a static PIX code and QR code.
            </p>
        </div>

        <!-- Empty State -->
        <div
            v-if="receivers.length === 0"
            class="bg-white border border-slate-200 rounded-md p-8 text-center space-y-4 shadow-sm"
        >
            <div class="text-3xl">👤</div>
            <div class="space-y-1">
                <h3 class="text-sm font-semibold text-slate-800">No receivers found</h3>
                <p class="text-xs text-slate-500 max-w-sm mx-auto">
                    You need to add at least one PIX receiver with their key, name, and city before you can generate
                    payments.
                </p>
            </div>
            <router-link
                to="/receivers"
                class="inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-sm btn-transition shadow-sm"
            >
                Manage Receivers
            </router-link>
        </div>

        <!-- Main Generator Form -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div class="bg-white border border-slate-200 rounded-md p-6 shadow-sm space-y-6">
                <!-- Select Receiver -->
                <div class="space-y-2">
                    <label
                        for="receiverSelect"
                        class="block text-xs font-semibold text-slate-500 uppercase tracking-wider"
                    >
                        Select Receiver
                    </label>
                    <select
                        id="receiverSelect"
                        :value="selectedReceiver?.id || ''"
                        @change="handleSelectChange"
                        class="w-full bg-white border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-0 focus:ring-primary-500 focus:border-primary-500"
                    >
                        <option value="" disabled>-- Select a receiver --</option>
                        <option v-for="r in receivers" :key="r.id" :value="r.id">
                            {{ String(r?.pixKey).trim()?.slice(0, 8) + '...' }} {{ r.receiverName }} ({{ r.receiverCityName }})
                        </option>
                    </select>
                </div>

                <!-- Loaded Receiver Details -->
                <div
                    v-if="selectedReceiver"
                    class="p-4 bg-slate-50 border border-slate-100 rounded-md space-y-2 text-xs"
                >
                    <div class="flex justify-between">
                        <span class="text-slate-500 font-medium">PIX Key</span>
                        <span class="font-mono text-slate-800">{{ selectedReceiver.pixKey }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-slate-500 font-medium">Receiver Name</span>
                        <span class="text-slate-800 font-semibold">{{ selectedReceiver.receiverName }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-slate-500 font-medium">City</span>
                        <span class="text-slate-800">{{ selectedReceiver.receiverCityName }}</span>
                    </div>
                </div>

                <!-- Amount Input -->
                <div class="space-y-2">
                    <label
                        for="amountInput"
                        class="block text-xs font-semibold text-slate-500 uppercase tracking-wider"
                    >
                        Amount (R$)
                    </label>
                    <div class="relative rounded-md flex items-stretch">
                        <span
                            class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-slate-200 bg-slate-50 text-slate-500 text-sm"
                        >
                            R$
                        </span>
                        <input
                            id="amountInput"
                            type="text"
                            step="0.01"
                            min="1.00"
                            placeholder="0.00"
                            v-model.number="amount"
                            @keydown="validateAmountKey"
                            @input="onAmountInput"
                            class="w-full border border-slate-200 rounded-r-md px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-0 focus:ring-primary-500 focus:border-primary-500"
                        />
                    </div>
                    <p class="text-[10px] text-slate-400">Minimum payment value is R$ 1.00</p>
                </div>

                <!-- Action Button -->
                <button
                    type="button"
                    :disabled="!canGenerate || isGenerating"
                    @click="handleGenerate"
                    class="w-full flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 disabled:bg-slate-200 disabled:text-slate-400 rounded-sm btn-transition shadow-sm"
                >
                    <span v-if="isGenerating">Generating Code...</span>
                    <span v-else>Generate Code</span>
                </button>

                <!-- API Preview -->
                <ApiPreview
                    v-if="selectedReceiver && amount && amount >= 1.0"
                    :pix-key="selectedReceiver.pixKey"
                    :receiver-name="selectedReceiver.receiverName"
                    :receiver-city-name="selectedReceiver.receiverCityName"
                    :amount="amountInCents"
                />
            </div>

            <!-- Generator Result -->
            <div class="space-y-4">
                <PixResult
                    v-if="generatedResult"
                    :copy-and-paste-code="generatedResult.copyAndPasteCode"
                    :qr-code-base64="generatedResult.qrCodeBase64"
                    :amount="generatedResult.value"
                />

                <div
                    v-else
                    class="border border-dashed border-slate-200 rounded-md p-12 text-center text-slate-400 text-xs flex flex-col items-center justify-center h-full min-h-[300px]"
                >
                    <span>✨</span>
                    <span class="mt-2">Enter amount and generate to view output.</span>
                </div>
            </div>
        </div>
    </div>
</template>
