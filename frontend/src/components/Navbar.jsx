import React from 'react';
import { Container,Flex,Button,Text, HStack, useColorMode, useColorModeValue }  from "@chakra-ui/react"
import { CiSquarePlus , CiCloudMoon ,CiSun } from "react-icons/ci";
import {Link} from "react-router-dom"

const Navbar = () => {
const {colorMode,toggleColorMode} = useColorMode();

  return (
    <Container maxW={"1140px" } px={4} bg={useColorModeValue("gray.100","gray.900")}>
      <Flex 
      h={16}
      alignItems={"center"}
      justifyContent={"space-between"}
      flexDir={{
        base:"column",
        sm:"row"
      }}
      >

        <Text
					fontSize={{ base: "22", sm: "28" }}
					fontWeight={"bold"}
					textTransform={"uppercase"}
					textAlign={"center"}
					bgGradient={"linear(to-r, cyan.400, blue.500)"}
					bgClip={"text"}
				>
					<Link to={"/"}>Product Store 🛒</Link>
				</Text>


        <HStack spacing={2} alignItems={"center"}
        >
          <Link to={'/create'}>
          <Button>
            <CiSquarePlus />
            </Button></Link>
            <Button onClick={toggleColorMode}>
              {colorMode === "light"?<CiCloudMoon/>:<CiSun size="20"/> }

            </Button>
        </HStack>

      </Flex>
    </Container>
  );
}

export default Navbar;
