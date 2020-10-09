import { Observable } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { DataWithLoadingAndErrorState, processHttpResponse } from './processHttpResponse'
import { silentlyReloadProcessedHttpResponse } from './silentlyReloadProcessedHttpResponse'

interface FromHttpResponseOptions<TResultValue> {
    silentReload?: boolean
}

export const fromHttpResponse = <TSourceValue, TResultValue>(
    fn: (arg: TSourceValue) => Observable<TResultValue>,
    options?: FromHttpResponseOptions<TResultValue>
) => (
    source: Observable<TSourceValue>
): Observable<DataWithLoadingAndErrorState<TResultValue>> =>
    options?.silentReload
        ? source.pipe(
              switchMap((arg) => fn(arg).pipe(processHttpResponse())),
              silentlyReloadProcessedHttpResponse()
          )
        : source.pipe(switchMap((arg) => fn(arg).pipe(processHttpResponse())))
