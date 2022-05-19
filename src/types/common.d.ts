type Arrayish<T = unknown> = ArrayLike<T>;
type Mapish<T = unknown> = { [key: string]: T };

export type Dictionary<T> = Mapish<T>;