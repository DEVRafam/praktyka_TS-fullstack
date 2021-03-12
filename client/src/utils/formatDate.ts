export default (date: string, style = "short"): string => {
    // eslint-disable-next-line
    const formatter = new Intl.DateTimeFormat("us", { dateStyle: style } as any);
    //
    return formatter.format(new Date(date)) as string;
};
