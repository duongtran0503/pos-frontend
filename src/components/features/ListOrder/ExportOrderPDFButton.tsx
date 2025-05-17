'use client';
import ModalWrapper from '@/components/common/Modal/ModalWrapper';
import FormatPDFOrder from '@/components/features/ListOrder/FormatPDFOrder';
import { BillType } from '@/types/order';
import { Box, Button } from '@mui/material';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { useRef, useState } from 'react';
import { FaPrint } from 'react-icons/fa';
import { useReactToPrint } from 'react-to-print';
interface Props {
    bill: BillType;
}
export default function ExportOrderPDFButton(props: Props) {
    const [isShowOrderPDF, setIsShowOrderPDF] = useState<boolean>(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const reactToPrintFn = useReactToPrint({ contentRef });
    const handleExportPDF = async () => {
        const input = contentRef.current;
        if (input) {
            const canvas = await html2canvas(input);
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`hoa_don_${props.bill.createdAt.trim()}.pdf`);
        }
    };
    return (
        <Box>
            <ModalWrapper
                isOpen={isShowOrderPDF}
                onClose={() => setIsShowOrderPDF(false)}
            >
                <Box
                    sx={{
                        padding: '20px',
                        background: 'white',
                        borderRadius: '10px',
                    }}
                >
                    <Box sx={{}}>
                        <FormatPDFOrder
                            printRef={contentRef}
                            bill={props.bill}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', columnGap: '10px' }}>
                        <Button
                            startIcon={<FaPrint />}
                            sx={{
                                background: 'white',
                                color: 'black',
                                fontSize: '16px',
                                textTransform: 'lowercase',
                                borderRadius: '8px',
                                boxShadow:
                                    ' rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;',

                                '&:hover': {
                                    boxShadow:
                                        ' rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;',
                                },
                                width: '130px',
                            }}
                            onClick={reactToPrintFn}
                        >
                            in
                        </Button>
                        <Button
                            onClick={handleExportPDF}
                            startIcon={<FaPrint />}
                            sx={{
                                background: 'white',
                                color: 'black',
                                fontSize: '16px',
                                textTransform: 'lowercase',
                                borderRadius: '8px',
                                boxShadow:
                                    ' rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;',

                                '&:hover': {
                                    boxShadow:
                                        ' rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;',
                                },
                                width: '130px',
                            }}
                        >
                            xuất file
                        </Button>
                    </Box>
                </Box>
            </ModalWrapper>
            <Button
                onClick={() => setIsShowOrderPDF(true)}
                startIcon={<FaPrint />}
                sx={{
                    background: 'white',
                    color: 'black',
                    fontSize: '16px',
                    textTransform: 'lowercase',
                    borderRadius: '8px',
                    boxShadow:
                        ' rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;',

                    '&:hover': {
                        boxShadow:
                            ' rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;',
                    },
                    width: '130px',
                }}
            >
                in hóa đơn
            </Button>
        </Box>
    );
}
