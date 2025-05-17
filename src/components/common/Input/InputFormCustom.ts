import { styled } from '@mui/material';

export const InputFormCustomStyle = styled('input')`
    border: 2px solid transparent;
    width: 15em;
    height: 2.5em;
    padding-left: 0.8em;
    outline: none;
    overflow: hidden;
    background-color: #f3f3f3;
    border-radius: 10px;
    transition: all 0.5s;

    &:focus {
        border: 1px solid rgb(154, 204, 250);
        box-shadow: 0px 0px 0px 7px rgb(74, 157, 236, 20%);
        background-color: white;
    }
`;
