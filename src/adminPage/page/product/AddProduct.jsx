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
import { Checkbox, Label, TextInput, Select, Textarea } from 'flowbite-react';
import { createTimer, getCategories } from '../../../api/apiServices';

export default function AddProduct(props) {

  // Declare global variables to create product
  const { open, close } = props;
  const [select, setSelect] = React.useState([]);
  // const [] = React.useState("");
  // const [] = React.useState("");
  // const [] = React.useState("");
  // const [] = React.useState("");
  // const [] = React.useState("");

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
  const [selectedValue, setSelectedValue] = React.useState('');
  const handleSelect = (e) => {
    // Set the state variable to the selected value.
    setSelectedValue(e.target.value);
  }

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
              placeholder="DC 12V"
              required
              type="text"
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
              required
              placeholder="2 Rơ-le"
              type="text"
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
              placeholder="10 A /220VAC/Rơle/Kênh"
              required
              type="text"
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
              required
              placeholder="2 chương trình hẹn giờ (2 TẮT & 2 BẬT)/ Kênh"
              type="text"
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
              placeholder="Chương trình vẫn được lưu khi không có nguồn cung cấp"
              required
              type="text"
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
              required
              placeholder="CR 2032"
              type="text"
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
              required
              placeholder="1,5-13 KHz"
              type="text"
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
              required
              placeholder="80W"
              type="text"
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
              placeholder="103dB"
              required
              type="text"
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
              required
              placeholder="75 W (EIA RS426) "
              type="text"
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
              placeholder="15 V rms liên tục / 35 V rms gián đoạn"
              required
              type="text"
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
              required
              placeholder="39,0 x 39,0 x 21,0 cm"
              type="text"
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
              placeholder="6 x 2 = 12"
              required
              type="text"
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
              required
              placeholder="Tấm Besi Tebal 1.5mm"
              type="text"
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
                placeholder="
              8 Ohms
              / 6.420 Ohms @1 KHz
              / 7.232 Ohms @10 KHz"
                required
                type="text"
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
              placeholder="2"
              required
              type="text"
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
              required
              placeholder="4"
              type="text"
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
              placeholder="D"
              required
              type="text"
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
              required
              placeholder="AC <=> DC"
              type="text"
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
              placeholder="110 - 230 V"
              required
              type="text"
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
              required
              placeholder="2 kg"
              type="text"
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
              placeholder="55 x 210 x 188mm"
              required
              type="text"
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

  // Declare variables to create Timer


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
                      htmlFor="name"
                      value="Tên sản phẩm"
                    />
                  </div>
                  <TextInput
                    id="name"
                    placeholder="Tên sản phẩm"
                    required
                    type="text"
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
                    required
                    placeholder="Viet Nam"
                    type="text"
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
                    required
                    defaultValue={"Chọn loại sản phẩm"}
                    onChange={handleSelect}
                  >
                    <option value={"Chọn loại sản phẩm"}>
                      Chọn loại sản phẩm
                    </option>
                    {select?.map((option) => (
                      <option key={option._id} value={option.categoryName}>
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
                    required
                  >
                    {select?.map((option) => (
                      <option key={option._id} value={option.categoryName}>
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
                    value="Mô tả sản phẩm"
                  />
                </div>
                <Textarea
                  id="description"
                  placeholder="Mô tả sản phẩm"
                  required
                  rows={4}
                />
              </div>

              {
                selectedValue === "" ? "" 
                : selectedValue === "Timer" ? renderTimerAttribute() 
                : selectedValue === "Speaker" ? renderSpeakerAttribute()
                : selectedValue === "Amplifier" ? renderAmplifierAttribute()
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
                    <input id="dropzone-file" type="file" class="hidden" multiple onChange={handleFileUpload} />
                    
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
            <Button variant="contained" >
              Xác nhận
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </div>
  );
}