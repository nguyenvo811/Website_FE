import * as React from 'react';
import ReactDOM from 'react-dom';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
// import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import { Combobox, Label, TextInput, Select, Textarea } from 'flowbite-react';
import { createCategory, updateCategory, updateCustomer } from '../../../api/apiServices';
import isEmail from 'validator/lib/isEmail';

export default function UpdateCustomer(props) {

  // Set dialog size
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');

  // Declare global variables to create product
  const { open, close, row, data, setData } = props;

  const [msgErr, setMsgErr] = React.useState("");

  const [error, setError] = React.useState({
    firstName: "",
    lastName: "",
    numberPhone: "",
    email: "",
    message: "",
  });

  const isVietnamesePhoneNumber = (number) => {
    // Vietnamese phone numbers should start with '0' and have a total length of 10 digits
    const vietnamesePhoneNumberRegex = /\+84|0[35789]([0-9]{8})\b/g;
    return vietnamesePhoneNumberRegex.test(number);
  };

  const validation = () => {
    let msg = {}
    if (data.email === "") {
      msg.email = "Vui lòng điền email!"
    } else if (!isEmail(data.email)) {
      msg.email = "Email không đúng định dạng!"
    } if (data.numberPhone === "") {
      msg.numberPhone = "Vui lòng điền số điện thoại!"
    } else if (!isVietnamesePhoneNumber(data.numberPhone)) {
      msg.numberPhone = "Số điện thoại không đúng!"
    } if (data.firstName === "") {
      msg.firstName = "Vui lòng nhập họ của bạn!"
    } if (data.lastName === "") {
      msg.lastName = "Vui lòng nhập tên tên!"
    } if (data.message === "") {
      msg.message = "Vui lòng nhập nội dung!"
    }

    setError(msg)
    console.log("validating")
    if (Object.keys(msg).length > 0) {
      return false
    } else {
      return true
    }
  };

  const handleChangeInput = (e) => {
    let { name, value } = e.target;
    setData({ ...data, [name]: value })
    setError({ ...error, [name]: "" })
  }

  const clearState = () => {
    setError({
      firstName: "",
      lastName: "",
      numberPhone: "",
      email: "",
      message: "",
    })
    setData({
      firstName: "",
      lastName: "",
      numberPhone: "",
      email: "",
      message: "",
    })
    setMsgErr("");
    close()
  }

  const handleClose = () => {
    clearState()
    close()
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      firstName: data.firstName,
      lastName: data.lastName,
      numberPhone: data.numberPhone,
      email: data.email,
      message: data.message,
    }

    const isValid = validation()
    if (isValid) {

      // Create the category
      await updateCustomer(data._id, updatedData)
        .then((response) => {
          row(response.data.data.value);
          clearState();
        })
        .catch((error) => {
          if (error.response.status === 500) {
            console.log(error.response.data.result);
            console.log(error);
            setMsgErr(error.response.data.message);
          }
        })
    }
  }


  return (
    <div>
      <React.Fragment>
        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={open}
          onClose={handleClose}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Cập nhật khách hàng
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <div className='grid grid-cols-2 gap-2'>
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="firstName"
                      value="Họ"
                    />
                  </div>
                  <TextInput
                    id="firstName"
                    name="firstName"
                    placeholder="Họ của bạn"
                    required
                    type="text"
                    value={data.firstName}
                    onChange={handleChangeInput}
                  />
                  <p class="mt-1 text-sm text-red-500">
                    {error.firstName}
                  </p>
                </div>

                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="lastName"
                      value="Tên"
                    />
                  </div>
                  <TextInput
                    id="lastName"
                    name="lastName"
                    placeholder="Tên của bạn"
                    required
                    type="text"
                    value={data.lastName}
                    onChange={handleChangeInput}
                  />
                  <p class="mt-1 text-sm text-red-500">
                    {error.lastName}
                  </p>
                </div>
              </div>
              <div className='grid grid-cols-2 gap-2'>
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="numberPhone"
                      value="Số điện thoại"
                    />
                  </div>
                  <TextInput
                    id="numberPhone"
                    name="numberPhone"
                    placeholder="+12 345 6789"
                    required
                    type="text"
                    value={data.numberPhone}
                    onChange={handleChangeInput}
                  />
                  <p class="mt-1 text-sm text-red-500">
                    {error.numberPhone}
                  </p>
                </div>

                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="email"
                      value="Email"
                    />
                  </div>
                  <TextInput
                    id="email"
                    name="email"
                    placeholder="Ví dụ: yensaokiengiang@gmail.com"
                    required
                    type="text"
                    value={data.email}
                    onChange={handleChangeInput}
                  />
                  <p class="mt-1 text-sm text-red-500">
                    {error.email}
                  </p>
                </div>
              </div>

              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="message"
                    value="Nội dung"
                  />
                </div>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Hãy để lại nội dung"
                  required
                  rows={8}
                  value={data.message}
                  onChange={handleChangeInput}
                />
                <p class="mt-1 text-sm text-red-500">
                  {error.message}
                </p>
              </div>

            </Box>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" color="inherit" onClick={handleClose}>
              Hủy
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
              Xác nhận
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </div>
  );
}