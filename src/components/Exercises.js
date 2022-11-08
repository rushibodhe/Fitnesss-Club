import React, {useState, useEffect} from 'react';
import  Pagination  from '@mui/material/Pagination';
import {exerciseOptions, fetchData} from '../utils/fetchData';
import { Box, Typography } from '@mui/material';
import { Stack } from '@mui/system'; 
import ExerciseCard from './ExerciseCard';

// exercises will be what we have searched in search exercises component.
// bodyPart means what we have clicked from the horizontalScrollBar component.
const Exercises = ({exercises, setExercises, bodyPart}) => {

  // console.log(exercises)
  const [currentPage, setCurrentPage] = useState(1);

  // method of showing only 9 pages:
  const exercisePerPage = 9;
  const indexOfLastExercise = currentPage * exercisePerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisePerPage;
  const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise);


  // Paginate also passes the value of currentPage on which we click.
  const paginate = (e, value)=>{
    setCurrentPage(value);
    window.scrollTo({top: 1800,  behavior:"smooth"  })
  }

  useEffect(() => {
    const fetchExercisesData  = async () => {
      let exercisesData = [];
      
      if (bodyPart === 'all') {
        exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);
      } else{
        exercisesData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, exerciseOptions );
      }
      setExercises(exercisesData);
      
    }
    fetchExercisesData();
    // eslint-disable-next-line
  },[bodyPart]) 

  return ( 
    <Box 
      id="exercises"
      sx = {{mt:{lg: '110px' }}} 
      mt = "50px"
      p = "20px"
    >
      <Typography variant="h3" mb = '46px'>
        Showing Results
      </Typography>

      <Stack
        direction = "row"
        sx={{gap: {lg: "110px", xs: "50px"}}}
        flexWrap = "wrap"
        justifyContent = "center">
          {currentExercises.map((exercise, index)=>  (
            <ExerciseCard key={index} exercise={exercise} />
          ))}
      </Stack> 

      <Stack mt="100px" alignItems="center">
            {exercises.length > 9 && (
              <Pagination
                color='standard'
                shape='round'
                defaultPage={1}
                count={Math.ceil(exercises.length/9)}
                page={currentPage}
                onChange={paginate}
                size = "large"
              />
            ) }
      </Stack>
    </Box>
  )
}

export default Exercises