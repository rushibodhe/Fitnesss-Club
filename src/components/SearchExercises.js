import { Box, Button, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { exerciseOptions, fetchData } from '../utils/fetchData';
import HorizontalScrollbar from './HorizontalScrollbar';

// bodyPart, setBodyPart this 2 props are used by HorizontalScrollbar component.
const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState('');
  const [bodyParts, setBodyParts] = useState([]);

  useEffect(() => {
    const fetchExercisesData = async () => {
      const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions);
      setBodyParts(['all', ...bodyPartsData])
    }

    fetchExercisesData();
  }, [])


  const handleSearch = async () => {
    if (search) {
      const exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);
      // console.log(exercisesData);

      const searchedExercises = exercisesData.filter(
        (exercise) => exercise.name.toLowerCase().includes(search)
          || exercise.target.toLowerCase().includes(search)
          || exercise.equipment.toLowerCase().includes(search)
          || exercise.bodyPart.toLowerCase().includes(search)
      )

      setSearch(''); // clearing the search bar after searching is done
      setExercises(searchedExercises);

    }
  }
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      mt="37px"
      p="20px">

      <Typography
        fontWeight='700'
        sx={{ fontSize: { lg: '44px', xs: '30px' } }}
        mb='50px'
        textAlign="center">
        Awesome Exercises You <br />Should Know
      </Typography>

      <Box position="relative" mb="72px">
        <TextField
          sx={{
            input: {
              fontWeight: '700',
              border: 'none',
              borderRadius: '4px'
            },
            width: { lg: '800px', xs: '350px' },
            backgroundColor: '#fff',
            borderRadius: '40px'
          }}
          height="76px"
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          placeholder="Search Exercises"
          type="text"
        />

        <Button
          className='search-btn'
          sx={{
            bgcolor: '#FF2625',
            color: '#fff',
            textTransform: 'none', // To avoid being capital
            height: '56px',
            width: { lg: '175px', xs: '80px' },
            fontSize: { lg: '20px', xs: '14px' },
            position: 'absolute',  // this will put the button on right of the textfield
            right: '0' // this will keep the button inside the dimensions of box
          }}

          onClick={handleSearch}>
          Search
        </Button>
      </Box>
      
      <Box sx={{ position: 'relative', width: '100%', p: '20px' }}>
        <HorizontalScrollbar
          data={bodyParts}
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}
          isBodyParts  
        />
        {/* additional prop so that we will know when to display horizontal scrollbar for bodyparts and when to display horizontal scrollbar for exercises. */}
      </Box>

    </Stack>
  )
}

export default SearchExercises