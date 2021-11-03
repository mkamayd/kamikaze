// This file contains an implementation of a TickPool class

import { ObservablePoint } from "@pixi/math";
import { Vector2D } from "./";

/**
Pool to manage the memory for vectors that are frequently
allocated and can be released on every tick of the main
game loop.

On every iteration (or tick) of the main loop,
the pool should be cleared by calling the `clear` method
to free the vectors of the pool to be reused on the
next iteration.
*/
export class VectorPool {
  /** Internal array to store the pool elements */
  private _pool: Vector2D[];
  /** Current number of active vectors */
  private _count = 0;

  /**
  Creates an instance of the VectorPool` class.
  @param initialPoolSize The initial internal size of the pool.
  */
  constructor(initialPoolSize = 0) {
    this._pool = new Array<Vector2D>(initialPoolSize);
    for (let i = 0; i < initialPoolSize; i++) {
      this._pool[i] = new Vector2D(0, 0, i);
    }
  }

  /**
  @returns The total number of allocated vectors
  i.e. the internal size of the pool.
  */
  get size() {
    return this._pool.length
  }

  /**
  @returns The number of active vectors in the pool
  */
  get count() {
    return this._count
  }

  /**
  Provides a vector, by either recycling an inactive
  one, or allocating one if there are no inactive
  vectors in the pool. The vector is initialized
  with the `x`, `y` parameters
  @returns The provided vector.
  @param x The value for the x component.
  @param y The value for the y component.
  */
  new(x = 0, y = 0) {
    this._count++
    if (this.size < this.count) {
      this._pool.push(new Vector2D(x, y, this.count - 1));
    }
    return this._pool[this.count - 1].set(x, y);
  }

  /**
  Provides a vector that's a clone of another.
  @param vector The vector to be cloned.
  @returns The cloned vector.
  */
  clone(vector: Vector2D) {
    return this.new().copy(vector);
  }

  /**
  Provides a vector from a given angle.
  @param angle The angle to initialize the vector from.
  @returns The provided vector.
  */
  fromAngle(angle: number) {
    return this.new().fromAngle(angle);
  }

  /**
  Provides a vector from an ObservablePoint.
  @param point The ObservablePoint to initialize the vector from.
  @returns The provided vector.
  */
  fromObservablePoint(point: ObservablePoint) {
    return this.new().fromObservablePoint(point);
  }

  /**
  Clear the entire pool. The `size` of the pool remains the same
  but the `count` is reset to 0.
  */
  clear() {
    this._count = 0;
  }

  clear_index(index:number) {
    if (index < 0 || index >= this._count){
      throw 'Index out of bound'
    }
    if (this._count == 0){
      throw 'Pool is already cleared'
    }
    if (index + 1 < this._count){
      this._pool[index]._pool_index = undefined
      this._pool[index] = this._pool[this._count-1]
      this._pool[index]._pool_index = index;
    }
    this._count--;
  }
}
