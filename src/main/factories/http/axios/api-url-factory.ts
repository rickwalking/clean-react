export const makeApiUrl = (path: string): string => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return `${process.env.API_URL}${path}`;
};
