import { useCallback, useEffect, useState } from 'react'
import debounce from 'lodash/debounce'

interface IAccumulatedProps {
  timeout: number,
  initialData?: Record<string, unknown>,
  action (attrs: any): any,
}

function useAccumulated (props: IAccumulatedProps) {
  const { action, timeout = 1000, initialData = {} } = props
  const [accumulatedChanges, setAccumulatedChanges] = useState<object|null>(null)
  const [fields, setFields] = useState(initialData)

  const debouncedAction = useCallback(debounce((action, ...params) => {
    action(...params)
    setAccumulatedChanges(null)
  }, timeout), [])

  useEffect(() => {
    if (accumulatedChanges !== null) {
      debouncedAction(action, accumulatedChanges)
    }
  }, [accumulatedChanges])

  const setField = useCallback((field: string, value: any) => {
    setAccumulatedChanges((prevAccumulatedChanges: object) => ({ ...prevAccumulatedChanges, [field]: value }))
    setFields((prevFields) => ({ ...prevFields, [field]: value }))
  }, [])

  return [fields, accumulatedChanges, setField]
}

export default useAccumulated
