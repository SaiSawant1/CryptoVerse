import {createApi,fetchBaseQuery}from "@reduxjs/toolkit/query/react"

const cryptoApiHeaders={
    'X-RapidAPI-Key': '2e25649266msh24d7974d5854e87p190ae5jsn4060b21626e6',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}
const baseUrl="https://coinranking1.p.rapidapi.com"

const createRequest=(url)=>({url,headers:cryptoApiHeaders})
export const cryptoApi=createApi({
    reducerPath:"cryptoApi",
    baseQuery:fetchBaseQuery({baseUrl}),
    endpoints:(builder)=>({
        getCryptos:builder.query({
            query:(count)=>createRequest(`/coins?limit=${count}`)
        }),
        getCryptosDatails:builder.query({
            query:(id)=>createRequest(`/coin/${id}`)
        }),
        getCryptoHistory: builder.query({
            query: ( coinId, timePeriod ) => createRequest(`coin/${coinId}/history?timeperiod=${timePeriod}`),
          }),
    })
})

export const {
    useGetCryptosQuery,useGetCryptosDatailsQuery,useGetCryptoHistoryQuery
} = cryptoApi