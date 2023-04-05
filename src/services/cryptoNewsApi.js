import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
const newsApiHeader={
        'X-BingApis-SDK': 'true',
      'X-RapidAPI-Key': '2e25649266msh24d7974d5854e87p190ae5jsn4060b21626e6',
      'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
}

const baseUrl="https://bing-news-search1.p.rapidapi.com"

const createRequest=(url)=>({url,headers:newsApiHeader})

export const cryptoNewsApi=createApi({
    reducerPath:"cryptoNewsApi",
    baseQuery:fetchBaseQuery({baseUrl}),
    endpoints:(builder)=>({
        getCryptoNews:builder.query({
            query:({newsCategory,count})=>createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
        })
    })
})

export const{
    useGetCryptoNewsQuery
}=cryptoNewsApi;