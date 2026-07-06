import { computed } from 'vue';
import { useReceiverStore } from '@/stores/receiverStore';
import type { Receiver } from '@/types/pix';

export function useReceivers() {
    const store = useReceiverStore();

    const receivers = computed(() => store.receivers);
    const selectedReceiverId = computed(() => store.selectedReceiverId);
    const selectedReceiver = computed(() => store.receivers.find((r) => r.id === store.selectedReceiverId) || null);

    function add(receiver: Omit<Receiver, 'id'>) {
        return store.addReceiver(receiver);
    }

    function edit(id: string, data: Omit<Receiver, 'id'>) {
        store.editReceiver(id, data);
    }

    function remove(id: string) {
        store.deleteReceiver(id);
    }

    function select(id: string | null) {
        store.selectReceiver(id);
    }

    return {
        receivers,
        selectedReceiverId,
        selectedReceiver,
        add,
        edit,
        remove,
        select,
    };
}
