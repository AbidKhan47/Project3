'use client'

import { Box, Stack } from "@mui/material"

import {useState} from 'react'

export default function Home() {
  const[nessages, setMessages] = useState({
    role: 'assissant',
    content: 'Hello, who are you?'
  })

  const[message, setMessage] = useState('') 

  return <Box 
  
  width= "100vw" 
  hieght= "100vh" 
  display={flex} 
  flexdirection="column" 
  justifyContent="content" 
  alignItems={"center"}
  >
    <Stack 
    direction = "column"
    width={"600px"}
    hieght={"700px"}
    border={"1px solid black"}
    p={2}
    spacing={2}
    >
      <Stack 
      direction="column"
      spacing={2}
      flexGrow={1}
      overflow={"auto"}
      maxHeight="100%"
      >
        {
          messages.map((message, index) => {
            <Box key={index} display= 'flex' justifyContent={
              message.role === 'assistant' ? 'flex-start' : 'flex-end'
            }
            >
              <Box 
              bgcolor={
                message.role === 'assistant' ? 'primary.main' : 'secondary.main'
              }
              color={"white"}
              borderRadius={16}
              p={3}
              >
                {message.content}
              </Box>
            </Box>
          })
        }
      </Stack>
    </Stack>
  </Box>
}
