import { Box } from '@mui/material';
import Modal from '@mui/material/Modal';

interface Props {
    isOpen: boolean;
    onClose?: () => void;
    children: React.ReactNode;
}
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
};
export default function ModalWrapper(props: Props) {
    const { isOpen, onClose, children } = props;
    return (
        <>
            <Modal open={isOpen} onClose={onClose}>
                <Box
                    sx={style}
                    style={{
                        outline: 'none',
                    }}
                    component={'div'}
                >
                    {children}
                </Box>
            </Modal>
        </>
    );
}
