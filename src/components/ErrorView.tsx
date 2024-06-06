
type ErrorViewProps = {
    error: Error | undefined;
};


const ErrorView = (props: ErrorViewProps) => {
    const { error } = props;
    return <>{error !== undefined && <p className="errorView">{(error as Error).message}</p>}</>
}

export default ErrorView;