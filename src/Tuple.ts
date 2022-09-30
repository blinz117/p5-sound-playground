// Taken from https://stackoverflow.com/a/71700658
export type Tuple<
  T,
  N extends number,
  R extends readonly T[] = [],
> = R['length'] extends N ? R : Tuple<T, N, readonly [T, ...R]>;

/*
My understanding of this is that it is a recursive type definition. Basically, it builds
up a set of types using a sort of "internal" tuple until the length of the tuple is equal
to N.

So, if I specify a type like:

Tuple<number, 3>

This actually creates the type:

Tuple<number, 3, []>

Since the tuple has length 0, that means that R['length'] does NOT extend N, since N is 3.
Thus, we then recurse to define the type by pre-pending the type T to R and going again.
So, we end up with the type being:

Tuple<number, 3, [number]>

Since the length of this new R is not equal to (i.e. does not extend) our N parameter, we
recurse again until it does, leading to:

Tuple<number, 3, [number, number]>
Tuple<number, 3, [number, number, number]>

And with that, the length of R equals/extends N. Thus, we define the type as the new R value,
which is [number, number, number]
*/