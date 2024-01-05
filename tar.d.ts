import * as stream from 'stream';

export interface FileOptions {
    /**
     * Uses the given file as the input or output of this function.
     */
    file?: string | undefined;

    /**
     * Alias for file.
     */
    f?: string | undefined;
}

export interface ExtractOptions {
    type?: string | undefined;
    Directory?: boolean | undefined;
    path?: string | undefined;
    strip?: number | undefined;
}

export function extract(
    options: ExtractOptions,
    fileList?: readonly string[],
    callback?: (err?: Error) => void,
): stream.Writable;
export function extract(options: ExtractOptions & FileOptions, fileList?: readonly string[]): Promise<void>;
export function extract(options: ExtractOptions & FileOptions & { sync: true }, fileList?: readonly string[]): void;
export function extract(
    options: ExtractOptions & FileOptions,
    fileList: readonly string[] | undefined,
    callback: (err?: Error) => void,
): void;