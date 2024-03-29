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
import { createCategory, updateCategory, updateContact } from '../../../api/apiServices';

export default function UpdateContact(props) {

	// Set dialog size
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');

  // Declare global variables to create product
  const { open, close, row, data, setData} = props;

  const [msgErr, setMsgErr] = React.useState("");

	const [error, setError] = React.useState({
    contactName: "",
    numberPhone: "",
    description: "", 
  });

  const validation = () => {
    let msg = {}
    if (data.contactName === "") {
      msg.contactName = "Không được bỏ trống ô!"
    } else if (msgErr !== "") {
      msg.contactName = msgErr
    } if (data.description === "") {
      msg.description = "Không được bỏ trống ô!"
    } 
    
    setError(msg)
    if (Object.keys(msg).length > 0) {
      return false
    } else {
      return true
    }
  };

	const handleChangeInput = (e) => {
    let {name, value} = e.target;
    setData({...data, [name]: value})
    setError({...error, [name]: ""})
  }

  const clearState = () => {
		setError({
      contactName: "",
      numberPhone: "",
      description: "", 
    })
    setData({
      contactName: "",
      numberPhone: "",
      description: "", 
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
      contactName: data.contactName,
      numberPhone: data.numberPhone,
      description: data.description,
    }

		const isValid = validation()
    if (isValid){

    // Create the category
    await updateContact(data._id, updatedData)
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
            Cập nhật nhân viên
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
                      htmlFor="contactName"
                      value="Tên nhân viên"
                    />
                  </div>
                  <TextInput
                    id="contactName"
                    name="contactName"
                    placeholder="Tên nhân viên"
                    required
                    type="text"
                    value={data.contactName}
                    onChange={handleChangeInput}
                  />
									<p class="mt-1 text-sm text-red-500"> 
										{error.contactName}
									</p>
                </div>

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
                    placeholder="Số điện thoại"
                    required
                    type="text"
                    value={data.numberPhone}
                    onChange={handleChangeInput}
                  />
									<p class="mt-1 text-sm text-red-500"> 
										{error.numberPhone}
									</p>
                </div>
              </div>

              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="description"
                    value="Mô tả"
                  />
                </div>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Mô tả"
                  required
                  rows={4}
                  value={data.description}
                  onChange={handleChangeInput}
                />
								<p class="mt-1 text-sm text-red-500"> 
									{error.description}
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