import { VercelRequest, VercelResponse } from '@vercel/node';
import { generatePixCopyAndPasteCode } from '../../server/src/utils/pix-helpers';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

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
    res.status(400).json({ message: 'PIX key is required' });
    return;
  }
  if (!receiverName || typeof receiverName !== 'string' || !receiverName.trim()) {
    res.status(400).json({ message: 'Receiver name is required' });
    return;
  }
  if (!receiverCityName || typeof receiverCityName !== 'string' || !receiverCityName.trim()) {
    res.status(400).json({ message: 'Receiver city is required' });
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
}
