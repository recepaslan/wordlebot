import { Grid, Paper, styled } from "@mui/material";
import { GuessType } from "../dataTypes/GuessData";
import { Feedback } from "./Feedback";
import { LetterBox } from "./LetterBox";

type GuessFormProps = {
    guessNumber: number;
    guessState: GuessType;
    onClueChanged: (clue: string) => void;
};


const GuessForm = (props: GuessFormProps) => {
    const { onClueChanged } = props;

    return (<>
        <h1>Guess #{props.guessNumber}</h1>
        <Grid container xs={12}>
            <Grid item xs={4}>
                <p className="title">Word to Guess: </p>
            </Grid>
            <Grid item xs={8}>
                {props.guessState.word.split('').map((e, i) => <LetterBox key={i} letter={e} />)}
            </Grid>
            <Grid xs={12}>
                <Feedback onClueChanged={onClueChanged} currentGuess={props.guessState.word} isLoading={false} />
            </Grid>
        </Grid >

    </>);
}

export default GuessForm;