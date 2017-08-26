/**
 * Created by dsmiley on 7/12/17.
 */
export interface IExporter {
    export(): string;
    canExport(): boolean;
}
