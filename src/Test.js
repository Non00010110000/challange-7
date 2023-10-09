import React from "react"
import { Text,Textarea } from "@chakra-ui/react"

function Example() {
    let [value, setValue] = React.useState('')
  
    let handleInputChange = (e) => {
      let inputValue = e.target.value
      setValue(inputValue)
    }
    return (
      <>
        <Text mb='8px'>Value: {value}</Text>
        <Textarea
          value={value}
          onChange={handleInputChange}
          placeholder='Here is a sample placeholder'
          size='sm'
        />
      </>
    )
  }
  export default Example