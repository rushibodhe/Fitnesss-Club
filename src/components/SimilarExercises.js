import React from 'react'
import {Box, Stack, Typography} from '@mui/material'
import HorizontalScrollbar from './HorizontalScrollbar';
import Loader from './Loader'; 

const SimilarExercises = ({targetMuscleExercises, equipmentExercises}) => {
  return (
    <Box sx={{mt:{lg:'70px', xs: '0' }}} p='20px'>    

    <Box mb='110px'>
      <Typography variant='h4' mb={5} fontWeight='600'>
        Exercises that target the same muscle group
      </Typography>

      <Stack direction='row' sx={{ position:'relative'}} flexWrap='wrap' 
        alignItems="center"  >
        {targetMuscleExercises.length ? <HorizontalScrollbar data = {targetMuscleExercises} />: <Loader /> }
      </Stack>
    </Box>

      

      <Typography variant='h4' mb={5} fontWeight='600'>
        Exercises that uses the same equipment.
      </Typography>

      <Stack direction='row' sx={{p:'2', position:'relative'}}>
        {equipmentExercises.length ? <HorizontalScrollbar data = {equipmentExercises} />: <Loader /> }
      </Stack>
    </Box>
  )
}

export default SimilarExercises