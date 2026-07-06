import type { PixCodeRequest, PixCodeResponse } from '@/types/pix';

export async function generatePixCode(payload: PixCodeRequest): Promise<PixCodeResponse> {
    if (!payload.pixKey.trim()) {
        throw new Error('PIX Key is required');
    }

    if (!payload.receiverName.trim()) {
        throw new Error('Receiver Name is required');
    }

    if (!payload.receiverCityName.trim()) {
        throw new Error('Receiver City Name is required');
    }

    if (payload.amount < 100) {
        throw new Error('Amount must be at least R$ 1.00 (100 cents)');
    }

    const response = await fetch('/api/pix/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || 'Failed to generate PIX code';
        throw new Error(errorMessage);
    }

    const data: PixCodeResponse = await response.json();

    return data;
}
