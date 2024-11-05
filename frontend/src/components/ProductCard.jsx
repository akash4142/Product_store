import { Box,Heading,Text,HStack,Button, IconButton, useColorModeValue ,Image,Input, useToast, useDisclosure,Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody,VStack, ModalFooter} from '@chakra-ui/react';
import { transform } from 'framer-motion';
import React, { useState } from 'react';
import { MdDelete ,MdEdit } from "react-icons/md";
import { useProductStore } from '../store.js/product';


const ProductCard = ({product}) => {

    const [updatedProduct , setUpdatedProduct] = useState(product);

    const textColor = useColorModeValue("gray.600","gray.200")
    const bg= useColorModeValue("white","gray.800");


    const {deleteProduct,updateProduct} = useProductStore()
    const toast = useToast();
    const {isOpen , onOpen , onClose }= useDisclosure()

    
    const handleUpdateProduct= async (pid,updatedProduct)=>{
        await updateProduct(pid,updatedProduct);
        onClose();
    }

    const handleDeleteProduct = async (pid)=>{
        const {success ,message} = await deleteProduct(pid);
        if(!success){
            toast({
                title:"Error",
                description:message,
                status:"error",
                duration:3000,
                isClosable:true,
            })
        }else{
            toast({
                title:"Success",
                description:message,
                status:"success",
                duration:3000,
                isClosable:true,
            })
            }
    }


  return (
    <Box
    shadow='lg'
    rounded='lg'
    overflow='hidden'
    transition='all 0.3s'
    _hover={{transform: "translateY(-spx)",shadow:"xl"}}
    bg={bg}
    >
        <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />
        <Box p={4}>
            <Heading as='h3' size='md' mb={2}>
                {product.name}
            </Heading>

            <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
                ${product.price}
            </Text>

            <HStack spacing={2}>
                <IconButton icon={<MdEdit />} 
               onClick={onOpen} colorScheme='blue'/>
                <IconButton icon={<MdDelete/>} onClick={()=> handleDeleteProduct(product._id)}  colorScheme='red'/>
            </HStack>
        </Box>
    

        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Update Product</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                <VStack spacing={4}>
          <Input
          placeholder='Product Name'
          name='name'
          value={updatedProduct.name}
          onChange={(e)=>setUpdatedProduct({...updatedProduct,name:e.target.value})}
          />
          <Input
          placeholder='Price'
          name='price' 
          value={updatedProduct.price}
          onChange={(e)=>setUpdatedProduct({...updatedProduct,price:e.target.value})}
          />

          <Input
          placeholder='Image URL'
          name='image'
          value={updatedProduct.image}
          onChange={(e)=>setUpdatedProduct({...updatedProduct,image:e.target.value})}
          />
        
        </VStack>
        </ModalBody>
        <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={()=>handleUpdateProduct(product._id,updatedProduct)}>Update</Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </ModalFooter>
            </ModalContent>

        </Modal>


    </Box>
  );
}

export default ProductCard;
