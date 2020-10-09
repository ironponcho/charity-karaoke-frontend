import { catchError, startWith, map } from 'rxjs/operators'
import { of, Observable } from 'rxjs'

export type DataWithLoadingAndErrorState<D> = {
    data: D | null
    error: Error | string | null
    loading: boolean
}

/**
 * Wraps http response data into an object with error and loading state.
 * Emits a loading state once and then the data or error as soon as the response observable emits.
 * @returns Observable<{ data, error, loading }>
 */
export const processHttpResponse = <D>() => (
    source: Observable<D>
): Observable<DataWithLoadingAndErrorState<D>> =>
    source.pipe(
        map((data) => ({
            data: data || null,
            error: null,
            loading: false,
        })),
        catchError((error) =>
            of({
                data: null,
                error,
                loading: false,
            })
        ),
        startWith({ data: null, error: null, loading: true })
    )
