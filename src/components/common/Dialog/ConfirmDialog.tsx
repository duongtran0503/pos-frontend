'use client';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';
interface Props {
    isOpen: boolean;
    onClose: () => void;
    handleAgree: () => void;
    title: string;
    content: string;
}
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<unknown>;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction='up' ref={ref} {...props} />;
});
export default function ConfirmDialog(props: Props) {
    const { isOpen, onClose, title, content } = props;
    return (
        <Box>
            <Dialog
                open={isOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={onClose}
                aria-describedby='alert-dialog-slide-description'
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-slide-description'>
                        {content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => onClose()}>Hủy</Button>
                    <Button
                        onClick={() => props.handleAgree()}
                        sx={{ color: 'GrayText' }}
                    >
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
