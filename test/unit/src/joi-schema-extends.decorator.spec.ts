/* eslint-disable @typescript-eslint/no-unused-vars */

import { JoiSchemaExtends } from '../../../src';
import { EXTENDS_PROTO_KEY } from '../../../src/internal/defs';

describe('@JoiSchemaExtends()', () => {
  describe('arguments', () => {
    it('should accept (TypeClass)', () => {
      class type {}

      let error;
      try {
        @JoiSchemaExtends(type)
        class _test {
          prop!: string;
        }
      } catch (error_) {
        error = error_;
      }

      expect(error).toBeUndefined();
    });

    it('should reject (INVALID TypeClass)', () => {
      try {
        // @ts-ignore
        @JoiSchemaExtends('invalid')
        class _test {
          prop!: string;
        }
        throw new Error('should not be thrown');
      } catch (error) {
        expect((error as Error).message).toContain('Invalid arguments');
      }
    });

    it('should throw when redefining the parent class', () => {
      class type {}

      try {
        @JoiSchemaExtends(type)
        @JoiSchemaExtends(type)
        class _test {
          prop!: string;
        }
        throw new Error('should not be thrown');
      } catch (error) {
        expect((error as Error).message).toContain('Cannot redefine parent type');
      }
    });
  });

  it('should the parent class as metadata on the target', () => {
    class type {}

    @JoiSchemaExtends(type)
    class _test {
      prop!: string;
    }

    const meta = Reflect.getOwnMetadata(EXTENDS_PROTO_KEY, _test);
    expect(meta).toBe(type);
  });
});
