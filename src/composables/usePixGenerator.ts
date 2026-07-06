import { ref, computed } from 'vue';
import { generatePixCode } from '@/services/pixService';
import type { PixCodeResponse, Receiver } from '@/types/pix';
import { toast } from 'vue3-toastify';

export function usePixGenerator() {
    const amount = ref<number | null>(null);
    const isGenerating = ref(false);
    const generatedResult = ref<PixCodeResponse | null>(null);

    const amountInCents = computed(() => {
        if (amount.value === null) {
            return 0;
        }

        return Math.round(amount.value * 100);
    });

    async function generate(receiver: Receiver) {
        if (!receiver) {
            toast.error('No receiver selected');
            return;
        }

        if (amountInCents.value < 100) {
            toast.error('Amount must be at least R$ 1.00');
            return;
        }

        isGenerating.value = true;
        generatedResult.value = null;

        try {
            const response = await generatePixCode({
                amount: amountInCents.value,
                pixKey: receiver.pixKey,
                receiverName: receiver.receiverName,
                receiverCityName: receiver.receiverCityName,
            });

            generatedResult.value = response;
            toast.success('PIX generated successfully!');
        } catch (err: any) {
            const msg = err.message || 'Error generating PIX code';
            toast.error(msg);
        } finally {
            isGenerating.value = false;
        }
    }

    function clearResult() {
        generatedResult.value = null;
    }

    return {
        amount,
        amountInCents,
        isGenerating,
        generatedResult,
        generate,
        clearResult,
    };
}
