<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useReceivers } from '@/composables/useReceivers';
import ReceiverCard from '@/components/ReceiverCard.vue';
import { toast } from 'vue3-toastify';
import type { Receiver } from '@/types/pix';

const { receivers, selectedReceiverId, add, edit, remove, select } = useReceivers();

const isEditing = ref(false);
const editingId = ref<string | null>(null);

const form = reactive({
    pixKey: '',
    receiverName: '',
    receiverCityName: '',
});

function resetForm() {
    form.pixKey = '';
    form.receiverName = '';
    form.receiverCityName = '';
    isEditing.value = false;
    editingId.value = null;
}

function handleEdit(receiver: Receiver) {
    isEditing.value = true;
    editingId.value = receiver.id;
    form.pixKey = receiver.pixKey;
    form.receiverName = receiver.receiverName;
    form.receiverCityName = receiver.receiverCityName;
}

function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this receiver?')) {
        return;
    }

    remove(id);
    toast.success('Receiver deleted successfully!');
}

function handleSubmit() {
    if (!form.pixKey.trim()) {
        toast.error('PIX key is required');
        return;
    }

    if (!form.receiverName.trim()) {
        toast.error('Receiver name is required');
        return;
    }

    if (!form.receiverCityName.trim()) {
        toast.error('Receiver city is required');
        return;
    }

    const receiverData = {
        pixKey: form.pixKey.trim(),
        receiverName: form.receiverName.trim(),
        receiverCityName: form.receiverCityName.trim(),
    };

    if (isEditing.value && editingId.value) {
        edit(editingId.value, receiverData);
        toast.success('Receiver updated successfully!');
    } else {
        add(receiverData);
        toast.success('Receiver added successfully!');
    }

    resetForm();
}
</script>

<template>
    <div class="space-y-8">
        <div class="space-y-1">
            <h1 class="text-2xl font-bold text-slate-800 tracking-tight">PIX Receivers</h1>
            <p class="text-sm text-slate-500">
                Add, edit, or remove receivers. Select a receiver to use it in the payment generator.
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <!-- CRUD Form -->
            <div class="bg-white border border-slate-200 rounded-md p-6 shadow-sm space-y-4 md:sticky md:top-20">
                <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {{ isEditing ? 'Edit Receiver' : 'Add New Receiver' }}
                </h3>

                <form @submit.prevent="handleSubmit" class="space-y-4">
                    <!-- PIX Key -->
                    <div class="space-y-1">
                        <label for="pixKey" class="block text-xs font-medium text-slate-600">PIX Key</label>
                        <input
                            id="pixKey"
                            type="text"
                            required
                            v-model="form.pixKey"
                            placeholder="e.g. 123.456.789-00 or email"
                            class="w-full border border-slate-200 rounded-md px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-0 focus:ring-primary-500 focus:border-primary-500"
                        />
                    </div>

                    <!-- Receiver Name -->
                    <div class="space-y-1">
                        <label for="receiverName" class="block text-xs font-medium text-slate-600">Receiver Name</label>
                        <input
                            id="receiverName"
                            type="text"
                            required
                            v-model="form.receiverName"
                            placeholder="e.g. John Doe"
                            class="w-full border border-slate-200 rounded-md px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-0 focus:ring-primary-500 focus:border-primary-500"
                        />
                    </div>

                    <!-- Receiver City -->
                    <div class="space-y-1">
                        <label for="receiverCityName" class="block text-xs font-medium text-slate-600">City</label>
                        <input
                            id="receiverCityName"
                            type="text"
                            required
                            v-model="form.receiverCityName"
                            placeholder="e.g. Sao Paulo"
                            class="w-full border border-slate-200 rounded-md px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-0 focus:ring-primary-500 focus:border-primary-500"
                        />
                    </div>

                    <!-- Action buttons -->
                    <div class="flex space-x-2 pt-2">
                        <button
                            type="submit"
                            class="flex-1 px-3 py-1.5 text-xs font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-sm btn-transition shadow-sm"
                        >
                            {{ isEditing ? 'Update' : 'Add' }}
                        </button>
                        <button
                            v-if="isEditing"
                            type="button"
                            @click="resetForm"
                            class="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-sm hover:bg-slate-100 btn-transition"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>

            <!-- Receivers List -->
            <div class="md:col-span-2 space-y-4">
                <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Saved Receivers ({{ receivers.length }})
                </h3>

                <div
                    v-if="receivers.length === 0"
                    class="border border-dashed border-slate-200 rounded-md p-12 text-center text-slate-400 text-xs"
                >
                    No receivers saved yet. Use the form to register your first receiver.
                </div>

                <div v-else class="space-y-3">
                    <ReceiverCard
                        v-for="r in receivers"
                        :key="r.id"
                        :receiver="r"
                        :isSelected="r.id === selectedReceiverId"
                        :selectable="true"
                        @select="select"
                        @edit="handleEdit"
                        @delete="handleDelete"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
