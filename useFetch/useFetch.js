import { useEffect } from "react";
import { useState } from "react";

const localCache = {}
export const useFetch = (url) => {
  const [state, setState] = useState({
    data: null,
    isLoading: true,
    hasError: false,
    error: null,
  });

  useEffect(() => {
    getFetch();
  }, [url]);

  const setLoadingState = ()=>{
    setState({
        datas: null,
        isLoading: true,
        hasError: false,
        error: null,
    });
  }

  const getFetch = async () => {

    if (localCache[url]) {
      console.log("Usando Cache")
      setState({
        data: localCache[url],
        isLoading: false,
        hasError: false,
        error: null,
      });
      
      return;
    }

    setLoadingState();

    const resp = await fetch(url);

    //sleep
    await new Promise(resolve=> setTimeout(resolve,1500))

    if (!resp.ok) {
      setState({
        data: null,
        isLoading: false,
        hasError: true,
        error: {
          code: resp.status,
          message: resp.statusText,
        },
      });
      return;
    }

    const data = await resp.json();
    setState({
      data: data,
      isLoading: false,
      hasError: false,
      error: null,
    });

    //MANEJO DEL CACHE
    localCache[url] = data;
  };

    return {
      data: state.data,
      isLoading: state.isLoading,
      hasError: state.hasError,
    };
};
