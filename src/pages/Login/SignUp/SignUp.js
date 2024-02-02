import React, { useEffect, useState } from 'react';
import {  Link, useNavigate } from 'react-router-dom';
// material-ui
import {
    Box,
    Button,
    Divider,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
    Card,
    Select,
    MenuItem,
  } from '@mui/material';
  // third party
import * as Yup from 'yup';
import { Formik } from 'formik';
// import AuthBackground from '../../../assets/images copy/auth/AuthBackground';

import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import FirebaseSocial from '../Login/FirebaseSocial';
import useAuth from '../../../hooks/useAuth';
import { strengthColor, strengthIndicator } from '../../../utils/password-strength';
import AuthBackground from '../../../utils/AuthBackground';


const SignUp = () => {
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
  } = useAuth();
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [checked, setChecked] = useState(false);
    const auth = getAuth();
    const navigate=useNavigate()
    // const location = useLocation();
    // const history = useHistory();
    // const redirect_url = location.state?.from || "/login";
    const [level, setLevel] = useState();
    const [photoURL, setPhotoURL] = useState("")
    const [name, setName] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [role, setRole] = useState(false);
    const [repetPassword, setRepetPassword] = useState("");
    const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
    };
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    const changePassword = (value) => {
      const temp = strengthIndicator(value);
      setLevel(strengthColor(temp));
    };
  
    useEffect(() => {
      changePassword('');
    }, []);
    const handleSubmits = (e) => {
      e.preventDefault();
      setError("");
      const emailValidation = /\S+@\S+\.\S+/.test(email);
    const passValidation = /(?=.{8,})/.test(password);
    if (emailValidation && passValidation) {
      console.log(name,
        email,
        password,);
        createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        setError("");
        // setUserName(userCredential);
        const newUser = { email, displayName: name };
        setUser(newUser);
        // save user to the database
        saveUser(email, name, photoURL, "POST");
        // send name to firebase after creation
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {})
          .catch((error) => {});
        // history.push(redirect_url);
          navigate('/login',{ replace: true })
      })
      .catch((err) => {
        const errorMessage = err.message;
        setError(errorMessage);
      });
    } else {
      setError("Please enter a valid email or password !");
    }
    };
    const saveUser = (email, displayName, photoURL,department,floor, method) => {
      const user = { email, displayName,department,floor, photoURL };
      fetch("https://dream-car-server.onrender.com/users", {
        method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
      });
    };
    


  return(
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
              <Typography variant="h3" color="#1e2a4f"fontWeight="bold"fontFamily="revert-layer">SIGN-UP</Typography>
              <Typography component={Link} to="/login" variant="body1" sx={{ textDecoration: 'none' }} >
                Already have an account?
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
                  maxHeight: { ys:700, lg:750},
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
          firstname: '',
          lastname: '',
          email: '',
          company: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          firstname: Yup.string().max(255).required('First Name is required'),
          lastname: Yup.string().max(255).required('Last Name is required'),
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            setStatus({ success: false });
            setSubmitting(false);
          } catch (err) {
            console.error(err);
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmits}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="firstname-signup">First Name*</InputLabel>
                  <OutlinedInput
                    id="firstname-login"
                    type="firstname"
                    value={values.firstname}
                    name="firstname"
                    onBlur={(e)=>{handleBlur(e)
                      setFname(e.target.value)}}
                    onChange={handleChange}
                    placeholder="John"
                    fullWidth
                    error={Boolean(touched.firstname && errors.firstname)}
                  />
                  {touched.firstname && errors.firstname && (
                    <FormHelperText error id="helper-text-firstname-signup">
                      {errors.firstname}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="lastname-signup">Last Name*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.lastname && errors.lastname)}
                    id="lastname-signup"
                    type="lastname"
                    value={values.lastname}
                    name="lastname"
                    onBlur={(e)=>{handleBlur(e)
                      setLname(e.target.value)
                      
                    }}
                    onChange={handleChange}
                    placeholder="Doe"
                    inputProps={{}}
                  />
                  {touched.lastname && errors.lastname && (
                    <FormHelperText error id="helper-text-lastname-signup">
                      {errors.lastname}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                <InputLabel htmlFor="select-department">Select Department*</InputLabel>
                <FormControl sx={{ m: 1, minWidth: 120 }} className='mt-2'>
                
              <InputLabel 
                id="demo-simple-select-helper-label">Department</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={values.department}
                label="Department"
                onChange={handleChange}
              >
                <MenuItem value={10}>Development</MenuItem>
                <MenuItem value={20}>Marketing</MenuItem>
                <MenuItem value={30}>Security</MenuItem>
                </Select>
                {touched.department && errors.department && (
                    <FormHelperText error id="helper-text-email-signup">
                      {errors.department}
                    </FormHelperText>
                  )}
              </FormControl>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                <InputLabel htmlFor="select-floor">Select Floor*</InputLabel>
                <FormControl sx={{ m: 1, minWidth: 120 }} className='mt-2'>
                
              <InputLabel 
                id="demo-simple-select-helper-label">Floor</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={values.floor}
                label="Department"
                onChange={handleChange}
              >
                <MenuItem value={10}>1st</MenuItem>
                <MenuItem value={20}>2nd</MenuItem>
                <MenuItem value={30}>3rd</MenuItem>
                <MenuItem value={40}>4th</MenuItem>
                <MenuItem value={50}>5th</MenuItem>
                <MenuItem value={60}>6th</MenuItem>
                <MenuItem value={70}>7th</MenuItem>
                <MenuItem value={80}>8th</MenuItem>
                <MenuItem value={90}>9th</MenuItem>
                <MenuItem value={100}>10th</MenuItem>
                <MenuItem value={110}>11th</MenuItem>
                </Select>
                {touched.department && errors.department && (
                    <FormHelperText error id="helper-text-email-signup">
                      {errors.department}
                    </FormHelperText>
                  )}
              </FormControl>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-signup">Email Address*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    id="email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={(e)=>{handleBlur(e)
                      setEmail(e.target.value)
                      setName(`${fname} ${lname}`)
                    }}
                    onChange={handleChange}
                    placeholder="demo@company.com"
                    inputProps={{}}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="helper-text-email-signup">
                      {errors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-signup">Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="password-signup"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={(e)=>{handleBlur(e)
                     
                    
                    }}
                    onChange={(e) => {
                      handleChange(e);
                      changePassword(e.target.value)
                      setPassword(e.target.value);
                      setPass(e.target.value)
                    }}
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
                    placeholder="******"
                    inputProps={{}}
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id="helper-text-password-signup">
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </FormControl>
              </Grid>
              {/* <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="Repeat-password-signup">Repeat Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="repeat-password-signup"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="rpassword"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      changePassword(e.target.value)
                      setRepetPassword(e.target.value);
                    }}
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
                    placeholder="******"
                    inputProps={{}}
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id="helper-text-password-signup">
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </FormControl>
              </Grid> */}
              <Grid item xs={12}>
                <Typography variant="body2">
                  By Signing up, you agree to our &nbsp;
                  <Link variant="subtitle2" to="#">
                    Terms of Service
                  </Link>
                  &nbsp; and &nbsp;
                  <Link variant="subtitle2" to="#">
                    Privacy Policy
                  </Link>
                </Typography>
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
                        Create Account
                      </Button>
                {/* </AnimateButton> */}
              </Grid>
              <Grid item xs={12}>
                <Divider>
                  <Typography variant="caption">Sign up with</Typography>
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
  )}

export default SignUp;