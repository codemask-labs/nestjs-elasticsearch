import { ClassConstructor, Document } from '../types';
export declare const InjectIndex: <TDocument extends Document>(document: ClassConstructor<TDocument>) => PropertyDecorator & ParameterDecorator;
