import { TextArea, TextField, Button, TextFieldInput } from '@radix-ui/themes'
import React from 'react'

const NewIssuePage = () => {
  return (
    <div className='max-w-xl space-y-3'>
        <TextFieldInput placeholder='Title'></TextFieldInput>
        <TextArea placeholder='Description' />
        <Button>Submit New Issue</Button>
    </div>
  )
}

export default NewIssuePage