export interface Receiver {
    id: string;
    pixKey: string;
    receiverName: string;
    receiverCityName: string;
}

export interface PixCodeRequest {
    amount: number; // sent as integer cents: R$ 1.00 = 100
    pixKey: string;
    receiverName: string;
    receiverCityName: string;
}

export interface PixCodeResponse {
    value: string; // "10.00"
    copyAndPasteCode: string;
    qrCodeUrl: string;
    qrCodeBase64: string;
}
