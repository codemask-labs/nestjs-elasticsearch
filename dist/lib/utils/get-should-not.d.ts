import { Document } from '../types';
import { MustNotQueryBody, ShouldQuery } from '../queries';
export type ShouldNotQuery<TDocument extends Document> = ShouldQuery<TDocument>;
export declare const getShouldNotQuery: <TDocument extends Document>(body: MustNotQueryBody<TDocument> | MustNotQueryBody<TDocument>[]) => ShouldNotQuery<TDocument>;
