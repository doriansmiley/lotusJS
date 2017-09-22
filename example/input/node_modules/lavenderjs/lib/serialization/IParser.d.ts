import { IResult } from "../control/responder/IResult";
/**
 * Created by dsmiley on 7/12/17.
 */
export interface IParser {
    parse(result: IResult): Object;
    canParse(): boolean;
}
