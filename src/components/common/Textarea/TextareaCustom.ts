import { styled } from '@mui/material';

export const TextareaCustom = styled('textarea')`
    display: block;
    padding: 0.625rem;
    width: 100%;
    font-size: 0.875rem;
    color: #374151;
    background-color: #f9fafb;
    border-radius: 0.5rem;
    border: 1px solid #d1d5db;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

    &:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 0.25rem rgba(59, 130, 246, 0.25);
    }
`;
