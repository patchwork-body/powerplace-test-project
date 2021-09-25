import { Dispatch, SetStateAction, useEffect } from 'react';

type UsePowerPlaceApiParams<ResultType, RawApiType> = {
  resourceName: 'areas' | 'agenda';
  setStateActionDispatcher: Dispatch<SetStateAction<ResultType>>;
  middleware?: (data: RawApiType) => ResultType;
};

export function usePowerplaceApi<ResultType, RawApiResponseType = Record<string | number, any>>({
  resourceName,
  setStateActionDispatcher,
  middleware,
}: UsePowerPlaceApiParams<ResultType, RawApiResponseType>) {
  useEffect(() => {
    fetch(`https://dev.powerplace.online/api/v1/test/${resourceName}`)
      .then(response => response.json())
      .then(middleware)
      .then(setStateActionDispatcher);
  }, []);
}
