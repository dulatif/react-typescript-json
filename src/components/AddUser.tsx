import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { IFormUser } from '../interfaces/user'
import { createUser } from '../services/userRepo'


const AddUser: React.FC = () => {
  const navigate = useNavigate()

  const { handleSubmit , register } = useForm<IFormUser>({
    mode: "onChange",
    defaultValues: {
      name    : "",
      email   : "",
      phone   : "",
      website : "",
      username: "",
    }
  })

  const onSubmit = async(data: IFormUser) : Promise<any> => {
    try {
      let response = await createUser(data)
      if(response) navigate("/user")
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h4">Add New User</Typography>
      <Stack direction={'column'} spacing={2} sx={{minWidth: '500px'}}>
        <TextField placeholder='Type Name' label="Name" {...register('name')} />
        <TextField placeholder='Type Username' label="Username" {...register('username')} />
        <TextField placeholder='Type Email' label="Email" {...register('email')} />
        <TextField placeholder='Type Phone' label="Phone" {...register('phone')} />
        <TextField placeholder='Type Website' label="Website" {...register('website')} />
      </Stack>
      <Button type="submit" variant='contained'>submit</Button>
    </form>
  )
}

export default AddUser