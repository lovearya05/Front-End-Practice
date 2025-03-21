// import React, { forwardRef, useImperativeHandle, useRef } from 'react'
// import { Button, Text, TextInput, View } from 'react-native';

// const CustomInput = forwardRef((props, ref) => {
//   const internalInputRef = useRef(null);
//   useImperativeHandle(ref,()=>({
//     focusInput: ()=>internalInputRef.current.focus(),
//     getInputValue: ()=> internalInputRef.current.value
//   }),[])

//   return(
//     <TextInput ref={internalInputRef} {...props} />
//   )
// });

// function UseImperativeHandling() {
//   const inputComponentRef = useRef(null);

//   return (
//     <View>
//       <CustomInput ref={inputComponentRef} />
//       <Button title='Click' onPress={()=>{
//         inputComponentRef.current.focusInput();
//         console.log(inputComponentRef.current.getInputValue());
//       }} />
//     </View>
//   )
// }

// export default UseImperativeHandling



import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Button, TextInput, Text, View } from 'react-native';

const CustomInput = forwardRef((props, ref) => {
  const internalInputRef = useRef(null);
  const [inputValue, setInputValue] = useState('Initial Value');

  // Using dependencies in useImperativeHandle
  useImperativeHandle(ref, () => ({
    focusInput: () => internalInputRef.current.focus(),
    getInputValue: () => inputValue,                // Expose dynamic value
    setInputValue: (val) => setInputValue(val)      // Allow parent to modify value
  }), [inputValue]);    // ✅ Recreates the methods if `inputValue` changes

  return (
    <TextInput
      ref={internalInputRef}
      value={inputValue}
      onChangeText={setInputValue}
      style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      {...props}
    />
  );
});

function UseImperativeExample() {
  const inputComponentRef = useRef(null);

  return (
    <View style={{ padding: 20 }}>
      <CustomInput ref={inputComponentRef} />

      <Button
        title="Focus & Get Value"
        onPress={() => {
          inputComponentRef.current.focusInput();
          console.log('Value:', inputComponentRef.current.getInputValue());
        }}
      />

      <Button
        title="Update Value"
        onPress={() => {
          inputComponentRef.current.setInputValue('Updated from Parent!');
        }}
      />
    </View>
  );
}

export default UseImperativeExample;
