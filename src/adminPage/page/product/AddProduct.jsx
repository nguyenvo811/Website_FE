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
import { createAmplifier, createSpeaker, createTimer, getBrands, getCategories } from '../../../api/apiServices';
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

  const [newProduct, setNewProduct] = React.useState({
    productName: "",
    origin: "", 
    video: ""
  });

  // Declare variables to create Timer
  const [timer, setTimer] = React.useState({
    supplyTimer: "",
    switchContacts: "",
    maximumLoadContact: "",
    programCapacity: "",
    saveProgram: "",
    batteryMemory: ""
  });

  const handleChangeInputTimer = (e) => {
    let { name, value } = e.target;
    setTimer({ ...timer, [name]: value })
  }

  // Declare variables to create Amplifier
  const [amplifier, setAmplifier] = React.useState({
    channelInput: "",
    channelOutput: "",
    amplifierClass: "",
    autoSwitching: "",
    autoAdjustVoltage: "",
    overallDimensions: "",
    weight: ""
  });

  const handleChangeInputAmplifier = (e) => {
    let { name, value } = e.target;
    setAmplifier({ ...amplifier, [name]: value })
  }

  // Declare variables to create Amplifier
  const [speaker, setSpeaker] = React.useState({
    frequencyResponse: "",
    averageSensitivity: "",
    maximumPowerHandlingCapacity: "",
    maximumVoltage: "",
    overallDimensions: "",
    impedance: "",
    maxHandlingCapacity: "",
    totalDriver: "",
    material: ""
  });

  const handleChangeInputSpeaker = (e) => {
    let { name, value } = e.target;
    setSpeaker({ ...speaker, [name]: value })
  }

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

  const renderTimerAttribute = () => {
    return (
      <>
        <div className='grid grid-cols-2 gap-2'>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="supplyTimer"
                value="Nguồn cung cấp"
              />
            </div>
            <TextInput
              id="supplyTimer"
              name="supplyTimer"
              placeholder="DC 12V"
              required
              type="text"
              value={timer.supplyTimer}
              onChange={handleChangeInputTimer}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="switchContacts"
                value="Công tắt tiếp điểm"
              />
            </div>
            <TextInput
              id="switchContacts"
              name="switchContacts"
              required
              placeholder="2 Rơ-le"
              type="text"
              value={timer.switchContacts}
              onChange={handleChangeInputTimer}
            />
          </div>
        </div>

        <div className='grid grid-cols-2 gap-2'>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="maximumLoadContact"
                value="Tiếp điểm tải đối đa"
              />
            </div>
            <TextInput
              id="maximumLoadContact"
              name="maximumLoadContact"
              placeholder="10 A /220VAC/Rơle/Kênh"
              required
              type="text"
              value={timer.maximumLoadContact}
              onChange={handleChangeInputTimer}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="programCapacity"
                value="Dung lượng"
              />
            </div>
            <TextInput
              id="programCapacity"
              name="programCapacity"
              required
              placeholder="2 chương trình hẹn giờ (2 TẮT & 2 BẬT)/ Kênh"
              type="text"
              value={timer.programCapacity}
              onChange={handleChangeInputTimer}
            />
          </div>
        </div>

        <div className='grid grid-cols-2 gap-2'>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="saveProgram"
                value="Trình lưu"
              />
            </div>
            <TextInput
              id="saveProgram"
              name="saveProgram"
              placeholder="Chương trình vẫn được lưu khi không có nguồn cung cấp"
              required
              type="text"
              value={timer.saveProgram}
              onChange={handleChangeInputTimer}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="batteryMemory"
                value="Bộ nhớ pin"
              />
            </div>
            <TextInput
              id="batteryMemory"
              name="batteryMemory"
              required
              placeholder="CR 2032"
              type="text"
              value={timer.batteryMemory}
              onChange={handleChangeInputTimer}
            />
          </div>
        </div>
      </>
    )
  }

  const renderSpeakerAttribute = () => {
    return (
      <>
        <div className='grid grid-cols-2 gap-2'>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="frequencyResponse"
                value="Đáp tuyến tần số"
              />
            </div>
            <TextInput
              id="frequencyResponse"
              name="frequencyResponse"
              required
              placeholder="1,5-13 KHz"
              type="text"
              value={speaker.frequencyResponse}
              onChange={handleChangeInputSpeaker}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="maxHandlingCapacity"
                value="Công suất xử lý tối đa"
              />
            </div>
            <TextInput
              id="maxHandlingCapacity"
              name="maxHandlingCapacity"
              required
              placeholder="80W"
              type="text"
              value={speaker.maxHandlingCapacity}
              onChange={handleChangeInputSpeaker}
            />
          </div>
        </div>

        <div className='grid grid-cols-2 gap-2'>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="averageSensitivity"
                value="Độ nhạy trung bình"
              />
            </div>
            <TextInput
              id="averageSensitivity"
              name="averageSensitivity"
              placeholder="103dB"
              required
              type="text"
              value={speaker.averageSensitivity}
              onChange={handleChangeInputSpeaker}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="maximumPowerHandlingCapacity"
                value="Xử lý công xuất tối đa đạt được"
              />
            </div>
            <TextInput
              id="maximumPowerHandlingCapacity"
              name="maximumPowerHandlingCapacity"
              required
              placeholder="75 W (EIA RS426) "
              type="text"
              value={speaker.maximumPowerHandlingCapacity}
              onChange={handleChangeInputSpeaker}
            />
          </div>
        </div>

        <div className='grid grid-cols-2 gap-2'>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="maximumVoltage"
                value="Điện áp tối đa"
              />
            </div>
            <TextInput
              id="maximumVoltage"
              name="maximumVoltage"
              placeholder="15 V rms liên tục / 35 V rms gián đoạn"
              required
              type="text"
              value={speaker.maximumVoltage}
              onChange={handleChangeInputSpeaker}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="overallDimensionsv"
                value="Kích thước tổng thể (Cao x Rộng X Dài)"
              />
            </div>
            <TextInput
              id="overallDimensions"
              name="overallDimensions"
              required
              placeholder="39,0 x 39,0 x 21,0 cm"
              type="text"
              value={speaker.overallDimensions}
              onChange={handleChangeInputSpeaker}
            />
          </div>
        </div>

        <div className='grid grid-cols-2 gap-2'>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="totalDriver"
                value="Tổng trình điều khiển"
              />
            </div>
            <TextInput
              id="totalDriver"
              name="totalDriver"
              placeholder="6 x 2 = 12"
              required
              type="text"
              value={speaker.totalDriver}
              onChange={handleChangeInputSpeaker}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="material"
                value="Chất liệu"
              />
            </div>
            <TextInput
              id="material"
              name="material"
              required
              placeholder="Tấm Besi Tebal 1.5mm"
              type="text"
              value={speaker.material}
              onChange={handleChangeInputSpeaker}
            />
          </div>
        </div>

        <div className='gap-2'>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="impedance"
                value="Trở kháng"
              />
            </div>
            <TextInput
              id="impedance"
              name="impedance"
              placeholder="
                8 Ohms
                / 6.420 Ohms @1 KHz
                / 7.232 Ohms @10 KHz"
              required
              type="text"
              value={speaker.impedance}
              onChange={handleChangeInputSpeaker}
            />
          </div>
        </div>
      </>
    )
  }

  const renderAmplifierAttribute = () => {
    return (
      <>
        <div className='grid grid-cols-2 gap-2'>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="channelInput"
                value="Kênh đầu vào"
              />
            </div>
            <TextInput
              id="channelInput"
              name="channelInput"
              placeholder="2"
              required
              type="text"
              value={amplifier.channelInput}
              onChange={handleChangeInputAmplifier}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="channelOutput"
                value="Kênh đầu ra"
              />
            </div>
            <TextInput
              id="channelOutput"
              name="channelOutput"
              required
              placeholder="4"
              type="text"
              value={amplifier.channelOutput}
              onChange={handleChangeInputAmplifier}
            />
          </div>
        </div>

        <div className='grid grid-cols-2 gap-2'>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="amplifierClass"
                value="Lớp khuếch đại"
              />
            </div>
            <TextInput
              id="amplifierClass"
              name="amplifierClass"
              placeholder="D"
              required
              type="text"
              value={amplifier.amplifierClass}
              onChange={handleChangeInputAmplifier}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="autoSwitching"
                value="Tự động chuyển đổi"
              />
            </div>
            <TextInput
              id="autoSwitching"
              name="autoSwitching"
              required
              placeholder="AC <=> DC"
              type="text"
              value={amplifier.autoSwitching}
              onChange={handleChangeInputAmplifier}
            />
          </div>
        </div>

        <div className='grid grid-cols-2 gap-2'>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="autoAdjustVoltage"
                value="Tự động điều chỉnh điện áp"
              />
            </div>
            <TextInput
              id="autoAdjustVoltage"
              name="autoAdjustVoltage"
              placeholder="110 - 230 V"
              required
              type="text"
              value={amplifier.autoAdjustVoltage}
              onChange={handleChangeInputAmplifier}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="weight"
                value="Trọng lượng"
              />
            </div>
            <TextInput
              id="weight"
              name="weight"
              required
              placeholder="2 kg"
              type="text"
              value={amplifier.weight}
              onChange={handleChangeInputAmplifier}
            />
          </div>
        </div>

        <div className='grid gap-2'>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="overallDimensions"
                value="Kích thước tổng thể (Cao x Rộng x Dài)"
              />
            </div>
            <TextInput
              id="overallDimensions"
              name="overallDimensions"
              placeholder="55 x 210 x 188mm"
              required
              type="text"
              value={amplifier.overallDimensions}
              onChange={handleChangeInputAmplifier}
            />
          </div>
        </div>
      </>
    )
  }

  // Select, preview and remove image
  const [variants, setVariants] = React.useState([{
    color: "",
    price: "",
    images: []
  }]);

  const handleAddVariant = () => {
    const newVariant = {
      color: "",
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
    color: "",
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
    } if (variants.color === "") {
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

  const handleColorChange = (index, event) => {
    const variantsCopy = [...variants];
    variantsCopy[index].color = event.target.value;

    setVariants(variantsCopy);
    setError({ color: "" })
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
                    htmlFor="color"
                    value="Màu sắc"
                  />
                </div>
                <TextInput
                  id="color"
                  name="color"
                  required
                  placeholder="Màu của sản phẩm"
                  defaultValue={variant.color}
                  onChange={(event) => handleColorChange(index, event)}
                />
                <p class="mt-1 text-sm text-red-500">
                  {error.color}
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
    setTimer({
      supplyTimer: "",
      switchContacts: "",
      maximumLoadContact: "",
      programCapacity: "",
      saveProgram: "",
      batteryMemory: ""
    });

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

  const choseValue = (value) => {
    console.log(value)
    switch (value) {
      case "Timer":
        return {
          supplyTimer: timer.supplyTimer,
          switchContacts: timer.switchContacts,
          maximumLoadContact: timer.maximumLoadContact,
          programCapacity: timer.programCapacity,
          saveProgram: timer.saveProgram,
          batteryMemory: timer.batteryMemory
        };
      case "Speaker":
        return {
          frequencyResponse: speaker.frequencyResponse,
          averageSensitivity: speaker.averageSensitivity,
          maximumPowerHandlingCapacity: speaker.maximumPowerHandlingCapacity,
          maximumVoltage: speaker.maximumVoltage,
          overallDimensions: speaker.overallDimensions,
          impedance: speaker.impedance,
          maxHandlingCapacity: speaker.maxHandlingCapacity,
          totalDriver: speaker.totalDriver,
          material: speaker.material
        };
      case "Amplifier":
        return {
          channelInput: amplifier.channelInput,
          channelOutput: amplifier.channelOutput,
          amplifierClass: amplifier.amplifierClass,
          autoSwitching: amplifier.autoSwitching,
          autoAdjustVoltage: amplifier.autoAdjustVoltage,
          overallDimensions: amplifier.overallDimensions,
          weight: amplifier.weight
        };
      default:
        setError({ category: "" })
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      productName: newProduct.productName,
      description: description,
      category: selectedValue,
      subCategory: selectedSubCategoryValue,
      origin: newProduct.origin,
      brand: selectedBrandValue,
      video: newProduct.video,
      variants: variants,
      ...choseValue(selectedCategoryName?.categoryName)
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
      // Create the appropriate product type based on the selected category
      const createProductType = async (productType) => {
        console.log(productType)
        switch (productType) {
          case "Timer":
            return await createTimer(data);
          case "Speaker":
            return await createSpeaker(data);
          case "Amplifier":
            return await createAmplifier(data);
          default:
            setError({ category: "" })
        }
      };

      // Create the product
      return await createProductType(selectedCategoryName?.categoryName)
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
                {/* <div>
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
                </div> */}
              </div>

              {
                selectedValue === "" ? ""
                  : selectedCategoryName?.categoryName === "Timer" ? renderTimerAttribute()
                    : selectedCategoryName?.categoryName === "Speaker" ? renderSpeakerAttribute()
                      : selectedCategoryName?.categoryName === "Amplifier" ? renderAmplifierAttribute()
                        : ""
              }

              {displayPreview()}

              <div className='mt-4'>
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={handleAddVariant}
                >Thêm màu sản phẩm</Button>
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