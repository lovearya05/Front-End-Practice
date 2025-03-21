import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { Button, Text, TextInput, View } from 'react-native';

const CustomInput = forwardRef((props, ref) => {
  const internalInputRef = useRef(null);
  useImperativeHandle(ref,()=>({
    focusInput: ()=>internalInputRef.current.focus(),
    getInputValue: ()=> internalInputRef.current.value
  }),[])

  return(
    <TextInput ref={internalInputRef} {...props} />
  )
});

function UseImperativeHandling() {
  const inputComponentRef = useRef(null);

  return (
    <View>
      <CustomInput ref={inputComponentRef} />
      <Button title='Click' onPress={()=>{
        inputComponentRef.current.focusInput();
        console.log(inputComponentRef.current.getInputValue());
      }} />
    </View>
  )
}

export default UseImperativeHandling
