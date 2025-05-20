import { myBank } from '@/constans/bank';

export default function generateQRCodeURL({
    bankId,
    accountNo,
    template = 'print',
    amount,
    description = myBank.DESCRIPTION,
    accountName = myBank.ACCOUNT_NAME,
}: {
    bankId: string;
    accountNo: string;
    template?: string;
    amount: string;
    description?: string;
    accountName?: string;
}) {
    return `https://img.vietqr.io/image/${bankId}-${accountNo}-${template}.png?amount=${amount}&addInfo${description}&accountName=${accountName}`;
}
