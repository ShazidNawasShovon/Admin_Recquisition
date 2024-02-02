import { Box, Button, Checkbox, Divider, FormControlLabel, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
// import AuthBackground from '../../../assets/images copy/auth/AuthBackground';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import FirebaseSocial from './FirebaseSocial';
// import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import useAuth from '../../../hooks/useAuth';
import AuthBackground from '../../../utils/AuthBackground';


// import { useHistory, useLocation } from "react-router";
const Login = () => {
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
        setEmail,
        setPass,
        error,
        email,
        pass,
        user,
        name,
      } = useAuth();
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [checked, setChecked] = useState(false);
    const auth = getAuth();
    // const location = useLocation();
    // const history = useHistory();
    // const redirect_url = location.state?.from || "/login";
      const navigate = useNavigate();
     //   --------------------//
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmits = (e) => {
    e.preventDefault();
    setError("");
    console.log(auth, email, password);
    const emailValidation = /\S+@\S+\.\S+/.test(email);
    const passValidation = /(?=.{8,})/.test(password);
    if (emailValidation && passValidation) {
        signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setError("");
        // const destination = location.state?.from || "/form";
        // history.push(destination);
        navigate('/dashboard/app',{ replace: true })
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
    } else {
      setError("Please enter a valid email or password !");
    }
  };

    return (
        <>
    
    
        <Grid container spacing={3}>
          
          <Grid item xs={12}>
          <Box sx={{ minHeight: '100vh' }}>
        <AuthBackground />
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{
            minHeight: '100vh'
          }}
        >
          
          <Grid item xs={12} sx={{ ml: 3, mt: 3 }}>
            {/* <Logo /> */}
    
          </Grid>
          <Grid item xs={6}
          borderRadius={3}
          boxShadow={10}
          marginX="auto"
          >
          <Stack direction="row" justifyContent="space-between" marginX="1.5em" marginY="1em"alignItems="center" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
              <Typography variant="h3" color="#1e2a4f"fontWeight="bold"fontFamily="revert-layer">LOGIN</Typography>
              <Typography variant="body1" sx={{ textDecoration: 'none' }} >
                Don&apos;t have an account? {''}
              <Link variant="subtitle2" to="/signup">Get started</Link>
              </Typography>
            </Stack>
            <Grid
              item
              xs={12}
              container
              justifyContent="center"
              
              
               alignItems="center"
              
              // alignContent="center"
              marginX="auto"
              
            >
              
              <Grid item 
              marginTop={0}
              borderRadius={5}
              // boxShadow={10}
              
                sx={{
                  maxWidth: { xs: 400, lg: 475 },
                  maxHeight: { ys:500, lg:575},
                  margin: { xs: 2.5, md: 3 },
                  '& > *': {
                    flexGrow: 1,
                    flexBasis: '50%'
                  }
                }}
               
                
              
              >
              <Box sx={{ p: { xs: 2, sm: 3, md: 4, xl: 5 } }}>
                <Formik
            initialValues={{
              email: 'info@codedthemes.com',
              password: '123456',
              submit: null
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
              password: Yup.string().max(255).required('Password is required')
            })}
            
          >
            {({ errors, handleBlur,handleChange,  handleSubmit, isSubmitting, touched, values }) => (
                
              <form noValidate onSubmit={handleSubmits}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="email-login">Email Address</InputLabel>
                      <OutlinedInput
                        id="email-login"
                        type="email"
                        value={values.email}
                        name="email"
                        onBlur={(e)=>setEmail(e.target.value)}
                        onChange={handleChange}
                        placeholder="Enter email address"
                        fullWidth
                        error={Boolean(touched.email && errors.email)}
                      />
                      {touched.email && errors.email && (
                        <FormHelperText error id="standard-weight-helper-text-email-login">
                          {errors.email}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="password-login">Password</InputLabel>
                      <OutlinedInput
                        fullWidth
                        error={Boolean(touched.password && errors.password)}
                        id="-password-login"
                        type={showPassword ? 'text' : 'password'}
                        value={values.password}
                        name="password"
                        onBlur={(e)=>setPassword(e.target.value)}
                        onChange={handleChange}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                              size="large"
                            >
                              {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                            </IconButton>
                          </InputAdornment>
                        }
                        placeholder="Enter password"
                      />
                      {touched.password && errors.password && (
                        <FormHelperText error id="standard-weight-helper-text-password-login">
                          {errors.password}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
    
                  <Grid item xs={12} sx={{ mt: -1 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={checked}
                            onChange={(event) => setChecked(event.target.checked)}
                            name="checked"
                            color="primary"
                            size="small"
                          />
                        }
                        label={<Typography variant="h6">Keep me sign in</Typography>}
                      />
                      <Link variant="h6" component={Link} to="/" color="text.primary">
                        Forgot Password?
                      </Link>
                    </Stack>
                  </Grid>
                  {errors.submit && (
                    <Grid item xs={12}>
                      <FormHelperText error>{errors.submit}</FormHelperText>
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    {/* <AnimateButton> */}
                    
                      <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained"
                      sx={{background:"#1e2a4f",}}
                      >
                        Login
                      </Button>
                    {/* </AnimateButton> */}
                  </Grid>
                  <Grid item xs={12}>
                    <Divider>
                      <Typography variant="caption" > Login with</Typography>
                    </Divider>
                  </Grid>
                  <Grid item xs={12}>
                    <FirebaseSocial />
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
          </Box>
              </Grid>
            </Grid>
          </Grid>
          
        </Grid>
      </Box>
          </Grid>
        </Grid>
          
      
        
           
          
        </>
    );
};

export default Login;