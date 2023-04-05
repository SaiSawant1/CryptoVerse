import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Select,Typography,Row,Col,Avatar,Card } from 'antd'
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi'
import moment from 'moment/moment'
import Cryptocurrencies from './Cryptocurrencies'
import { useGetCryptosQuery } from '../services/cryptoApi'
const {Text,Title}=Typography
const {Option}=Select;

const News = ({simplified}) => {
  const {data}=useGetCryptosQuery(100);
  const [newsCategory,setNewsCategory]=useState("Cryptocurrency")
  const count=simplified? 7:13;  
  const {data:cryptoNews}=useGetCryptoNewsQuery({newsCategory,count});
 
  if(!cryptoNews?.value)  return "Loading..."
  
  const demoImage = 'https://media.istockphoto.com/id/1394911008/photo/high-tech-non-fungible-token-nfts.jpg?b=1&s=170667a&w=0&k=20&c=EOQVnKLZINc8KzQmF5W4-13RhGdXGTi7vMKvLWDbZMU=';
  return (
    <Row gutter={[24,24]}>
      {
        !simplified && (
          <Col span={24}>
            <Select
            showSearch
            className='select-news'
            placeholder="Select a news Crypto"
            optionFilterProp='children'
            onChange={(value)=>setNewsCategory(value)}
            filterOption={(input,option)=>option.children.toLowerCase().indexOF(input.toLowerCase())>=0}
            >
              <Option value="Cryptocurrency">Cryptocurrency</Option>
            {data?.data?.coins.map((coin)=>(
              <Option value={coin.name}>{coin.name}</Option>
            ))}
            </Select>
          </Col>
        )
      }
      {cryptoNews?.value.map((news,index)=>(
        <Col xs={24} sm={12} lg={8} key={index}>
          <Card
          hoverable 
          className='news-card'
          >
            <a href={news.url} target="_blank" rel="norefered">
              <div className='news-image-container'>
                <Title className='news-title' level={4}>
                  {news.name}
                </Title>
                <img style={{maxWidth:"200px",maxHeight:"100px"}} src={news?.image?.thumbnail?.contentUrl || demoImage}/>
              </div>
              <p>
                {news.description>100?`${news.description.substring(0,100)}...` : `${news.description}`}
              </p>
              <div className="provider-container">
                <div>
                <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage}/>
                <Text className='Provider-name'>{news.provider[0]?.name}</Text>
                </div>              
                <Text>{moment(news.datepublished).startOf("ss").fromNow()}</Text>              
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default News