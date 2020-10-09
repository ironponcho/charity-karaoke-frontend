import { map, scan, filter } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { DataWithLoadingAndErrorState } from './processHttpResponse'
import { isDefined } from './isDefined'

type ResultWithCounter<R> = {
    counter: number
    result?: R
}

/**
 * Prevents processed http responses to emit on subsequent loading events
 * @returns Observable<{ data, error, loading }>
 */
export const silentlyReloadProcessedHttpResponse = <D>() => (
    source: Observable<DataWithLoadingAndErrorState<D>>
): Observable<DataWithLoadingAndErrorState<D>> =>
    source.pipe(
        scan<
            DataWithLoadingAndErrorState<D>,
            ResultWithCounter<DataWithLoadingAndErrorState<D>>
        >(
            (acc, result) => ({
                counter: acc.counter + 1,
                result,
            }),
            { counter: 0 }
        ),
        filter(({ counter, result }) => {
            if (result && result.error) {
                return true
            }

            if (counter > 1 && !result?.data) {
                return false
            }

            return true
        }),
        map((data) => data.result),
        filter(isDefined)
    )
