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
import { createNews, createCategory, updateNews } from '../../../api/apiServices';
import ReactQuill from 'react-quill';
import UploadFile from '../../../asset/library/UploadFile';

export default function UpdateNews(props) {
  const { open, close, row, data, setData } = props;
  // Set dialog size
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('xl');

  // Declare global variables to create product

  const [msgErr, setMsgErr] = React.useState("");

  const [description, setDescription] = React.useState("");
  const [image, setImage] = React.useState("");

  const [error, setError] = React.useState({
    title: "",
    description: "",
    shortDescription: "",
  });

  const renderStatus = [
    {id: "true", value: "true"},
    {id: "false", value: "false"},
  ]

  const validation = () => {
    let msg = {}
    if (data.title === "") {
      msg.title = "Vui lòng nhập tiêu đề!"
    } else if (msgErr !== "") {
      msg.title = msgErr
    } if (description === "") {
      msg.description = "Vui lòng nhập mô tả!"
    } if (data.shortDescription === "") {
      msg.shortDescription = "Vui lòng nhập mô tả!"
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
  }

  const handleChangeQuill = (value) => {
    setDescription(value);
    setError({ ...error, description: '' });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    setImage(file);
    setError({ image: "" })
  };

  React.useEffect(() => {
    setDescription(data?.description)
  }, [data?.description])

  const clearState = () => {
    setError({
      title: "",
      description: "",
      shortDescriptionL: ""
    });
    setData({
      title: "",
      shortDescription: "",
      active: "",
      newest: "",
      highLight: ""
    });
    setMsgErr("");
    close();
  }

  const handleClose = () => {
    clearState()
    close()
  }
  console.log(data)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      title: data.title,
      image: image,
      description: description,
      shortDescription: data.shortDescription,
      active: data.active,
      newest: data.newest,
      highLight: data.highLight
    }
    console.log(updatedData)

    const isValid = validation()
    if (isValid) {
      if (image !== "") {
        const element = updatedData.image;
        const upfile = await UploadFile(element);
        updatedData.image = upfile.data;
      }

      //Create the category
      await updateNews(data?._id, updatedData)
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
                      htmlFor="title"
                      value="Tiêu đề"
                    />
                  </div>
                  <TextInput
                    id="title"
                    name="title"
                    placeholder="Tiêu đề"
                    required
                    type="text"
                    value={data.title}
                    onChange={handleChangeInput}
                  />
                  <p class="mt-1 text-sm text-red-500">
                    {error.title}
                  </p>
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="image"
                      value="Hình sản phẩm"
                    />
                  </div>
                  <TextInput
                    id="dropzone-file"
                    name="image"
                    type="file"
                    class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                    onChange={(event) => handleFileUpload(event)}
                  />
                </div>
              </div>

              <div className='grid gap-2'>
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="shortDescription"
                      value="Mô tả ngắn"
                    />
                  </div>
                  <Textarea
                    id="shortDescription"
                    name="shortDescription"
                    placeholder="Mô tả ngắn"
                    required
                    rows={4}
                    value={data.shortDescription}
                    onChange={handleChangeInput}
                  />
                  <p class="mt-1 text-sm text-red-500"> 
                    {error.shortDescription}
                  </p>
                </div>
              </div>

              <div className='grid grid-cols-3 gap-2'>
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="active"
                      value="Hoạt động"
                    />
                  </div>
                  <Select
                    id="active"
                    name="active"
                    required
                    value={data.active}
                    onChange={handleChangeInput}
                  >
                    <option value={"active"}>
                      Active
                    </option>
                    {renderStatus?.map((option) => (
                      <option key={option.id} value={option.value}>
                        {option.value}
                      </option>
                    ))}
                  </Select>
                </div>

                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="newest"
                      value="Mới nhất"
                    />
                  </div>
                  <Select
                    id="newest"
                    name="newest"
                    required
                    value={data.newest}
                    onChange={handleChangeInput}
                  >
                    <option value={"newest"}>
                      Mới nhất
                    </option>
                    {renderStatus?.map((option) => (
                      <option key={option.id} value={option.value}>
                        {option.value}
                      </option>
                    ))}
                  </Select>
                </div>

                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="highLight"
                      value="Nổi bật"
                    />
                  </div>
                  <Select
                    id="highLight"
                    name="highLight"
                    required
                    value={data.highLight}
                    onChange={handleChangeInput}
                  >
                    <option value={"highLight"}>
                      Nổi bật
                    </option>
                    {renderStatus?.map((option) => (
                      <option key={option.id} value={option.value}>
                        {option.value}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>

              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="description"
                    value="Mô tả"
                  />
                </div>
                <ReactQuill
                  value={description}
                  onChange={handleChangeQuill}
                  theme="snow" // or "bubble"
                  modules={{
                    toolbar: [
                      [{ header: [1, 2, 3, 4, false] }],
                      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
                      [{ script: 'super' }, { script: 'sub' }],
                      [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
                      ['link', 'image', 'video', 'formula'],
                      ['clean'],
                    ],
                  }}
                  formats={[
                    'header', 'font',
                    'bold', 'italic', 'underline', 'strike', 'blockquote',
                    'list', 'bullet', 'script', 'indent',
                    'link', 'image', 'video', 'color', 'size', 'align', 'formula',
                    'background',
                    'direction',
                    'code-block',
                    'code',
                  ]}
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