import { Grid, Paper, styled } from "@mui/material";
import { GuessType } from "./GuessData";
import { Feedback } from "./Feedback";

type GuessFormProps = {
    guessNumber: number;
    guessState: GuessType;
    onClueChanged: (clue: string) => void;
};

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: '60px',
    width: 60,
    display: 'inline-block',
    marginLeft: "10px",
    marginBottom: "12px"
}));

const GuessForm = (props: GuessFormProps) => {
    const { onClueChanged } = props;

    return (<>
        <h1>Guess #{props.guessNumber}</h1>
        <Grid container xs={12}>
            <Grid item xs={4}>
                <p className="title">Word to Guess: </p>
            </Grid>
            <Grid item xs={8}>
                {props.guessState.word.split('').map((e, i) => <Item key={i} elevation={1}>{e}</Item>)}
            </Grid>
            <Grid xs={12}>
                <Feedback onClueChanged={onClueChanged} currentGuess={props.guessState.word} isLoading={false} completed={props.guessState.completed} />
            </Grid>
        </Grid >

    </>);
}

export default GuessForm;