import { Container } from "@mui/material";
import Layout from "./components/Layout";
import Header from "./components/Header";
import Guesses from "./components/Guesses";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import './App.css'

function App() {
    const queryClient = new QueryClient();
    return (
        <Layout>
            <Container maxWidth="sm">
                <Header />
                <QueryClientProvider client={queryClient}>
                    <Guesses />
                </QueryClientProvider>
            </Container>
        </Layout>
    );
}

export default App;
