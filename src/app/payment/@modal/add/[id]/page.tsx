import ModalAddProductToOrder from '@/components/common/Modal/ModalAddProductToOrder';
import ModalPrivate from '@/components/common/Modal/ModalPrivate';
import orderService from '@/services/orderService';
import { Box, CircularProgress } from '@mui/material';
interface Props {
    params: Promise<{ id: string }>;
}
export default async function AddNewProductToOrder(props: Props) {
    const { id } = await props.params;
    const bill = await orderService.getOrderById(id);
    if (!bill) {
        return <ModalPrivate view={<CircularProgress />} />;
    }
    return (
        <Box>
            <ModalPrivate
                view={<ModalAddProductToOrder id={id} bill={bill} />}
            />
        </Box>
    );
}
