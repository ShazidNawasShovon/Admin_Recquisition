import React, { useEffect, useState } from 'react';
import { Link, Link as RouterLink} from 'react-router-dom';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
// import CloudUploadIcon from '@material-ui/icons/CloudUpload';
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
    TextareaAutosize,
    Select,
    MenuItem,
    TextField,
    Paper,
    SvgIcon,
  } from '@mui/material';
 

  // third party
import * as Yup from 'yup';
import { Formik } from 'formik';
// import AuthBackground from '../../assets/images copy/auth/AuthBackground';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


// const useStyles = makeStyles((theme) => ({
//   container: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '100vh',
//     background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.main} 100%)`,
//   },
//   uploadButton: {
//     margin: theme.spacing(2),
//   },
// }));

const Form = () => {
  // const classes = useStyles();
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [error,setError]=useState("")
    const [summary, setSummary] = useState("");
   
    const [level, setLevel] = useState();
    const [photoURL, setPhotoURL] = useState("")
    const [selectedImage, setSelectedImage] = useState(null);

    const [department, setDepartment] = useState("");
    const [date, setDate] = useState(dayjs());
    const [name, setName] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [description, setDescription] = useState("");
    const [role, setRole] = useState(false);
    const [repetPassword, setRepetPassword] = useState("");
    
    const styles = {
      root: {
        flexGrow: 1,
      },
      paper: {
        padding: '8px',
        textAlign: 'center',
        color: 'rgba(0, 0, 0, 0.54)',
      },
      svgIcon: {
        width: '100%',
        height: '100%',
      },
    };
    const imagePreviewStyle = {
      width: '100%',
      height: 'auto',
    };
  
    const fileInputStyle = {
      display: 'none',
    };
    
    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      // Perform validation or additional logic here if needed
      setSelectedImage(URL.createObjectURL(file));
    };
  
    const handleRemoveImage = () => {
      setSelectedImage(null);
    };
    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      // handle file upload logic here
    };
    
    const handleSubmits = (e) => {
        e.preventDefault();
        setError("");
        const emailValidation = /\S+@\S+\.\S+/.test(email);
      const passValidation = /(?=.{8,})/.test(password);
      if (emailValidation && passValidation) {
        console.log(name,
        
          password,);
         
      };}
    return (
        <>
       <Grid container spacing={3}>
          
          <Grid item xs={12} >
          <Box sx={{ minHeight: '100vh' }}  >
        {/* <AuthBackground /> */}
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
          bgcolor='whitesmoke'
          >
          <Stack direction="row" justifyContent="center" marginX="1.5em" marginY="1em"alignItems="center" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
              <Typography variant="h3" color="#1e2a4f"fontWeight="bold"fontFamily="revert-layer">Requisition Form</Typography>
              {/* <Typography component={Link} to="/login" variant="body1" sx={{ textDecoration: 'none' }} color="primary">
                Already have an account?
              </Typography> */}
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
                  maxWidth: { xs: 600, lg: 675 },
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
          description: Yup.string().min(20).required('description is required'),
          department: Yup.string().max(255).required('department is required'),
          summary: Yup.string().min(20).max(255).required('summary is required')
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
            
              {/* <Grid item xs={12} md={6}>
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
              </Grid> */}
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="select-date">Select Date</InputLabel>
                  <LocalizationProvider dateAdapter={AdapterDayjs}components={[ 'DatePicker']}>
                  {/* <DemoContainer components={[ 'DatePicker']}> */}
        
                  <DatePicker
                    label="Date"
                    value={values.date}
                    onChange={(newValue) => setDate(newValue)}
                    />
                  {/* </DemoContainer> */}
                  </LocalizationProvider>
                  {touched.date && errors.date && (
                    <FormHelperText error id="helper-text-email-signup">
                      {errors.date}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              {/* <Grid item xs={12} md={6}>
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
              </Grid> */}
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                <InputLabel htmlFor="select-date">Select Subject*</InputLabel>
                <FormControl sx={{ m: 1, minWidth: 120 }} className='mt-2'>
                
              <InputLabel 
                id="demo-simple-select-helper-label">Subject</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={values.department}
                label="Department"
                onChange={handleChange}
              >
                <MenuItem value={10}>Farniture</MenuItem>
                <MenuItem value={20}>Electronic</MenuItem>
                <MenuItem value={30}>Security</MenuItem>
                <MenuItem value={40}>Others</MenuItem>
                </Select>
                {touched.department && errors.department && (
                    <FormHelperText error id="helper-text-email-signup">
                      {errors.department}
                    </FormHelperText>
                  )}
              </FormControl>
                </Stack>
              </Grid>
             
              {/* <Grid item xs={12}>
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
              </Grid> */}
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="summary">Summary</InputLabel>
                  <TextField
                    
                    label="Summary"
                    fullWidth
                    multiline
                    maxRows={4}
                    error={Boolean(touched.summery && errors.summery)}
                    id="summery"
                    type="textArea"
                    value={values.textArea}
                    name="summery"
                    onBlur={(e)=>{handleBlur(e)
                      setSummary(e.target.value)
                      
                    }}
                    onChange={handleChange}
                    placeholder="Short Summary"
                    inputProps={{}}
                  />
                  {touched.summary && errors.summary && (
                    <FormHelperText error id="helper-text-summary">
                      {errors.summary}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="description">Write Your Problems</InputLabel>
                  <TextField
                    
                    label="Description"
                    fullWidth
                    multiline
                    maxRows={4}
                    error={Boolean(touched.description && errors.description)}
                    id="description"
                    type="textArea"
                    value={values.textArea}
                    name="description"
                    onBlur={(e)=>{handleBlur(e)
                      setDescription(e.target.value)
                      
                    }}
                    onChange={handleChange}
                    placeholder="Describe your problem"
                    inputProps={{}}
                  />
                  {touched.description && errors.description && (
                    <FormHelperText error id="helper-text-description">
                      {errors.description}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="image">Upload an Image</InputLabel>
                  <div style={styles.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper style={styles.paper}>
          
            <Box display="flex" alignItems="center" justifyContent="center">
            
              <Box width="200px" height="200px">
                <SvgIcon viewBox="0 0 480 360" style={styles.svgIcon}>
                <defs><linearGradient id="BG" x1="19.496%" x2="77.479%" y1="71.822%" y2="16.69%"><stop offset="0%" stopColor="#2065D1" /><stop offset="100%" stopColor="#2065D1" stopOpacity="0" /></linearGradient></defs><path fill="url(#BG)" fillRule="nonzero" d="M0 198.78c0 41.458 14.945 79.236 39.539 107.786 28.214 32.765 69.128 53.365 114.734 53.434a148.44 148.44 0 0056.495-11.036c9.051-3.699 19.182-3.274 27.948 1.107a75.779 75.779 0 0033.957 8.01c5.023 0 9.942-.494 14.7-1.433 13.58-2.67 25.94-8.99 36.09-17.94 6.378-5.627 14.547-8.456 22.897-8.446h.142c27.589 0 53.215-8.732 74.492-23.696 19.021-13.36 34.554-31.696 44.904-53.224C474.92 234.58 480 213.388 480 190.958c0-76.93-59.774-139.305-133.498-139.305-7.516 0-14.88.663-22.063 1.899C305.418 21.42 271.355 0 232.499 0a103.651 103.651 0 00-45.88 10.661c-13.24 6.487-25.011 15.705-34.64 26.939-32.698.544-62.931 11.69-87.676 30.291C25.351 97.155 0 144.882 0 198.781z" opacity="0.2" /><defs><linearGradient id="linearGradient-2" x1="30.113%" x2="30.113%" y1="0%" y2="100%"><stop offset="0%" stopOpacity="0" /><stop offset="100%" /></linearGradient></defs><path fill="#FF4842" fillRule="nonzero" d="M293.006 206.192c-2.248 2.672-4.676 2.628-6.123 2.251l.054-1.384s5.979-2.733 5.827-2.159c-.057.215.057.733.242 1.292zM309.393 209.217c-3.818 2.206-6.058-.38-6.578-1.112.32-.84.801-2.204.703-2.592-.144-.577 5.827 2.155 5.827 2.155l.048 1.549zM305.303 187.204s3.632-2.093 4.425-1.151c.792.942-4.425 1.151-4.425 1.151zM307.497 188.355s-.598.299.721.681c1.318.383-.721-.681-.721-.681zM285.532 182.599c-.123.036 3.022 2.123 5.862.395-.012 0-5.154-.61-5.862-.395zM291.239 186.591s-.861 1.692-2.625 1.943c-1.764.251 2.625-1.943 2.625-1.943zM302.785 190.262s4.138 6.578 3.346 8.129c-.793 1.552-3.346-8.129-3.346-8.129zM294.62 216.416c0 .368 0 .712-.036.996-.107 1.33-3.381.828-3.381.828-2.99.416-4.066-1.019-4.422-2.392a5.444 5.444 0 01-.164-1.363 5.606 5.606 0 01.054-.819v-.272a1.998 1.998 0 011.859.379c1.331 1.08 3.095.252 3.095.252s1.294.107 1.793.538c.281.242.745-.341 1.098-.897.021.359.054 1.007.074 1.701.024.356.03.714.03 1.049z" opacity="0.05" /><path fill="#FF4842" fillRule="nonzero" d="M289.37 216.339s-.897.879-2.589-.479a5.444 5.444 0 01-.164-1.363c.864.658 2.466 1.842 2.753 1.842zM294.62 216.416a.67.67 0 01-.519.132.672.672 0 01-.452-.287c.348-.266.669-.566.956-.897.009.359.015.717.015 1.052zM301.637 217.032c0 .371 0 .715.033.996.108 1.333 3.382.828 3.382.828 2.989.419 4.066-1.017 4.421-2.392a5.728 5.728 0 00.111-2.182v-.272a2.024 2.024 0 00-1.862.379c-1.331 1.08-3.092.251-3.092.251s-1.294.111-1.794.542c-.281.242-.744-.341-1.094-.897a61.426 61.426 0 00-.078 1.701c-.024.35-.03.708-.027 1.046z" opacity="0.05" /><path fill="#FF4842" fillRule="nonzero" d="M306.887 216.949s.897.879 2.587-.479c.112-.444.169-.901.167-1.36-.867.655-2.47 1.839-2.754 1.839zM301.637 217.032a.67.67 0 00.969-.155 6.35 6.35 0 01-.957-.897c-.009.356-.014.714-.012 1.052zM319.614 106.269c.063-.138.123-.275.18-.41.057-.134.077-.209.11-.317-.11.237-.206.48-.29.727z" opacity="0.05" /><path fill="#061B64" fillRule="nonzero" d="M157.592 279.461a4.114 4.114 0 01-.917-3.131l13.196-107.979 1.094-8.97a4.142 4.142 0 014.078-3.635l38.654-.257a4.135 4.135 0 004.108-4.249l-.015-.409a4.14 4.14 0 014.135-4.279h40.619a4.134 4.134 0 014.098 4.682 4.137 4.137 0 003.995 4.682l39.01.996a4.13 4.13 0 013.97 4.831l-19.502 113.909-.368 2.152a4.042 4.042 0 01-.598 1.543l-135.557.114z" /><path fill="#FFF" fillRule="nonzero" d="M251.256817 123.296578L274.098317 123.296578 274.098317 200.823078 251.256817 200.823078z" transform="rotate(34.64 262.678 162.06)" /><path fill="#FFC107" fillRule="nonzero" d="M270.624591 129.857671L286.750291 129.857671 286.750291 145.983371 270.624591 145.983371z" transform="rotate(34.804 278.687 137.92)" /><path fill="#FFC107" fillRule="nonzero" d="M260.275579 145.813111L276.423079 145.813111 276.423079 161.960611 260.275579 161.960611z" opacity="0.5" transform="rotate(34.64 268.35 153.887)" /><path fill="#FFC107" fillRule="nonzero" d="M249.191579 161.852111L265.339079 161.852111 265.339079 177.999611 249.191579 177.999611z" opacity="0.3" transform="rotate(34.64 257.265 169.926)" /><path fill="#FFF" fillRule="nonzero" d="M237.472537 121.334214L260.314037 121.334214 260.314037 198.567714 237.472537 198.567714z" transform="rotate(16.29 248.893 159.951)" /><path fill="#FF4842" fillRule="nonzero" d="M249.053192 123.761554L265.200692 123.761554 265.200692 139.909054 249.053192 139.909054z" transform="rotate(16.29 257.127 131.835)" /><path fill="#FF4842" fillRule="nonzero" d="M243.584192 142.473554L259.731692 142.473554 259.731692 158.621053 243.584192 158.621053z" opacity="0.5" transform="rotate(16.29 251.658 150.547)" /><path fill="#FF4842" fillRule="nonzero" d="M238.116192 161.182554L254.263692 161.182554 254.263692 177.330054 238.116192 177.330054z" opacity="0.3" transform="rotate(16.29 246.19 169.256)" /><path fill="#FFF" fillRule="nonzero" d="M230.099192 121.641542L252.940692 121.641542 252.940692 198.875042 230.099192 198.875042z" transform="rotate(4.6 241.52 160.258)" /><path fill="#1890FF" fillRule="nonzero" d="M235.800489 122.985499L251.947989 122.985499 251.947989 139.132999 235.800489 139.132999z" transform="rotate(4.6 243.874 131.06)" /><path fill="#1890FF" fillRule="nonzero" d="M234.234488 142.413498L250.381988 142.413498 250.381988 158.560998 234.234488 158.560998z" opacity="0.5" transform="rotate(4.6 242.308 150.487)" /><path fill="#1890FF" fillRule="nonzero" d="M232.672488 161.846499L248.819988 161.846499 248.819988 177.993999 232.672488 177.993999z" opacity="0.3" transform="rotate(4.6 240.746 169.92)" /><path fill="#FFF" fillRule="nonzero" d="M224.736657 123.384871L247.578157 123.384871 247.578157 200.618371 224.736657 200.618371z" transform="rotate(-2.61 236.157 162.002)" /><path fill="#2065D1" fillRule="nonzero" d="M226.751283 124.659968L242.898783 124.659968 242.898783 140.807468 226.751283 140.807468z" transform="rotate(-2.61 234.825 132.734)" /><path fill="#2065D1" fillRule="nonzero" d="M228.305601 143.479224L244.473301 143.479224 244.473301 159.646924 228.305601 159.646924z" opacity="0.5" transform="rotate(-2.862 236.39 151.563)" /><path fill="#2065D1" fillRule="nonzero" d="M228.525282 163.608968L244.672782 163.608968 244.672782 179.756468 228.525282 179.756468z" opacity="0.3" transform="rotate(-2.61 236.599 171.683)" /><path fill="#F4F6F8" fillRule="nonzero" d="M232.679 225.726l-20.294 7.851-29.661 11.466c-1.121-2.093-2.771-4.921-4.813-8.297-7.026-11.642-18.65-29.75-29.001-45.665-11.66-17.938-21.696-33.075-21.696-33.075l7.265-2.093 59.346-17.23 38.854 87.043z" /><path fill="#000" fillRule="nonzero" d="M232.679 225.726l-20.294 7.851a152.535 152.535 0 01-34.484 3.169c-7.026-11.642-18.65-29.75-29-45.665l-14.42-35.18 59.343-17.218 38.855 87.043z" opacity="0.1" /><path fill="#2065D1" fillRule="nonzero" d="M247.777 220.841s-31.526 18.65-78.596 14.432l-37.525-91.486 17.984-3.091 62.168-10.677 35.279 89.043.69 1.779z" /><path fill="#FF4842" fillRule="nonzero" d="M247.075 219.074c-7.424.365-16.013.329-24.654-.702-9.351-1.101-18.757-3.367-26.82-7.523-6.742-3.471-12.506-7.247-17.532-11.776-13.074-11.759-21.164-28.579-28.429-58.365l62.168-10.677 35.267 89.043z" opacity="0.1" /><path fill="#FFF" fillRule="nonzero" d="M270.203 213.959s-23.239 4.55-46.894 1.749c-9.351-1.1-18.757-3.367-26.82-7.522-6.742-3.471-12.503-7.247-17.532-11.777-16.181-14.557-24.725-36.866-33.536-81.918 0 0 38.633 9.325 76.836-11.101-.012.015 12.865 80.373 47.946 110.569z" /><path fill="#2065D1" fillRule="nonzero" d="M165.405 131.03s31.416-1.776 40.187-8.548l1.331 4.276s-20.758 9.157-41.518 9.268v-4.996zM165.405 152.137s30.417-1.665 53.399-12.766l.777 1.776s-18.237 10.647-54.176 13.433v-2.443zM167.853 160.362s30.418-1.665 53.397-12.766l.777 1.776s-18.237 10.643-54.174 13.433v-2.443zM170.299 168.599s30.417-1.666 53.399-12.766l.774 1.775s-18.237 10.647-54.173 13.433v-2.442zM172.748 176.835s30.417-1.665 53.396-12.766l.777 1.776s-18.237 10.647-54.173 13.433v-2.443zM175.193 185.075s30.417-1.665 53.399-12.766l.774 1.776s-18.237 10.643-54.173 13.433v-2.443z" opacity="0.3" /><path fill="#2065D1" fillRule="nonzero" d="M389.069 287.344s-12.641-.762-11.152 8.097c0 0-.299 1.563 1.124 2.275 0 0 .021-.658 1.295-.434.454.077.916.099 1.375.066a2.832 2.832 0 001.677-.694c.468-.409 3.555-1.468 4.936-7.274 0 0 1.023-1.267.981-1.593l-2.132.897s.73 1.54.156 2.816c0 0-.069-2.759-.479-2.691-.083 0-1.109.533-1.109.533s1.253 2.69.299 4.628c0 0 .359-3.304-.699-4.434l-1.495.876s1.465 2.768.472 5.029c0 0 .254-3.465-.789-4.817l-1.361 1.062s1.379 2.729.539 4.604c0 0-.111-4.036-.835-4.341 0 0-1.195 1.049-1.369 1.494 0 0 .942 1.98.356 3.026 0 0-.359-2.691-.652-2.691 0 0-1.196 1.794-1.309 2.99 0 0 .051-1.818 1.022-3.172a3.593 3.593 0 00-1.818.942s.186-1.262 2.111-1.37c0 0 .981-1.351 1.241-1.435 0 0-1.914-.158-3.074.356 0 0 1.023-1.196 3.427-.649l1.342-1.094s-2.52-.347-3.588.036c0 0 1.229-1.052 3.95-.299l1.462-.873s-2.147-.463-3.426-.299c0 0 1.348-.729 3.856.06l1.044-.47s-1.573-.299-2.033-.358c-.461-.06-.488-.174-.488-.174a5.426 5.426 0 012.957.329s2.222-.813 2.186-.954z" /><ellipse cx="380.363" cy="298.487" fill="#2065D1" fillRule="nonzero" opacity="0.1" rx="8.945" ry="1.513" /><path fill="#2065D1" fillRule="nonzero" d="M394.956 258.102s-7.125-.43-6.279 4.565a1.218 1.218 0 00.631 1.283s.015-.371.733-.245c.255.042.515.054.774.036.349-.023.681-.159.945-.389.264-.23 2.003-.828 2.783-4.102 0 0 .577-.714.553-.897l-1.196.511s.41.87.087 1.591c0 0-.039-1.558-.269-1.522-.048 0-.625.299-.625.299s.706 1.495.173 2.61c0 0 .204-1.862-.394-2.502l-.846.496s.825 1.561.266 2.834c0 0 .143-1.955-.446-2.714l-.765.598s.774 1.539.299 2.595c0 0-.063-2.275-.469-2.446a4.75 4.75 0 00-.775.834s.532 1.118.204 1.707c0 0-.204-1.515-.368-1.521 0 0-.67 1.001-.739 1.689a3.671 3.671 0 01.577-1.794 2.007 2.007 0 00-1.025.532s.104-.711 1.196-.771c0 0 .553-.763.699-.81 0 0-1.079-.09-1.734.2 0 0 .577-.67 1.932-.365l.759-.619s-1.423-.194-2.024.021c0 0 .694-.598 2.227-.161l.826-.494a7.445 7.445 0 00-1.935-.164s.763-.413 2.174.033l.598-.263s-.897-.177-1.148-.203c-.252-.027-.275-.099-.275-.099a3.078 3.078 0 011.668.185s1.232-.46 1.208-.538z" /><ellipse cx="390.052" cy="264.383" fill="#2065D1" fillRule="nonzero" opacity="0.1" rx="5.044" ry="1" /><path fill="#2065D1" fillRule="nonzero" d="M352.896 262.437s-8.604-.52-7.588 5.51a1.47 1.47 0 00.763 1.549s0-.449.897-.299c.309.052.623.067.935.045a1.923 1.923 0 001.142-.473c.318-.279 2.419-.998 3.361-4.951 0 0 .697-.861.667-1.085l-1.468.622s.496 1.046.104 1.916c0 0-.048-1.877-.326-1.835-.056 0-.753.364-.753.364s.852 1.824.209 3.152c0 0 .245-2.249-.475-3.02l-1.023.598s.996 1.886.32 3.423c0 0 .174-2.359-.535-3.289l-.927.724s.939 1.857.365 3.133c0 0-.072-2.747-.565-2.954 0 0-.81.715-.933 1.008 0 0 .64 1.348.242 2.06 0 0-.245-1.83-.445-1.839 0 0-.804 1.214-.897 2.042.04-.768.28-1.512.697-2.159a2.427 2.427 0 00-1.235.643s.125-.858 1.435-.933c0 0 .667-.92.846-.974 0 0-1.303-.111-2.093.239 0 0 .694-.807 2.329-.44l.915-.747s-1.713-.233-2.442.024c0 0 .837-.715 2.69-.191l.996-.598s-1.462-.314-2.335-.201c0 0 .921-.496 2.625.042l.711-.32s-1.07-.209-1.384-.242c-.314-.033-.329-.119-.329-.119a3.69 3.69 0 012.012.221s1.519-.553 1.492-.646z" /><ellipse cx="346.97" cy="270.022" fill="#2065D1" fillRule="nonzero" opacity="0.1" rx="6.09" ry="1.028" /><rect width="51.026" height="91.312" x="303.926" y="69.211" fill="#FFF" fillRule="nonzero" rx="4.737" transform="rotate(-71.99 329.44 114.867)" /><circle cx="303.613" cy="103.507" r="9.376" fill="#2065D1" fillRule="nonzero" opacity="0.2" /><path fill="#2065D1" fillRule="nonzero" d="M344.582495 86.4883769L347.150665 86.4883769 347.150665 127.336977 344.582495 127.336977z" opacity="0.2" transform="rotate(-71.99 345.867 106.913)" /><path fill="#2065D1" fillRule="nonzero" d="M333.028401 99.6373982L335.596571 99.6373982 335.596571 120.445898 333.028401 120.445898z" opacity="0.2" transform="rotate(-71.99 334.312 110.042)" /><path fill="#2065D1" fillRule="nonzero" d="M337.109071 101.431004L339.677241 101.431004 339.677241 135.086304 337.109071 135.086304z" opacity="0.2" transform="rotate(-71.99 338.393 118.259)" /><path fill="#2065D1" fillRule="nonzero" d="M338.505494 105.174377L341.073664 105.174377 341.073664 146.022978 338.505494 146.022978z" opacity="0.2" transform="rotate(-71.99 339.79 125.599)" /><path fill="#2065D1" fillRule="nonzero" d="M348.060839 134.648161L353.026769 134.648161 353.026769 145.952261 348.060839 145.952261z" opacity="0.5" transform="rotate(-71.99 350.544 140.3)" /><rect width="50.3" height="78.305" x="291.549" y="174.486" fill="#FFF" fillRule="nonzero" rx="4" transform="rotate(-57.265 316.7 213.638)" /><path fill="#DFE3E8" fillRule="nonzero" d="M278.038439 203.88874L292.269539 203.88874 292.269539 207.23723 278.038439 207.23723z" transform="rotate(-57.57 285.154 205.563)" /><path fill="#DFE3E8" fillRule="nonzero" d="M283.007935 199.201889L314.262535 199.201889 314.262535 202.272339 283.007935 202.272339z" transform="rotate(-57.57 298.635 200.737)" /><path fill="#DFE3E8" fillRule="nonzero" d="M288.543935 202.715889L319.798535 202.715889 319.798535 205.786339 288.543935 205.786339z" transform="rotate(-57.57 304.171 204.251)" /><path fill="#DFE3E8" fillRule="nonzero" d="M294.078936 206.235889L325.333536 206.235889 325.333536 209.306339 294.078936 209.306339z" transform="rotate(-57.57 309.706 207.771)" /><path fill="#DFE3E8" fillRule="nonzero" d="M299.879919 211.40702L331.090719 211.40702 331.090719 214.47316 299.879919 214.47316z" transform="rotate(-57.265 315.485 212.94)" /><path fill="#F4F6F8" fillRule="nonzero" d="M305.149936 213.268889L336.404536 213.268889 336.404536 216.339339 305.149936 216.339339z" transform="rotate(-57.57 320.777 214.804)" /><path fill="#F4F6F8" fillRule="nonzero" d="M310.685935 216.782889L341.940535 216.782889 341.940535 219.853339 310.685935 219.853339z" transform="rotate(-57.57 326.313 218.318)" /><path fill="#DFE3E8" fillRule="nonzero" d="M341.417983 210.406958L349.511163 210.406958 349.511163 218.500138 341.417983 218.500138z" transform="rotate(-57.57 345.465 214.454)" /><path fill="#2065D1" fillRule="nonzero" d="M269.277 168.76l-45.767.493a3.127 3.127 0 00-3.094 3.125v3.782a3.127 3.127 0 01-3.05 3.124l-33.024.792a3.124 3.124 0 01-3.095-2.308l-1.551-5.701a3.124 3.124 0 00-3.053-2.308l-44.113.475a3.125 3.125 0 00-3.05 3.648l17.747 104.449a3.129 3.129 0 003.071 2.604l139.363.598a3.129 3.129 0 003.082-3.714l-20.366-106.521a3.125 3.125 0 00-3.1-2.538z" /><path fill="#103996" fillRule="nonzero" d="M269.277 168.76l-45.767.493a3.127 3.127 0 00-3.094 3.125v3.782a3.127 3.127 0 01-3.05 3.124l-33.024.792a3.124 3.124 0 01-3.095-2.308l-1.551-5.701a3.124 3.124 0 00-3.053-2.308l-44.113.475a3.125 3.125 0 00-3.05 3.648l17.747 104.449a3.129 3.129 0 003.071 2.604l139.363.598a3.129 3.129 0 003.082-3.714l-20.366-106.521a3.125 3.125 0 00-3.1-2.538z" opacity="0.243" /><path fill="url(#linearGradient-2)" fillRule="nonzero" d="M269.277 168.76l-45.767.493a3.127 3.127 0 00-3.094 3.125v3.782a3.127 3.127 0 01-3.05 3.124l-33.024.792a3.124 3.124 0 01-3.095-2.308l-1.551-5.701a3.124 3.124 0 00-3.053-2.308l-44.113.475a3.125 3.125 0 00-3.05 3.648l17.747 104.449a3.129 3.129 0 003.071 2.604l139.363.598a3.129 3.129 0 003.082-3.714l-20.366-106.521a3.125 3.125 0 00-3.1-2.538z" opacity="0.32" /><ellipse cx="119.593" cy="258.664" fill="#2065D1" fillRule="nonzero" opacity="0.1" rx="4.846" ry="1" /><ellipse cx="101.03" cy="260.545" fill="#2065D1" fillRule="nonzero" opacity="0.1" rx="4.846" ry="1" /><ellipse cx="108.459" cy="265.905" fill="#2065D1" fillRule="nonzero" opacity="0.1" rx="3.444" ry="1" /><ellipse cx="89.193" cy="265.433" fill="#2065D1" fillRule="nonzero" opacity="0.1" rx="3.444" ry="1" /><path fill="#2065D1" fillRule="nonzero" d="M100.925 260.398s6.796-22.279-1.064-31.204c-5.881-6.676-12.557-5.877-15.547-5.052a5.528 5.528 0 00-3.564 2.963c-1.046 2.254-.858 5.913 6.521 10.186 12.35 7.151 13.119 16.96 13.119 16.96l.535 6.147z" /><path stroke="#061B64" strokeLinecap="round" strokeWidth="0.5" d="M85.382 227.302s20.031 6.278 15.546 33.096M97.083 229.547s-2.76 1.86-1.88 4.655M87.39 231.203s1.687-1.716 3.741-.768M95.31 239.832s2.963-1.495 3.728.379M102.638 242.962s-2.224-.176-2.263.897" /><path fill="#2065D1" fillRule="nonzero" d="M101.2 260.575s-7.961-16.193-10.147-15.846c-1.037.17-1.516 1.196-1.734 2.218a6.516 6.516 0 00.434 3.941c1.13 2.601 4.165 7.519 11.447 9.687z" /><path stroke="#061B64" strokeLinecap="round" strokeWidth="0.5" d="M91.113 247.808s8.353 12.115 9.968 12.647" /><path stroke="#061B64" strokeLinecap="round" strokeWidth="0.5" d="M90.344 249.701L92.293 249.701" /><path stroke="#061B64" strokeLinecap="round" strokeWidth="0.5" d="M92.68 254.132L95.738 254.263" /><path stroke="#061B64" strokeLinecap="round" strokeWidth="0.5" d="M94.542 250.586L94.21 252.179" /><path stroke="#061B64" strokeLinecap="round" strokeWidth="0.5" d="M97.792 255.432L97.732 256.879" /><path fill="#2065D1" fillRule="nonzero" d="M100.964 260.575s7.959-16.193 10.144-15.846c1.041.17 1.519 1.196 1.734 2.218a6.514 6.514 0 01-.433 3.941c-1.13 2.601-4.168 7.519-11.445 9.687z" /><path stroke="#061B64" strokeLinecap="round" strokeWidth="0.5" d="M111.051 247.808s-8.371 12.115-9.97 12.647" /><path stroke="#061B64" strokeLinecap="round" strokeWidth="0.5" d="M111.82 249.701L109.871 249.701" /><path stroke="#061B64" strokeLinecap="round" strokeWidth="0.5" d="M109.485 254.132L106.426 254.263" /><path stroke="#061B64" strokeLinecap="round" strokeWidth="0.5" d="M107.622 250.586L107.954 252.179" /><path stroke="#061B64" strokeLinecap="round" strokeWidth="0.5" d="M104.372 255.432L104.432 256.879" /><path fill="#2065D1" fillRule="nonzero" d="M87.295 264.357a1.375 1.375 0 01-.452-.685.599.599 0 01.317-.697c.3-.11.598.09.837.299.24.21.512.431.81.38a1.237 1.237 0 01-.382-1.16.47.47 0 01.105-.236c.161-.174.454-.099.648.039.598.43.787 1.264.79 2.018.03-.277.03-.555 0-.831a.853.853 0 01.334-.727.938.938 0 01.476-.114.988.988 0 01.774.222.767.767 0 01-.03.947c-.229.257-.5.474-.801.64a1.805 1.805 0 00-.571.547.399.399 0 00-.042.096h-1.74a4.826 4.826 0 01-1.073-.738zM117.626 257.833a1.355 1.355 0 01-.452-.682.599.599 0 01.314-.696c.299-.111.598.089.837.299.239.209.509.436.817.391a1.236 1.236 0 01-.386-1.157.472.472 0 01.107-.236c.162-.173.455-.099.649.036.613.433.787 1.268.79 2.021a4.008 4.008 0 000-.834.852.852 0 01.299-.736.955.955 0 01.475-.11.998.998 0 01.774.218.768.768 0 01-.033.951 2.996 2.996 0 01-.798.64 1.767 1.767 0 00-.571.544.499.499 0 00-.042.098h-1.701a4.78 4.78 0 01-1.079-.747zM107.518 264.357a1.406 1.406 0 01-.455-.685.6.6 0 01.317-.697c.299-.11.598.09.837.299.239.21.505.437.816.395a1.247 1.247 0 01-.385-1.16.472.472 0 01.107-.236c.162-.174.455-.099.649.039.613.43.783 1.264.789 2.018.03-.277.03-.555 0-.832a.855.855 0 01.314-.735.93.93 0 01.476-.114.988.988 0 01.774.222.764.764 0 01-.033.947 3.028 3.028 0 01-.798.64 1.798 1.798 0 00-.571.547.411.411 0 00-.042.096h-1.734c-.385-.2-.742-.45-1.061-.744z" /><circle cx="84.467" cy="87.003" r="6.467" fill="#2065D1" fillRule="nonzero" opacity="0.1" /><circle cx="395.425" cy="138.681" r="6.467" fill="#2065D1" fillRule="nonzero" opacity="0.1" /><circle cx="279.178" cy="66.467" r="6.467" fill="#2065D1" fillRule="nonzero" opacity="0.1" /><circle cx="97.4" cy="122.68" r="10.838" fill="#2065D1" fillRule="nonzero" opacity="0.1" /><path fill="#103996" fillRule="nonzero" d="M206.029 209.911c-7.975 0-14.44 6.465-14.44 14.44s6.465 14.44 14.44 14.44 14.44-6.465 14.44-14.44-6.465-14.44-14.44-14.44z" /><path fill="#2065D1" fillRule="nonzero" d="M206.029 211.59c7.047 0 12.761 5.714 12.761 12.761 0 7.048-5.714 12.761-12.761 12.761-7.048 0-12.761-5.713-12.761-12.761.006-7.045 5.716-12.754 12.761-12.761" opacity="0.72" /><path fill="#103996" fillRule="nonzero" d="M200.058 225.406l-.699-.681a.721.721 0 010-1.065l6.127-5.984a.753.753 0 01.546-.231c.206 0 .404.083.545.231l6.127 5.978a.733.733 0 010 1.065l-.699.682a.768.768 0 01-1.091 0l-3.622-3.727v8.843a.725.725 0 01-.219.523.76.76 0 01-.534.217h-1.009a.75.75 0 01-.759-.74v-8.832l-3.622 3.726a.768.768 0 01-1.091-.005z" />
                </SvgIcon>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
                    {/* <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          {selectedImage ? (
            <Box mb={2}>
              <img src={selectedImage} alt="Selected" style={imagePreviewStyle} />
              <Button variant="outlined" color="secondary" onClick={handleRemoveImage}>
                Remove
              </Button>
            </Box>
          ) : (
            <label htmlFor="image-upload">
              <input
                id="image-upload"
                type="file"
                style={fileInputStyle}
                onChange={handleImageUpload}
              />
              <Button variant="outlined" component="span">
                Select Image
              </Button>
            </label>
          )}
        </Grid>
      </Grid> */}

                  {touched.description && errors.description && (
                    <FormHelperText error id="helper-text-description">
                      {errors.description}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="body2">
                  By Submitting, you agree to our &nbsp;
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
              <Grid container alignItems="flex-end" justifyContent="flex-end">
  {/* <AnimateButton> */}
  <Button
    disableElevation
    disabled={isSubmitting}
    size="large"
    type="submit"
    variant='contained'
     sx={{ background: "#1e2a4f" }}
    style={{ marginLeft: "auto" }}
  >
    Submit
  </Button>
  {/* </AnimateButton> */}
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


export default Form