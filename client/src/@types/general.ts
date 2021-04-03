export interface InputFile extends InputEvent {
    target: HTMLInputElement & {
        files: FileList;
    };
}
//
export interface Restriction {
    min: number;
    max: number;
}
