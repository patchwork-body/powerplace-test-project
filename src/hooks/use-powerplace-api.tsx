import { Dispatch, SetStateAction, useEffect } from 'react';
import { AgendaItem } from '../ui/agenda-list/AgendaList';

type UsePowerPlaceApiParams<ResultType, RawApiType = Record<string | number, AgendaItem[]>> = {
  resourceName: 'areas' | 'agenda';
  setStateActionDispatcher: Dispatch<SetStateAction<ResultType>>;
  middleware?: (data: RawApiType) => ResultType;
};

export function usePowerplaceApi<T>({ resourceName, setStateActionDispatcher, middleware }: UsePowerPlaceApiParams<T>) {
  useEffect(() => {
    fetch(`https://dev.powerplace.online/api/v1/test/${resourceName}`)
      .then(response => response.json())
      .then(middleware)
      .then(setStateActionDispatcher);
  }, [resourceName, setStateActionDispatcher, middleware]);
}
