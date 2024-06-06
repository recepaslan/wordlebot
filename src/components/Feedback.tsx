// @flow
import { Box, Grid, colors } from '@mui/material';
import * as React from 'react';
import { LetterBox } from './LetterBox';
import { useState } from 'react';
import { setCharAt } from '../utilities/StringUtilities';
type FeedBackProps = {
    currentGuess: string;
    isLoading: boolean;
    completed?: boolean;
    onClueChanged: (clue: string) => void;
};
export function Feedback(props: FeedBackProps) {
    const {
        onClueChanged,
        currentGuess,
        completed = false,

    } = props;

    const [currentClue, setCurrentClue] = useState("xxxxx");
    const setClueIndex = (index: number, color: string) => {
        setCurrentClue(clue => {
            const newClue = setCharAt(clue, index, color);
            return newClue;
        });
    }

    React.useEffect(() => {
        onClueChanged(currentClue);
    }, [currentClue]);

    return (
        <>
            <Grid spacing={2}>
                <Grid container xs={12}>
                    <p className='title'> What response did you get back?</p>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        borderRadius: 1,
                    }}>
                        <Grid container xs={12}>
                            <>
                                {currentGuess.split('').map((e, i) => {
                                    return (completed ?
                                        <LetterBox letter={e} color={currentClue[i]}></LetterBox> :
                                        <Grid key={i} xs={2} direction="column">
                                            <LetterBox letter={e} color={currentClue[i]}></LetterBox>
                                            <LetterBox onClicked={() => setClueIndex(i, "g")} color='green'></LetterBox>
                                            <LetterBox onClicked={() => setClueIndex(i, "y")} color='yellow'></LetterBox>
                                            <LetterBox onClicked={() => setClueIndex(i, "x")} color='white'></LetterBox>
                                        </Grid>
                                    )
                                })}
                            </>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};