export const DELETABLE_KEY = 'deletable:order';

/**
 * Mark a service as deletable with a given execution order.
 * Lower order values are executed first.
 */
export function Deletable(order: number): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata(DELETABLE_KEY, order, target);
  };
}
