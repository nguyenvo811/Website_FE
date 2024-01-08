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
import { createProduct, getBrands, getCategories } from '../../../api/apiServices';
import UploadFile from '../../../asset/library/UploadFile';
import 'react-quill/dist/quill.snow.css'; // Import the styles
import ReactQuill from 'react-quill';

export default function AddProduct(props) {

  // Declare global variables to create product
  const { open, close, row } = props;
  const [select, setSelect] = React.useState([]);
  const [msgErr, setMsgErr] = React.useState("");
  const [selectBrand, setSelectBrand] = React.useState([]);

  const [description, setDescription] = React.useState("");

  const renderStatus = [
    {id: "true", value: "true"},
    {id: "false", value: "false"},
  ]

  const renderVariantCategory = [
    {id: "color", value: "Màu sắc"},
    {id: "specification", value: "Thông số"},
    {id: "weigth", value: "Trọng lượng"},
    {id: "material", value: "Chất liệu"},
  ]

  const [newProduct, setNewProduct] = React.useState({
    productName: "",
    origin: "",
    video: "",
    variantCategory: "",
    shortDescription: "",
    active: "",
    newest: "",
    bestSeller: ""
  });

  // Declare variables to create Timer
  const [specifications, setSpecifications] = React.useState([{
    name: "",
    value: ""
  }]);

  const handleAddSpecification = () => {
    const newSpecification = {
      name: "",
      value: ""
    };

    setSpecifications([...specifications, newSpecification]);
  };

  const handleNameChange = (index, event) => {
    const specificationsCopy = [...specifications];
    specificationsCopy[index].name = event.target.value;

    setSpecifications(specificationsCopy);
  };

  const handleValueChange = (index, event) => {
    const specificationsCopy = [...specifications];
    specificationsCopy[index].value = event.target.value;

    setSpecifications(specificationsCopy);
  };

  const handleSpecificationDeletion = (index) => {
    const specificationsCopy = [...specifications];
    specificationsCopy.splice(index, 1);

    setSpecifications(specificationsCopy);
  };

  const displaySpecification = () => {
    return (
      <>
        {specifications.map((spec, index) => (
          <div key={index} className="relative border border-gray-300 rounded-lg mt-2">
            <div className="border-b border-gray-300 my-2">
              <div className='absolute top-0 right-0'>
                <IconButton>
                  <HighlightOffIcon onClick={(e) => handleSpecificationDeletion(index)} />
                </IconButton>
              </div>
              <div className='p-2 font-sans font-bold'>
                <h4>Thông số {index + 1}</h4>
              </div>
            </div>
            <div className='grid grid-cols-2 gap-2 m-2'>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="name"
                    value="Tên thông số"
                  />
                </div>
                <TextInput
                  id="name"
                  name="name"
                  required
                  placeholder="Tên của biến thể"
                  defaultValue={spec.variantName}
                  onChange={(event) => handleNameChange(index, event)}
                />
                {/* <p class="mt-1 text-sm text-red-500">
                  {error.variantName}
                </p> */}
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="value"
                    value="Giá trị của thông số"
                  />
                </div>
                <TextInput
                  id="value"
                  name="value"
                  required
                  placeholder="Giá trị của thông số"
                  defaultValue={spec.value}
                  onChange={(event) => handleValueChange(index, event)}
                />
                {/* <p class="mt-1 text-sm text-red-500">
                  {error.price}
                </p> */}
              </div>
            </div>
          </div>
        ))}
      </>
    );
  };

  // Set dialog size
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('md');

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
    getBrands()
      .then(res => {
        setSelectBrand(res.data.data)
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
  const [selectedBrandValue, setSelectedBrandValue] = React.useState("");
  const [selectedSubCategoryValue, setSelectedSubCategoryValue] = React.useState("");

  const handleSelect = (e) => {
    // Set the state variable to the selected value.
    setSelectedValue(e.target.value);
    setError({ category: "" })
  }

  const handleSelectSubCategory = (e) => {
    // Set the state variable to the selected value.
    setSelectedSubCategoryValue(e.target.value);
  }

  const handleBrandSelect = (e) => {
    // Set the state variable to the selected value.
    setSelectedBrandValue(e.target.value);
  }

  // List category to rendert
  const selectedCategoryName = select.find(category => category._id === selectedValue);
  const subCategoryList = select.find(val => {
    if (val._id === selectedValue) {
      return val
    }
  });

  // Select, preview and remove image
  const [variants, setVariants] = React.useState([{
    variantName: "",
    price: "",
    images: []
  }]);

  const handleAddVariant = () => {
    const newVariant = {
      variantName: "",
      price: "",
      images: []
    };

    setVariants([...variants, newVariant]);
  };

  // Validation
  const [error, setError] = React.useState({
    productName: "",
    description: "",
    origin: "",
    category: "",
    variantName: "",
    price: "",
    images: ""
  });

  const validation = () => {
    let msg = {}
    if (newProduct.productName === "") {
      msg.productName = "Vui lòng nhập tên sản phẩm!"
    } else if (msgErr !== "") {
      msg.productName = msgErr
    } if (newProduct.description === "") {
      msg.description = "Vui lòng nhập mô tả sản phẩm!"
    } if (newProduct.origin === "") {
      msg.origin = "Vui lòng nhập xuất xứ sản phẩm!"
    } if (variants.price === "") {
      msg.price = "Vui lòng nhập giá sản phẩm!"
    } else if (variants.price < 1) {
      msg.price = "Giá sản phẩm không thể thấp hơn 1!"
    } if (variants.variantName === "") {
      msg.price = "Vui lòng nhập màu sản phẩm!"
    } if (selectedValue === "") {
      msg.category = "Vui lòng chọn danh mục sản phẩm!"
    }
    // if (!variants.images) {
    //   msg.images = "Vui lòng chọn hình sản phẩm!"
    // }

    setError(msg)
    console.log("validating")
    if (Object.keys(msg).length > 0) {
      return false
    } else {
      return true
    }
  };

  const handleChangeQuill = (value) => {
    setDescription(value);
    setError({ ...error, description: '' });
  };

  const handleChangeInput = (e) => {
    let { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value })
    setError({ ...error, [name]: "" })
  }

  const handleVariantNameChange = (index, event) => {
    const variantsCopy = [...variants];
    variantsCopy[index].variantName = event.target.value;

    setVariants(variantsCopy);
    setError({ variantName: "" })
  };

  const handlePriceChange = (index, event) => {
    const variantsCopy = [...variants];
    variantsCopy[index].price = event.target.value;

    setVariants(variantsCopy);
    setError({ price: "" })
  };

  const handleFileUpload = (index, event) => {
    const variantsCopy = [...variants];
    const files = event.target.files;
    for (const file of files) {
      variantsCopy[index].images.push(file);
    }

    setVariants(variantsCopy);
    setError({ images: "" })
  };

  const handleImageDeletion = (index, imageIndex) => {
    const variantsCopy = [...variants];
    variantsCopy[index].images.splice(imageIndex, 1);

    setVariants(variantsCopy);
  };

  const handleVariantDeletion = (index) => {
    const variantsCopy = [...variants];
    variantsCopy.splice(index, 1);

    setVariants(variantsCopy);
  };

  const displayPreview = () => {
    return (
      <>
        {variants.map((variant, index) => (
          <div key={index} className="relative border border-gray-300 rounded-lg mt-2">
            <div className="border-b border-gray-300 my-2">
              <div className='absolute top-0 right-0'>
                <IconButton>
                  <HighlightOffIcon onClick={(e) => handleVariantDeletion(index)} />
                </IconButton>
              </div>
              <div className='p-2 font-sans font-bold'>
                <h4>Sản phẩm {index + 1}</h4>
              </div>
            </div>
            <div className='grid grid-cols-3 gap-2 m-2'>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="variantName"
                    value="Tên biến thể"
                  />
                </div>
                <TextInput
                  id="variantName"
                  name="variantName"
                  required
                  placeholder="Tên của biến thể"
                  defaultValue={variant.variantName}
                  onChange={(event) => handleVariantNameChange(index, event)}
                />
                <p class="mt-1 text-sm text-red-500">
                  {error.variantName}
                </p>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="price"
                    value="Giá sản phẩm"
                  />
                </div>
                <TextInput
                  id="price"
                  name="price"
                  required
                  placeholder="Giá của sản phẩm"
                  defaultValue={variant.price}
                  onChange={(event) => handlePriceChange(index, event)}
                />
                <p class="mt-1 text-sm text-red-500">
                  {error.price}
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
                  multiple
                  onChange={(event) => handleFileUpload(index, event)}
                />
                <p class="mt-1 text-sm text-red-500">
                  {error.images}
                </p>
              </div>
            </div>

            <div className="w-full mx-auto">
              <div className='relative flex m-2 justify-center space-x-6'>
                {variant.images.map((image, imageIndex) => (
                  <div key={imageIndex} className='relative'>
                    <div className='h-36 w-36 m-auto relative group border-dashed border-2 border-gray-300 rounded-xl'>
                      <img src={URL.createObjectURL(image)} alt="Preview" className='w-full h-full rounded-xl bg-center bg-cover ' />
                      <div className='absolute top-0 right-0'>
                        <IconButton>
                          <HighlightOffIcon onClick={(e) => handleImageDeletion(index, imageIndex)} />
                        </IconButton>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </>
    );
  };

  const clearState = () => {

    setNewProduct({
      productName: "",
      description: "",
      origin: "",
      video: ""
    });

    setSelectedValue("");
    setVariants([]);
    setMsgErr("");
    close();
  }

  console.log(selectedCategoryName)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      productName: newProduct.productName,
      description: description,
      category: selectedValue,
      subCategory: selectedSubCategoryValue,
      origin: newProduct.origin,
      shortDescription: newProduct.shortDescription,
      brand: selectedBrandValue,
      video: newProduct.video,
      variants: variants,
      variantCategory: newProduct.variantCategory,
      active: newProduct.active,
      newest: newProduct.newest,
      bestSeller: newProduct.bestSeller,
      specifications: specifications
    }

    const updatedVariants = [];
    for (let index = 0; index < variants.length; index++) {

      const element = variants[index];
      const upfiles = await Promise.all(element.images.map(UploadFile));
      const updatedElement = {
        ...element,
        images: upfiles.map((upfile) => upfile.data),
      };
      updatedVariants.push(updatedElement);
    }

    data.variants = updatedVariants;

    console.log(data)
    const isValid = validation()
    if (isValid) {

      // Create the product
      return await createProduct(data)
        .then((response) => {
          console.log(response.data.data)
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
          onClose={close}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Thêm sản phẩm
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={close}
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
                      htmlFor="productName"
                      value="Tên sản phẩm"
                    />
                  </div>
                  <TextInput
                    id="productName"
                    name="productName"
                    placeholder="Tên sản phẩm"
                    required
                    type="text"
                    value={newProduct.productName}
                    onChange={handleChangeInput}
                  />
                  <p class="mt-1 text-sm text-red-500">
                    {error.productName}
                  </p>
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="brand"
                      value="Thương hiệu"
                    />
                  </div>
                  <Select
                    id="brand"
                    name="brand"
                    required
                    value={selectedBrandValue}
                    onChange={handleBrandSelect}
                  >
                    <option value={"Chọn thương hiệu"}>
                      Chọn thương hiệu
                    </option>
                    {selectBrand?.map((option) => (
                      <option key={option._id} value={option._id}>
                        {option.brandName}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-2'>
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="category"
                      value="Danh mục sản phẩm"
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
                  <p class="mt-1 text-sm text-red-500">
                    {error.category}
                  </p>
                </div>

                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="subCategory"
                      value="Danh mục con"
                    />
                  </div>
                  <Select
                    id="subCategory"
                    name="subCategory"
                    required
                    value={selectedSubCategoryValue}
                    onChange={handleSelectSubCategory}
                  >
                    <option value={"Chọn danh mục con"}>
                      Chọn danh mục con
                    </option>
                    {subCategoryList?.subCategory?.map((option) => (
                      <option key={option._id} value={option._id}>
                        {option.subCategoryName}
                      </option>
                    ))}
                  </Select>
                  <p class="mt-1 text-sm text-red-500">
                    {error.category}
                  </p>
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
                    value={newProduct.shortDescription}
                    onChange={handleChangeInput}
                  />
                  <p class="mt-1 text-sm text-red-500"> 
                    {error.shortDescription}
                  </p>
                </div>
              </div>

              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="description"
                    value="Mô tả sản phẩm"
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

              <div className='grid grid-cols-2 gap-2'>
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="origin"
                      value="Xuất xứ"
                    />
                  </div>
                  <TextInput
                    id="origin"
                    name="origin"
                    required
                    placeholder="Viet Nam"
                    type="text"
                    value={newProduct.origin}
                    onChange={handleChangeInput}
                  />
                  <p class="mt-1 text-sm text-red-500">
                    {error.origin}
                  </p>
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="video"
                      value="Youtube link"
                    />
                  </div>
                  <TextInput
                    id="video"
                    name="video"
                    placeholder="Youtube link"
                    required
                    type="text"
                    value={newProduct.video}
                    onChange={handleChangeInput}
                  />
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
                    value={newProduct.active}
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
                    value={newProduct.newest}
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
                      htmlFor="bestSeller"
                      value="Best Seller"
                    />
                  </div>
                  <Select
                    id="bestSeller"
                    name="bestSeller"
                    required
                    value={newProduct.bestSeller}
                    onChange={handleChangeInput}
                  >
                    <option value={"bestSeller"}>
                      Best Seller
                    </option>
                    {renderStatus?.map((option) => (
                      <option key={option.id} value={option.value}>
                        {option.value}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>

              <div className='p-4 border-2 mt-2 rounded-lg'>
                {displaySpecification()}

                <div className='mt-4'>
                  <Button
                    variant="contained"
                    color="inherit"
                    onClick={handleAddSpecification}
                  >Thêm thông số</Button>
                </div>
              </div>

              <div className='p-4 border-2 mt-2 rounded-lg'>
                <div className='grid grid-cols-1 gap-2'>
                  <div>
                    <div className="mb-2 block">
                      <Label
                        htmlFor="variantCategory"
                        value="Loại biến thể"
                      />
                    </div>
                    <Select
                      id="variantCategory"
                      name="variantCategory"
                      required
                      value={newProduct.variantCategory}
                      onChange={handleChangeInput}
                    >
                      <option value={"variantCategory"}>
                        Chọn loại biến thể
                      </option>
                      {renderVariantCategory?.map((option) => (
                        <option key={option.id} value={option.value}>
                          {option.value}
                        </option>
                      ))}
                    </Select>
                    <p class="mt-1 text-sm text-red-500">
                      {error.origin}
                    </p>
                  </div>
                </div>

                {displayPreview()}

                <div className='mt-4'>
                  <Button
                    variant="contained"
                    color="inherit"
                    onClick={handleAddVariant}
                  >Thêm biến thể</Button>
                </div>
              </div>

            </Box>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" color="inherit" onClick={close}>
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