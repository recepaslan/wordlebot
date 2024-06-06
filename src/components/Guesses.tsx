import { useState } from "react";
import { WordleRequest, fetchWordleResult } from "../api/api";
import Guess from "./Guess";
import { GuessType } from "./GuessData";
import { useQuery } from "@tanstack/react-query";
import { Box, Button } from "@mui/material";
import GuessForm from "./GuessForm";
import ErrorView from "./ErrorView";

function Guesses() {
    const [requests, setRequests] = useState([] as WordleRequest);
    const [guesses, setGuesses] = useState([] as GuessType[]);
    const [currentClue, setCurrentClue] = useState("xxxxx");
    const [currentGuess, setCurrentGuess] = useState("");
    const [receivedInitialGuess, setReceivedInitialGuess] = useState(true);
    const [found, setFound] = useState(false);
    const [error, setError] = useState();

    const { refetch, fetchStatus, isInitialLoading } = useQuery(
        {
            queryKey: ['guesses'],
            queryFn: async () => {
                setReceivedInitialGuess(false);
                let guess = "";
                try {
                    const response = await fetchWordleResult(requests);
                    guess = response.guess;
                    if (requests.length > 0) {
                        const lastRequest = requests[requests.length - 1];
                        guesses.push({ word: lastRequest.word, clue: lastRequest.clue } as GuessType);
                        setGuesses(guesses);
                    }
                    setCurrentGuess(guess);
                } catch (e: any) {
                    setError(e);
                }
                return guess;
            },
            enabled: receivedInitialGuess,
        });


    const submitted = async () => {
        if (currentClue == "ggggg") {
            setFound(true);
            return;
        }

        setRequests((e) => {
            e.push({
                word: currentGuess,
                clue: currentClue
            });
            return e;
        });
        await refetch();
    }


    return (
        <>
            {isInitialLoading ?
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    p: 1,
                    m: 1,
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                }}>
                    <img src="loading.gif" width={100} />
                </Box>
                :
                <>
                    {guesses.length > 0 && guesses.map((e, i) => <Guess key={i} clue={guesses[i].clue} guessNumber={i + 1} guessState={guesses[i]}></Guess>)}
                    {<GuessForm key={guesses.length} onClueChanged={setCurrentClue} guessNumber={guesses.length + 1} guessState={{ word: currentGuess, clue: currentClue } as GuessType} />}
                    {found ?
                        <h1>Yay! All Done </h1>
                        : <Box sx={{
                            display: 'flex',
                            alignItems: 'flex-end',
                            flexDirection: 'column',
                            p: 1,
                            m: 1,
                            bgcolor: 'background.paper',
                            borderRadius: 1,
                        }}>
                            <Button disabled={fetchStatus == "fetching"} variant="contained" onClick={() => submitted()}>
                                {fetchStatus == "fetching" ? <img src="loading.gif" width={20} /> : "Submit"}
                            </Button>
                        </Box >
                    }
                    <ErrorView error={error} />
                </>}
        </>
    );
}

export default Guesses;