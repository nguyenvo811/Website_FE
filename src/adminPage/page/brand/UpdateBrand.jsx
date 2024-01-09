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
import { updateBrand } from '../../../api/apiServices';

export default function UpdateBrand(props) {

	// Set dialog size
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');

  // Declare global variables to create product
  const { open, close, row, data, setData} = props;

  const [msgErr, setMsgErr] = React.useState("");

	const [error, setError] = React.useState({
    brandName: "",
    description: "", 
  });

  const validation = () => {
    let msg = {}
    if (data.brandName === "") {
      msg.brandName = "Không được bỏ trống ô!"
    } else if (msgErr !== "") {
      msg.brandName = msgErr
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
      brandName: "",
      description: "", 
    })
    setData({
      brandName: "",
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
      brandName: data.brandName,
      description: data.description,
    }

		const isValid = validation()
    if (isValid){

    // Create the category
    await updateBrand(data._id, updatedData)
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
            Thêm danh mục sản phẩm
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
              <div className='grid gap-2'>
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="brandName"
                      value="Tên thương hiệu"
                    />
                  </div>
                  <TextInput
                    id="brandName"
                    name="brandName"
                    placeholder="Nhập tên thương hiệu"
                    required
                    type="text"
                    value={data.brandName}
                    onChange={handleChangeInput}
                  />
									<p class="mt-1 text-sm text-red-500"> 
										{error.brandName}
									</p>
                </div>
              </div>

              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="description"
                    value="Mô tả thương hiệu"
                  />
                </div>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Mô tả thương hiệu"
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