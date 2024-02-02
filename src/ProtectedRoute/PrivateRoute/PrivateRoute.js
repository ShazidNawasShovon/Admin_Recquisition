import React,{useState,useEffect} from "react";
import LinearProgress from '@mui/material/LinearProgress';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Navigate } from "react-router-dom";
import { Grid } from "@mui/material";





import useAuth from "../../hooks/useAuth";




const PrivateRoute = ({ children, ...rest }) => {
  const { user, isLoading } = useAuth();
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);
  if (isLoading) {
    return (
      <>

          <Grid alignItems="center" textAlign="center" className="d-flex mx-auto w-75 my-5 justify-content-center align-items-center container">
        <Grid>
        <LinearProgress variant="determinate" value={progress} />
        
        {/* <PulseLoader color="#36d7b7" /> */}
        </Grid>
        <Grid alignItems="center" alignSelf="center">
          <h1>Loading...</h1>
        </Grid>
      </Grid>
      {/* <CircularProgressWithLabel value={progress} /> */}
      </>
    
    );
  }
  return (
   
          user.email ? (
            children
        ) : (
          <Navigate to="/"/>
        )
      
   
  )
};

export default PrivateRoute;
