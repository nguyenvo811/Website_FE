import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Label, TextInput, Select, Textarea } from 'flowbite-react';
import { createCategory, getCategories } from '../../../api/apiServices';

export default function AddCategory(props) {

  // Set dialog size
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');

  // Declare global variables to create product
  const { open, close, row } = props;
  const [msgErr, setMsgErr] = React.useState("");

  const [newCategory, setNewCategory] = React.useState({
    categoryName: "",
    description: "",
  });

  const [error, setError] = React.useState({
    categoryName: "",
    description: "",
  });

  const [subCategory, setSubCategory] = React.useState([])

  const handleAddSubCategory = () => {
    let newField = {
      subCategoryName: "",
      description: ""
    }
    setSubCategory([...subCategory, newField])
  }

  const handleSubCategoryChange = (index, event) => {
    const subCategoryCopy = [...subCategory];
    subCategoryCopy[index].subCategoryName = event.target.value;
    setSubCategory(subCategoryCopy)
  }

  const handleDescriptionChange = (index, event) => {
    const subCategoryCopy = [...subCategory];
    subCategoryCopy[index].description = event.target.value;
    setSubCategory(subCategoryCopy)
  }

  const handleSubCategoryDeletion = (index) => {
    const subCategoryCopy = [...subCategory];
    subCategoryCopy.splice(index, 1);
    setSubCategory(subCategoryCopy)
  }

  console.log(subCategory)

  const displaySubCategory = () => {
    return (
      <>
        {Array.isArray(subCategory) && subCategory.map((val, index) => (
          <div key={index} className="relative border border-gray-300 rounded-lg mt-2">
            <div className="border-b border-gray-300 my-2">
              <div className='absolute top-0 right-0'>
                <IconButton>
                  <HighlightOffIcon onClick={() => handleSubCategoryDeletion(index)} />
                </IconButton>
              </div>
              <div className='p-2 font-sans font-bold'>
                <h4>Sản phẩm {index + 1}</h4>
              </div>
            </div>

            <div className='grid gap-2 m-2'>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="subCategoryName"
                    value="Tên sản phẩm"
                  />
                </div>
                <TextInput
                  id="subCategoryName"
                  name="subCategoryName"
                  required
                  placeholder="Tên sản phẩm"
                  defaultValue={val?.subCategoryName}
                  onChange={(event) => handleSubCategoryChange(index, event)}
                />
                <p class="mt-1 text-sm text-red-500">
                  {error.color}
                </p>
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
                  placeholder="Mô tả sản phẩm"
                  required
                  rows={4}
                  defaultValue={val?.description}
                  onChange={(event) => handleDescriptionChange(index, event)}
                />
                <p class="mt-1 text-sm text-red-500">
                  {error.price}
                </p>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  };

  const validation = () => {
    let msg = {}
    if (newCategory.categoryName === "") {
      msg.categoryName = "Vui lòng nhập tên danh mục sản phẩm!"
    } else if (msgErr !== "") {
      msg.categoryName = msgErr
    } if (newCategory.description === "") {
      msg.description = "Vui lòng nhập mô tả danh mục!"
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
    setNewCategory({ ...newCategory, [name]: value })
    setError({ ...error, [name]: "" })
  }

  const clearState = () => {
    setError({
      categoryName: "",
      description: "",
    });
    setNewCategory({
      categoryName: "",
      description: "",
    });
    setMsgErr("");
    close();
  }

  const handleClose = () => {
    clearState()
    close()
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      categoryName: newCategory.categoryName,
      description: newCategory.description,
      subCategory: subCategory
    }
    console.log(data)

    const isValid = validation()
    if (isValid) {

      // Create the category
      await createCategory(data)
        .then((response) => {
          row(response.data.data);
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
                  value={newCategory.categoryName}
                  onChange={handleChangeInput}
                />
                <p class="mt-1 text-sm text-red-500">
                  {error.categoryName}
                </p>
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
                  value={newCategory.description}
                  onChange={handleChangeInput}
                />
                <p class="mt-1 text-sm text-red-500">
                  {error.description}
                </p>
              </div>

              {displaySubCategory()}

              <div className='mt-4'>
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={handleAddSubCategory}
                >Thêm sản phẩm</Button>
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