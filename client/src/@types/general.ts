export interface InputFile extends InputEvent {
    target: HTMLInputElement & {
        files: FileList;
    };
}
