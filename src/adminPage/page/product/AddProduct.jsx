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
import { createAmplifier, createSpeaker, createTimer, getCategories } from '../../../api/apiServices';
import UploadFile from '../../../asset/library/UploadFile';

export default function AddProduct(props) {

  // Declare global variables to create product
  const { open, close, row, product } = props;
  const [select, setSelect] = React.useState([]); 

  const [newProduct, setNewProduct] = React.useState({
    productName: "",
    description: "", 
    color: "",
    origin: ""
  });

  const handleChangeInput = (e) => {
    let {name, value} = e.target;
    setNewProduct({...newProduct, [name]: value})
  }

  const selectColor = [
    {id: "red", value: "Đỏ"},
    {id: "black", value: "Đen"},
    {id: "white", value: "Trắng"},
    {id: "blue", value: "Xanh dương"},
    {id: "yellow", value: "Vàng"},
    {id: "purple", value: "Tím"},
    {id: "pink", value: "Hồng"}
  ]

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
    let {name, value} = e.target;
    setTimer({...timer, [name]: value})
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
    let {name, value} = e.target;
    setAmplifier({...amplifier, [name]: value})
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
    let {name, value} = e.target;
    setSpeaker({...speaker, [name]: value})
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
  }, []);

  // Select category options to change attributes
  const [selectedValue, setSelectedValue] = React.useState("");
  const handleSelect = (e) => {
    // Set the state variable to the selected value.
    setSelectedValue(e.target.value);
  }

  // List category to rendert
  const listCategory = select.map(val => {return val._id});

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
                value="Phản hồi thường xuyên"
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
  const [selectedImages, setSelectedImages] = React.useState([]);

  const handleFileUpload = (e) => {
    const files = e.target.files;

    if (files.length === 0) {
      return;
    }
    setSelectedImages([...selectedImages, ...files]);
  };

  const displayPreview = () => {
    return selectedImages.map((image) => {
      const url = URL.createObjectURL(image);
      return (
        <div key={image} className='relative'>
          <div className='h-36 w-36 m-auto relative group border-2 rounded-xl'>
            <img src={url} alt="Preview" className='w-full h-full rounded-xl bg-center bg-cover ' />
          </div>
          <div className='absolute top-0 right-0'>
            <IconButton>
              <HighlightOffIcon onClick={(e) => handleImageDeletion(image, e)}/>
            </IconButton>
          </div>
        </div>
      );
    });
  };

  const handleImageDeletion = (image, e) => {
    // Prevent the default behavior of the onClick event.
    e.preventDefault();

    setSelectedImages(selectedImages.filter((item) => item !== image));

    // Only revoke the URL of the image if it is not in the selectedImages state variable.
    if (!selectedImages.includes(image)) {
      URL.revokeObjectURL(image);
    }
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
      color: "",
      origin: ""
    });

    setSelectedValue("");
    setSelectedImages([]);

    close();
  }

  const choseValue = (value) => {
    switch (value) {
      case listCategory[0]:
        return {
          supplyTimer: timer.supplyTimer,
          switchContacts: timer.switchContacts,
          maximumLoadContact: timer.maximumLoadContact,
          programCapacity: timer.programCapacity,
          saveProgram: timer.saveProgram,
          batteryMemory: timer.batteryMemory
        };
      case listCategory[1]:
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
      case listCategory[2]:
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
        throw new Error('Invalid product type');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      productName: newProduct.productName,
      description: newProduct.description,
      color: newProduct.color,
      category: selectedValue,
      origin: newProduct.origin,
      image: [],
      ...choseValue(selectedValue)
    }
    for (let index = 0; index < selectedImages.length; index++) {
      const element = selectedImages[index];
      const upfile = await UploadFile(element);
      data.image.push(upfile.data);
    }

    // Create the appropriate product type based on the selected category
    const createProductType = async (productType) => {
      switch (productType) {
        case listCategory[0]:
          return await createTimer(data);
        case listCategory[1]:
          return await createSpeaker(data);
        case listCategory[2]:
          return await createAmplifier(data);
        default:
          throw new Error('Invalid product type');
      }
    };

    // Create the product
    return await createProductType(selectedValue)
      .then((response) => {
        row([...product, response.data.data]);
        clearState();
      }) 
      .catch((error) => {
        console.log(error)
      })
   
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
                </div>
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
                </div>
              </div>

              <div className='grid grid-cols-2 gap-2'>
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="category"
                      value="Loại sản phẩm"
                    />
                  </div>
                  <Select
                    id="category"
                    name="category"
                    required
                    defaultValue={"Chọn loại sản phẩm"}
                    onChange={handleSelect}
                  >
                    <option value={"Chọn loại sản phẩm"}>
                      Chọn loại sản phẩm
                    </option>
                    {select?.map((option) => (
                      <option key={option._id} value={option._id}>
                        {option.categoryName}
                      </option>
                    ))}
                  </Select>
                </div>

                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="color"
                      value="Màu sắc"
                    />
                  </div>
                  <Select
                    id="color"
                    name="color"
                    required 
                    defaultValue={"Chọn màu"}
                    value={newProduct.color}
                    onChange={handleChangeInput}
                  >
                    <option value={"Chọn màu"}>
                      Chọn màu
                    </option>
                    {selectColor?.map((option) => (
                      <option key={option._id} value={option.value}>
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
                    value="Mô tả sản phẩm"
                  />
                </div>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Mô tả sản phẩm"
                  required
                  rows={4}
                  value={newProduct.description}
                  onChange={handleChangeInput}
                />
              </div>

              {
                selectedValue === "" ? "" 
                : selectedValue === listCategory[0] ? renderTimerAttribute() 
                : selectedValue === listCategory[1] ? renderSpeakerAttribute()
                : selectedValue === listCategory[2] ? renderAmplifierAttribute()
                : ""
              }

              <div className="mt-2">
                <div class={`flex w-full gap-8 ${selectedImages.length === 4 ? "justify-between" : ""}`}>
                  <label for="dropzone-file" class="flex flex-col items-center justify-center w-36 h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg class="w-8 h-8  text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                      </svg>
                    </div>
                    <input id="dropzone-file"
                      name="image"
                     type="file" class="hidden" multiple onChange={(e) => handleFileUpload(e)} />
                    
                  </label>
                  {displayPreview()}
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