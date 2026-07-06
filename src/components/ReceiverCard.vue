<script setup lang="ts">
import type { Receiver } from '@/types/pix';

const props = defineProps<{
    receiver: Receiver;
    isSelected?: boolean;
    selectable?: boolean;
}>();

const emit = defineEmits<{
    (e: 'select', id: string): void;
    (e: 'edit', receiver: Receiver): void;
    (e: 'delete', id: string): void;
}>();
</script>

<template>
    <div
        class="border rounded-md p-4 transition-all"
        :class="[
            isSelected
                ? 'border-primary-500 bg-primary-50/30 ring-1 ring-primary-500'
                : 'border-slate-200 bg-white hover:border-slate-300',
        ]"
    >
        <div class="flex items-start justify-between">
            <div class="space-y-1">
                <h4 class="text-sm font-semibold text-slate-800 flex items-center space-x-2">
                    <span>{{ receiver.receiverName }}</span>
                    <span
                        v-if="isSelected"
                        class="inline-flex items-center px-1.5 py-0.5 rounded-sm text-[10px] font-medium bg-primary-100 text-primary-800"
                    >
                        Active
                    </span>
                </h4>
                <p class="text-xs text-slate-500">City: {{ receiver.receiverCityName }}</p>
                <div class="mt-2 text-xs font-mono text-slate-600 bg-slate-50 px-2 py-1 rounded-sm inline-block">
                    {{ receiver.pixKey }}
                </div>
            </div>

            <div class="flex space-x-1.5 ml-4">
                <button
                    v-if="selectable && !isSelected"
                    type="button"
                    @click="emit('select', receiver.id)"
                    class="px-2 py-1 text-[11px] font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-sm hover:bg-slate-100 transition-colors"
                >
                    Select
                </button>

                <button
                    type="button"
                    @click="emit('edit', receiver)"
                    class="px-2 py-1 text-[11px] font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-sm hover:bg-slate-100 transition-colors"
                    title="Edit receiver details"
                >
                    Edit
                </button>

                <button
                    type="button"
                    @click="emit('delete', receiver.id)"
                    class="px-2 py-1 text-[11px] font-medium text-red-600 bg-red-50 border border-red-100 rounded-sm hover:bg-red-100 hover:text-red-700 transition-colors"
                    title="Delete receiver"
                >
                    Delete
                </button>
            </div>
        </div>
    </div>
</template>
