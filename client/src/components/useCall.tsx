import React, { EffectCallback, useEffect, useState } from 'react'
import axios from 'axios'

type FetchState<T> = {
    state: 'idle' | 'loading' | 'error' | 'success',
    data: null | T ;
    error: null | Error

}   

function useCall<T>(url : string) {
    const [fetchState, setFetchState] = useState<FetchState<T>>({
        state: 'idle',
        data:null,
        error:null
    })
    useEffect(() => {
        async function fetchData() {
            try {
                setFetchState(oldValue =>({
                    ...oldValue,
                    state:'loading'
                }));
                const response = await fetch(url)
                if(response.ok){
                    const json = await response.json();
                    
                    setFetchState({
                        data:json,
                        state: 'success',
                        error: null
                    })
                } else {
                    setFetchState({
                        data: null,
                        state:'error',
                        error: new Error(response.statusText)
                    })
                }
            } catch (error) {
                setFetchState({
                    data: null,
                    state:'error',
                    error: error as Error
                })
            }
        }
        fetchData()
    },[])
    return fetchState
}

export default useCall