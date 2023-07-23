import { Flex } from '@chakra-ui/react'


type DefaultLayoutProps = {
  children: React.ReactNode
}

const DefaultLayout = (props: DefaultLayoutProps) => {
  const { children } = props

  return (
    <Flex>
      {/* <Sidebar /> */}

      <Flex direction="column" width="100%">
        {/* <Header /> */}

        <Flex padding="8">{children}</Flex>
      </Flex>
    </Flex>
  )
}

export default DefaultLayout