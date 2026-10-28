
import { ApiError } from './api-error'
import { NetworkError } from './network-error'
import { ApiParseError } from './api-parse-error'
import { ApiValidationError } from './api-validation-error'

export function handleApiError(err: unknown) {
  if (err instanceof ApiError) {
    console.error('HTTP Error:', err.message)
  } else if (err instanceof NetworkError) {
    console.error('Network Error:', err.message)
  } else if (err instanceof ApiParseError) {
    console.error('Parse Error:', err.message)
  } else if (err instanceof ApiValidationError) {
    console.error('Validation Error:', err.message)
  } else {
    console.error('Unknown Error:', err)
  }
}
