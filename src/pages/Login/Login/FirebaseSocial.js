// material-ui
import { useTheme } from '@mui/material/styles';
import { useMediaQuery, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// assets
import { useEffect } from 'react';
import { data } from 'autoprefixer';
 import Google from "../../../social_icons/google.svg";
import Twitter from "../../../social_icons/twitter.svg";
import Facebook from "../../../social_icons/facebook.svg";



 

import useAuth from '../../../hooks/useAuth';


// ==============================|| FIREBASE - SOCIAL BUTTON ||============================== //

const FirebaseSocial = () => {
  const navigate=useNavigate()
  //  const history = useHistory();
  //  const location = useLocation();
  //  const redirect_url = location.state?.from || "/form";
 
   
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  const {
    handlePassword,
    handleEmail,
    handleResetPassword,
    signInWithGoogle,
    handleNameChange,
    toggleLogin,
    isLogin,
    setError,
    setUser,
    error,
    email,
    pass,
    user,
    name,
  } = useAuth();
  const saveUser = (email, displayName, photoURL, method) => {
    const user = { email, displayName, photoURL };
    fetch("https://dream-car-server.onrender.com/users", {
      method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
  };
  //  if(user){
     
  // }
   
    // Handle Google Sign in or sign up
   
    const googleHandler = async () => {
     
    
      try {
        const result = await signInWithGoogle();
        setUser(result.user);
        saveUser(result.user.email, result.user.displayName, result.user.photoURL, "PUT");
        // history.push(redirect_url);
        navigate("/dashboard/app",{ replace: true })
      } catch (error) {
        const errorMessage = error.message;
        setError(errorMessage);
      }
    };
  // useEffect(() => {
  //   if (user) {
  //     navigate("/dashboard/books");
  //   }
  // }, [data, navigate]);

  const twitterHandler = async () => {
    // login || singup
  };

  const facebookHandler = async () => {
    // login || singup
  };

  return (
    <Stack
      direction="row"
      spacing={matchDownSM ? 1 : 2}
      justifyContent={matchDownSM ? 'space-around' : 'space-between'}
      sx={{ '& .MuiButton-startIcon': { mr: matchDownSM ? 0 : 1, ml: matchDownSM ? 0 : -0.5 } }}
    >
      
      <Button
        variant="outlined"
        color="primary"
        fullWidth={!matchDownSM}
        startIcon={<img src={Twitter} alt="Twitter" />}
        onClick={twitterHandler}
      >
        {!matchDownSM && 'Twitter'}
      </Button>
      <Button
      
        variant="outlined"
        color="primary"
        fullWidth={!matchDownSM}
        startIcon={<img src={Google} alt="Google" />}
         onClick={googleHandler}
      >
        {!matchDownSM && 'Google'}
      </Button>
      <Button
        variant="outlined"
        color="primary"
        fullWidth={!matchDownSM}
        startIcon={<img src={Facebook} alt="Facebook" />}
        onClick={facebookHandler}
      >
        {!matchDownSM && 'Facebook'}
      </Button>
    </Stack>
  );
};

export default FirebaseSocial;
