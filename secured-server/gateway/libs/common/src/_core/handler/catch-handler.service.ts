import { ActivityStatus } from '@isyss-cdm/enum';
import { CustomApiResponse } from '@isyss-cdm/exception';
import { IHandleAsyncOptions } from '@isyss-cdm/interface';
import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { apiMessage } from '../swagger/api-message.const';

@Injectable()
export class CatchHandlerService {
  private readonly logger = new Logger(CatchHandlerService.name);

  constructor(private readonly eventEmitter: EventEmitter2) {
    //
  }

  /**
   * A utility method to wrap async operations with standardized error handling,
   * success/failure activity logging, and optional event emission.
   *
   * @template T - The expected return type of the async function. Using T lets you preserve the extended structure in your type flow, which is ideal for DX (developer experience), future-proofing, and safety.
   * @param fn - The async function to execute.
   * @param options - Configuration for context, user, events, and custom handlers.
   * @returns The result of the async operation, possibly transformed by `onSuccess`.
   */
  async handleAsync<T>(
    fn: () => Promise<T>,
    {
      action,
      actorId,
      actorType,
      actorData,
      module,
      successEvent,
      failureEvent,
      onSuccess,
      onError,
      errorMessageCode = 'ACTLOG5000001',
      activityData = {},
    }: IHandleAsyncOptions<T>,
  ): Promise<T> {
    try {
      // Attempt to execute the provided async function
      const result = await fn();

      // If onSuccess handler is provided, use it to transform the result
      const finalResult = (onSuccess ? onSuccess(result) : result) as T;

      // Emit success event with contextual activity logging if applicable
      if (successEvent) {
        this.eventEmitter.emit(successEvent, {
          activity: {
            ...activityData,
            action,
            status: ActivityStatus.SUCCESS,
            actorType,
            actorId,
            actorNameSnapshot: actorData
              ? `${actorData.lastName}, ${actorData.firstName}`
              : null,
          },
        });
      }

      return finalResult;
    } catch (err: unknown) {
      // Extract error details for logging
      const message = err instanceof Error ? err.message : 'Unknown error';
      const stack = err instanceof Error ? err.stack : JSON.stringify(err);

      this.logger.error(`${action} Error: ${message}`, stack);

      // Emit failure event with contextual error activity if applicable
      if (failureEvent) {
        this.eventEmitter.emit(failureEvent, {
          activity: {
            ...activityData,
            action,
            status: ActivityStatus.FAILED,
            actorType,
            actorId,
            actorNameSnapshot: actorData
              ? `${actorData.lastName}, ${actorData.firstName}`
              : null,
            remarks: message,
          },
        });
      }

      // Allow a custom error handler to handle the error
      if (onError) return onError(err) as T;

      // Re-throw known system-level errors
      if (err instanceof CustomApiResponse) {
        throw err;
      }

      // Determine error code (function or string) and throw a wrapped response
      const key =
        typeof errorMessageCode === 'function'
          ? errorMessageCode(err)
          : errorMessageCode;

      throw new CustomApiResponse(apiMessage[key]);
    }
  }
}
