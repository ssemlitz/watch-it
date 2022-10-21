import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Box, useScrollTrigger } from '@mui/material'
import { Videos, ChannelCard } from './'
import { fetchFromAPI } from '../utils/fetchFromAPI'

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null)
  const [videos, setVideos] = useState([])
  
  const { id } = useParams()

  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`)
      .then((data) => setChannelDetail(data?.items[0]))
    
      fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`)
      .then((data) => setVideos(data?.items))
  }, [id])
  
  return (
    <Box minHeight='95vh'>
      <Box>
        <div style={{background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(121,9,100,1) 0%, rgba(96,52,133,1) 0%, rgba(95,54,135,1) 0%, rgba(43,140,200,1) 50%, rgba(0,212,255,1) 100%)',
        zIndex:10,
        height: '300px'  
      }}
        />
        <ChannelCard channelDetail={channelDetail} marginTop='-110px' />
      </Box>
      <Box display='flex' p='2'>
        <Box sx={{ mr: { sm: '100px' } }} />
          <Videos videos={videos} />
      </Box>
    </Box>
  )
}

export default ChannelDetail