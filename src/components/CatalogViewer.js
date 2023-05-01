import React, { useState, useEffect} from 'react';
import { makeStyles } from '@mui/styles';
import { Card } from '@mui/material';
import { CardContent } from '@mui/material';
import { CardMedia } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    border: 'none',
  },
  flex:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  image: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
  thumbnailImage: {
    maxWidth: '100%',
    filter: 'grayscale(100%)',
    transition: 'all 0.3s ease',
    '&:hover': {
      filter: 'none',
    },
  },
  thumbnailImageSelected: {
    maxWidth: '100%',
    filter: 'none',
  },
  media: {
    width: '50%',
    border: '0px',
    borderRadius: '10px'
  },
  details: {
    width: '50%',
    border: 'none',
  },
  imgRow: {
    width: '100px',
    height: '100px',
    margin: '4px',
  }
}));

const images = [  
  {    
    id: 1,   
    src: 'https://via.placeholder.com/600x400?text=Image+1',    title: 'Image 1',    
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 
   },  
   {    
    id: 2,    
    src: 'https://via.placeholder.com/600x400?text=Image+2',    title: 'Image 2',    
    description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',  
  },  
  {    
    id: 3,    
    src: 'https://via.placeholder.com/600x400?text=Image+3',    title: 'Image 3',    
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',  
  },
];

const CatalogViewer = () => {
  const classes = useStyles();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleNextClick = () => {
    setCurrentIndex((currentIndex+1) % images.length);
  };

  const handlePreviousClick = () => {
    setCurrentIndex((currentIndex + images.length-1) % images.length);
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    let intervalId;
    if(isPlaying){
      intervalId=setInterval(()=>{
        setCurrentIndex((currentIndex+1) % images.length);
      }, 3000)
    } 

    return () => clearInterval(intervalId);
  }, [currentIndex, isPlaying]);


  return (
    <div className={classes.root}>
      <h1>Footley Assignment</h1>
      <p>I have developed the functionality like play and pause button, Next click, Previous click and thumbnail image change functionality is working thankyou for this opportunity.</p>
      <Card className={classes.flex}>
      <Card className={classes.media}>
      <CardMedia
          component="img"
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
        />
      </Card>
      <Card className={classes.details}>
      <CardContent>
          <Typography variant="h5" component="h2">
            {images[currentIndex].title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {images[currentIndex].description}
          </Typography>
        </CardContent>
      </Card>
    </Card>
      <Card className={classes.details}>
        <Button onClick={handlePreviousClick}><ChevronLeftIcon /></Button>
        {images.map((image, index) => {
          return(
              <img className={classes.imgRow} key={index} src={image?.src} onClick={() => handleThumbnailClick(index)} style={{ filter: index === currentIndex ? "none" : "grayscale(100%)" }} />
          )
        })}
        <Button onClick={handleNextClick}><ChevronRightIcon /></Button>
        <Button onClick={handlePlayPause}>{ isPlaying ? <PauseIcon /> : <PlayArrowIcon />}</Button>
      </Card>
    </div>
  )
}

export default CatalogViewer