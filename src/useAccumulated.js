import { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash/debounce';

export default function useAccumulated(props) {
  const { action, timeout = 1000, initialData = {} } = props;
  const [accumulatedChanges, setAccumulatedChanges] = useState(null);
  const [fields, setFields] = useState(initialData);

  const debouncedAction = useCallback(
    debounce((action, ...params) => {
      action(...params);
      setAccumulatedChanges(null);
    }, timeout),
    []
  );

  useEffect(() => {
    if (accumulatedChanges !== null) {
      debouncedAction(action, accumulatedChanges);
    }
  }, [accumulatedChanges]);

  const setField = useCallback((field, value) => {
    setAccumulatedChanges((prevAccumulatedChanges) => ({
      ...prevAccumulatedChanges,
      [field]: value,
    }));
    setFields((prevFields) => ({ ...prevFields, [field]: value }));
  }, []);

  return [fields, accumulatedChanges, setField];
}
