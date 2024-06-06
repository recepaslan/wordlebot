
import { Paper, styled } from '@mui/material';
import * as React from 'react';
type LetterBoxProps = {
    color?: string;
    letter?: string;
    onClicked?: () => void
};

export function LetterBox(props: LetterBoxProps) {

    const {
        letter,
        color,
        onClicked
    } = props;

    const colors = {
        "g": 'green',
        "y": 'yellow',
        "x": 'white'
    } as any;

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: 60,
        lineHeight: '60px',
        width: 60,
        display: 'inline-block',
        marginLeft: "10px",
        marginBottom: "12px",
        cursor: onClicked ? "pointer" : 'auto',
        backgroundColor: color ? colors[color[0]] : "white"
    }));

    return (
        <Item onClick={() => { onClicked ? onClicked() : (() => { })() }}>
            {letter}
        </Item>
    );
};