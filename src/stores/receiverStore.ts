import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import type { Receiver } from '@/types/pix';

export const useReceiverStore = defineStore('receiver', () => {
    const receivers = ref<Receiver[]>([]);
    const selectedReceiverId = ref<string | null>(null);

    const storedData = localStorage.getItem('pix_receivers');
    if (storedData) {
        try {
            receivers.value = JSON.parse(storedData);
        } catch (e) {
            console.error('Failed to parse stored receivers:', e);
            receivers.value = [];
        }
    }

    const storedSelectedId = localStorage.getItem('pix_selected_receiver_id');
    if (storedSelectedId) {
        selectedReceiverId.value = storedSelectedId;
    }

    watch(
        receivers,
        (newValue) => {
            localStorage.setItem('pix_receivers', JSON.stringify(newValue));
        },
        { deep: true }
    );

    watch(selectedReceiverId, (newValue) => {
        if (newValue === null) {
            localStorage.removeItem('pix_selected_receiver_id');
            return;
        }
        localStorage.setItem('pix_selected_receiver_id', newValue);
    });

    function addReceiver(receiver: Omit<Receiver, 'id'>): Receiver {
        const newReceiver: Receiver = {
            ...receiver,
            id: crypto.randomUUID(),
        };

        receivers.value.push(newReceiver);

        if (!selectedReceiverId.value) {
            selectedReceiverId.value = newReceiver.id;
        }

        return newReceiver;
    }

    function editReceiver(id: string, updatedData: Omit<Receiver, 'id'>): void {
        const index = receivers.value.findIndex((r) => r.id === id);
        if (index === -1) {
            return;
        }

        receivers.value[index] = {
            ...receivers.value[index],
            ...updatedData,
        };
    }

    function deleteReceiver(id: string): void {
        receivers.value = receivers.value.filter((r) => r.id !== id);

        if (selectedReceiverId.value === id) {
            selectedReceiverId.value = receivers.value.length > 0 ? receivers.value[0].id : null;
        }
    }

    function selectReceiver(id: string | null): void {
        selectedReceiverId.value = id;
    }

    return {
        receivers,
        selectedReceiverId,
        addReceiver,
        editReceiver,
        deleteReceiver,
        selectReceiver,
    };
});
