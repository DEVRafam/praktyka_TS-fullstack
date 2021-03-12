export default (date: string, style = "short"): string => {
    const formatter = new Intl.DateTimeFormat("us", { dateStyle: style } as any);
    //
    return formatter.format(new Date(date)) as string;
};
