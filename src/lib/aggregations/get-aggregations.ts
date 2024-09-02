import { ClassConstructor, Document } from 'lib/common'
import { AggregationsContainer } from './types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type InstanceTypeFromUnion<T> = T extends new (...args: Array<any>) => infer R ? R : never

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MergeClasses<T extends Array<any>> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [K in keyof T]: T[K] extends new (...args: Array<any>) => infer R ? R : never
}[number]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MergeInstances<T extends Array<any>> = T extends [infer U, ...infer R]
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      U extends new (...args: Array<any>) => infer InstanceType
        ? InstanceType & MergeInstances<R>
        : never
    : // eslint-disable-next-line @typescript-eslint/ban-types
      unknown

type UnionToTupleHelper<T, R extends Array<any> = []> = T extends T ? UnionToTupleHelper<Exclude<T, T>, [T, ...R]> : R

// oh boy don't do this
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never
type LastOf<T> = UnionToIntersection<T extends any ? () => T : never> extends () => infer R ? R : never

// TS4.0+
type Push<T extends Array<any>, V> = [...T, V]

// TS4.1+
type TuplifyUnion<T, L = LastOf<T>, N = [T] extends [never] ? true : false> = true extends N ? [] : Push<TuplifyUnion<Exclude<T, L>>, L>

export const getAggregations = <TDocument extends ClassConstructor<Document>, TAggregationsBody extends AggregationsContainer<TDocument>>(
    _document: TDocument,
    aggregations: TAggregationsBody
) => aggregations as unknown as MergeInstances<TuplifyUnion<TDocument>>
