import { FormControl, FormErrorMessage, FormLabel,Input } from '@chakra-ui/react'
import { Field, useField } from 'formik'
import React from 'react'


const TextField = ({label, ...props}: any) => {

    const [field, meta] = useField(props)
  return (
    <FormControl isInvalid={meta.touched && !!meta.error}>
        <FormLabel>{label}</FormLabel>
        <Input as={Field}  {...field} {...props}/>
        <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  )
}

export default TextField