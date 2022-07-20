import { TabPanel, TabPanels, Text, VStack } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { FriendContext } from './Home'

const Chat = () => {
  const ctx = useContext(FriendContext)!
  if(ctx.friendList.length === 0) {
    return (
      <VStack justify="center" pt="5rem" w="100%" textAlign="center" fontSize="lg">
        <TabPanels>
            <Text>No friends added. Click to add friends</Text>
        </TabPanels>
    </VStack>
    )
  }
  return (
    <VStack>
        <TabPanels>
            <TabPanel>friend one</TabPanel>
            <TabPanel>friend two</TabPanel>
        </TabPanels>
    </VStack>
  )
}

export default Chat