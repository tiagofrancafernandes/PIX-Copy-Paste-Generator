import express from 'express';
import cors from 'cors';
import { generatePixCopyAndPasteCode } from '../src/utils/pix-helpers';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/api/pix/generate', async (req, res) => {
    const { amount, pixKey, receiverName, receiverCityName } = req.body;

    if (amount === undefined || amount === null) {
        res.status(400).json({ message: 'Amount is required' });
        return;
    }

    if (!Number.isInteger(amount)) {
        res.status(400).json({ message: 'Amount must be an integer (in cents)' });
        return;
    }

    if (amount < 100) {
        res.status(400).json({ message: 'Amount must be at least 100 cents (R$ 1.00)' });
        return;
    }

    if (!pixKey || typeof pixKey !== 'string' || !pixKey.trim()) {
        res.status(400).json({ message: 'PIX key is required and must be a valid string' });
        return;
    }

    if (!receiverName || typeof receiverName !== 'string' || !receiverName.trim()) {
        res.status(400).json({ message: 'Receiver name is required and must be a valid string' });
        return;
    }

    if (!receiverCityName || typeof receiverCityName !== 'string' || !receiverCityName.trim()) {
        res.status(400).json({ message: 'Receiver city is required and must be a valid string' });
        return;
    }

    try {
        const pixData = await generatePixCopyAndPasteCode(
            amount,
            pixKey.trim(),
            receiverName.trim(),
            receiverCityName.trim()
        );

        res.status(200).json({
            value: pixData.amount,
            copyAndPasteCode: pixData.copyAndPasteCode,
            qrCodeUrl: pixData.qrCodeUrl,
            qrCodeBase64: pixData.qrCodeBase64,
        });
    } catch (err: any) {
        console.error('Error generating PIX:', err);

        res.status(500).json({ message: err.message || 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
