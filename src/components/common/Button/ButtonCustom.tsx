'use client';
import { Button, ButtonProps, styled } from '@mui/material';

const BustomCustomStyle = styled(Button)`
    background-color: #ffffff;
    border: 1px solid #222222;
    border-radius: 8px;
    box-sizing: border-box;
    color: #222222;
    cursor: pointer;
    display: inline-block;
    font-size: 16px;
    font-weight: 400;
    margin: 0;
    outline: none;
    padding: 8px 14px;
    position: relative;
    text-align: center;
    text-decoration: none;
    touch-action: manipulation;
    transition: box-shadow 0.2s, -ms-transform 0.1s, -webkit-transform 0.1s,
        transform 0.1s;
    width: auto;

    &:focus-visible {
        box-shadow: #222222 0 0 0 2px, rgba(255, 255, 255, 0.8) 0 0 0 4px;
        transition: box-shadow 0.2s;
    }

    &:hover {
        border-color: #ff5940;
        transition: box-shadow 0.2s;
        color: #ff5940;
    }

    &:active {
        background-color: rgba(255, 222, 217, 0.98);
        border-color: #ff5940;
        transform: scale(0.96);
    }

    &:disabled {
        border-color: #dddddd;
        color: #dddddd;
        cursor: not-allowed;
        opacity: 1;
    }
`;
interface ButtomCustomProps extends ButtonProps {
    children: React.ReactNode;
}
export default function ButtonCustom({
    children,
    ...props
}: ButtomCustomProps) {
    return <BustomCustomStyle {...props}>{children}</BustomCustomStyle>;
}
