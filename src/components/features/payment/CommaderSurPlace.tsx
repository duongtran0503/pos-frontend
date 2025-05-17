'use client';
import { TextareaCustom } from '@/components/common/Textarea/TextareaCustom';
import orderService from '@/services/orderService';
import { TableType } from '@/types/table';
import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Skeleton,
} from '@mui/material';
import { nanoid } from 'nanoid';
import { ChangeEvent, useEffect, useState } from 'react';
interface Props {
    table: string;
    handleChangeSelectTable: (event: SelectChangeEvent) => void;
    note: string;
    handleChangeNote: (evetn: ChangeEvent<HTMLTextAreaElement>) => void;
    loadingGetTable: boolean;
    handleChangeStatusLoadingTable: (value: boolean) => void;
}
export default function CommanderSurPlace(props: Props) {
    const [listTable, setLisTable] = useState<TableType[]>([]);

    useEffect(() => {
        props.handleChangeStatusLoadingTable(true);
        const getListTable = async () => {
            const tables = await orderService.getTable();
            setLisTable(tables);
            props.handleChangeStatusLoadingTable(false);
        };
        getListTable();
    }, []);
    const { table, handleChangeSelectTable } = props;
    if (props.loadingGetTable) {
        return <Skeleton height={180} width={'100%'} />;
    }
    return (
        <Box>
            <Box
                sx={{
                    height: '80px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <FormControl fullWidth>
                    <InputLabel id='demo-simple-select-label'>
                        Vui lòng chọn bàn ăn
                    </InputLabel>
                    <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        value={table}
                        label='Bàn ăn'
                        onChange={handleChangeSelectTable}
                    >
                        {listTable.map((table) => {
                            return (
                                <MenuItem value={table._id} key={nanoid()}>
                                    bàn {table.tableNumber}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
            </Box>
            <TextareaCustom
                rows={5}
                placeholder='Ghi chú'
                onChange={props.handleChangeNote}
                value={props.note}
            />
        </Box>
    );
}
