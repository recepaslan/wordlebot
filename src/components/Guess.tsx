import { Box, Grid } from "@mui/material";
import { GuessType } from "../dataTypes/GuessData";
import { LetterBox } from "./LetterBox";

type Props = {
    guessNumber: number;
    guessState: GuessType;
    clue: string;
};


const Guess = (props: Props) => {
    const { clue } = props;

    return (<>
        <h1>Guess #{props.guessNumber}</h1>
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <p className="title">Word to Guess: </p>
            </Grid>
            <Grid item xs={8}>
                {props.guessState.word.split('').map((e, i) => <LetterBox key={i} letter={e} />)}
            </Grid>
            <p className="title"> What response did you get back?</p>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                p: 1,
                m: 1,
                borderRadius: 1,
            }}>
                <Grid container spacing={2}>
                    <Grid container xs={12}>
                        <Grid container xs={12}>
                            <>
                                {props.guessState.word.split('').map((e, i) => {
                                    return <LetterBox letter={e} color={props.clue[i]}></LetterBox>
                                })}
                            </>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Grid >

    </>);
}

export default Guess;