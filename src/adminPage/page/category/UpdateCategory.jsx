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
import DialogTitle from '@mui/material/DialogTitle';
import { Label, TextInput, Select, Textarea } from 'flowbite-react';
import { updateCategory, getCategories } from '../../../api/apiServices';

export default function UpdateCategory(props) {

	// Set dialog size
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');

  // Declare global variables to create product
  const { open, close, row, data, setData} = props;
  const [select, setSelect] = React.useState([]);
  const [msgErr, setMsgErr] = React.useState("");
  
	const [error, setError] = React.useState({
    categoryName: "",
    description: "", 
  });

  // Get categories 
  React.useEffect(() => {
    getCategories()
      .then(res => {
        setSelect(res.data.data)
      })
      .catch(err => {
        if (err.response) {
          console.log(err.response.data.result);
          console.log(err.response.status);
          console.log(err.response.data.message);
        }
      })
  }, []);

  // Select category options to change attributes
  const [selectedValue, setSelectedValue] = React.useState("");

  const handleSelect = (e) => {
    // Set the state variable to the selected value.
    setSelectedValue(e.target.value);
    setError({category: ""})
  }

	React.useEffect(() => {
		setSelectedValue(data?.subCategories?._id);
	}, [data?.subCategories?._id]);

  const validation = () => {
    let msg = {}
    if (data.categoryName === "") {
      msg.categoryName = "Không được bỏ trống ô!"
    } else if (msgErr !== "") {
      msg.categoryName = msgErr
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
      categoryName: "",
      description: "", 
    })
    setData({
      categoryName: "",
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
      categoryName: data.categoryName,
      description: data.description,
      subCategories: selectedValue
    }

		const isValid = validation()
    if (isValid){

    // Create the category
    await updateCategory(data._id, updatedData)
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
              <div className='grid grid-cols-2 gap-2'>
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="categoryName"
                      value="Danh mục sản phẩm"
                    />
                  </div>
                  <TextInput
                    id="categoryName"
                    name="categoryName"
                    placeholder="Tên danh mục sản phẩm"
                    required
                    type="text"
                    value={data.categoryName}
                    onChange={handleChangeInput}
                  />
									<p class="mt-1 text-sm text-red-500"> 
										{error.categoryName}
									</p>
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="category"
                      value="Danh mục cha"
                    />
                  </div>
                  <Select
                    id="category"
                    name="category"
                    required
                    value={selectedValue}
                    onChange={handleSelect}
                  >
                    <option value={"Chọn danh mục sản phẩm"}>
                      Chọn danh mục sản phẩm
                    </option>
                    {select?.map((option) => (
                      <option key={option._id} value={option._id}>
                        {option.categoryName}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>

              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="description"
                    value="Mô tả danh mục sản phẩm"
                  />
                </div>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Mô tả danh mục sản phẩm"
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