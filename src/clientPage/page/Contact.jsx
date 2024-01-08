import React, { useState, useEffect, useRef, useCallback } from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import contact_img from "../../asset/img/contact_img.avif";
import nhayenthanthi from "../../asset/img/nhayenthanthi.jpg";
import { Link, useNavigate } from "react-router-dom";
import { createCustomer, getContacts, getNews } from "../../api/apiServices";
import slugify from 'slugify';
import CallIcon from '@mui/icons-material/Call';
import { Label, TextInput, Textarea } from "flowbite-react";
import isEmail from "validator/lib/isEmail";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function News() {
	const navigate = useNavigate();
	const [data, setData] = useState([]);

	const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });

		getContacts()
			.then(res => {
				setData(res.data.data)
			})
			.catch(err => {
				console.log(err)
			})
	}, [])

	const [customerData, setCustomerData] = useState({
		firstName: "",
		lastName: "",
		numberPhone: "",
		email: "",
		message: "",
	})

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
		if (customerData.email === "") {
			msg.email = "Vui lòng điền email!"
		} else if (!isEmail(customerData.email)) {
			msg.email = "Email không đúng định dạng!"
		} if (customerData.numberPhone === "") {
			msg.numberPhone = "Vui lòng điền số điện thoại!"
		} else if (!isVietnamesePhoneNumber(customerData.numberPhone)) {
			msg.numberPhone = "Số điện thoại không đúng!"
		} if (customerData.firstName === "") {
			msg.firstName = "Vui lòng nhập họ của bạn!"
		} if (customerData.lastName === "") {
			msg.lastName = "Vui lòng nhập tên tên!"
		} if (customerData.message === "") {
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
		setCustomerData({ ...customerData, [name]: value })
		setError({ ...error, [name]: "" })
	}

	const listContact = data.map((val, index) => {
		return (
			<div className="lg:basis-[calc(100%/3-16px)] m-auto flex justify-center items-center">
				<div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-2">
					<div className="flex justify-center item-center">
						<div className="w-14 h-14 bg-yellow-400 rounded-xl p-2 flex items-center justify-center">
							<CallIcon className="h-8 w-8 text-white" />
						</div>
					</div>
					<div className="space-y-2">
						<div className="text-xl font-medium text-black">{val?.contactName}</div>
						<a href={`https://zalo.me/${val?.numberPhone}`} className="text-black hover:underline" target="_blank">{val?.numberPhone}</a>
						<p className="text-gray-500">
							{val?.description}
						</p>
					</div>
				</div>
			</div>
		)
	})

	const clearState = () => {
		setError({
			firstName: "",
			lastName: "",
			numberPhone: "",
			email: "",
			message: "",
		});
		setCustomerData({
			firstName: "",
			lastName: "",
			numberPhone: "",
			email: "",
			message: "",
		});
		setMsgErr("");
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		const data = {
			firstName: customerData.firstName,
			lastName: customerData.lastName,
			numberPhone: customerData.numberPhone,
			email: customerData.email,
			message: customerData.message,
		}
		console.log(data)

		const isValid = validation()
		if (isValid) {

			// Create the category
			await createCustomer(data)
				.then((response) => {
					handleClickOpen();
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
		<>
			<div className="relative pt-20 pb-10">
				<Modal open={open} handleClose={handleClose} />
				<div className="relative w-full h-[320px] lg:h-[620px]">
					<div className="absolute top-2 lg:top-20 left-1/2 transform -translate-x-1/2 z-10 w-[400px] md:w-[600px] lg:w-[800px]">
						<div className="p-4">
							<strong className="block text-md md:text-2xl lg:text-4xl font-bold text-white pb-2">
								LIÊN HỆ CHO CHÚNG TÔI
							</strong>
							<p className="text-sm lg:text-xl text-white">
								Chúng tôi sử dụng các phương pháp tiếp cận linh hoạt để kiểm tra và kết nối với nhu cầu của khách hàng sớm hơn và thường xuyên.
							</p>
						</div>
					</div>
					<form onSubmit={handleSubmit}>
						<div className="absolute space-y-4 p-6 top-40 sm:top-1/2 left-1/2 transform -translate-x-1/2 w-full max-w-[400px] md:max-w-[600px] lg:max-w-[800px] bg-white border border-gray-200 rounded-lg shadow z-10 mx-auto">
							<div className="text-left space-y-6">
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
											value={customerData.firstName}
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
											value={customerData.lastName}
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
											value={customerData.numberPhone}
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
											value={customerData.email}
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
										value={customerData.message}
										onChange={handleChangeInput}
									/>
									<p class="mt-1 text-sm text-red-500">
										{error.message}
									</p>
								</div>
							</div>
							<p className="text-left text-sm text-gray-500">Bằng cách gửi biểu mẫu này, bạn đồng ý với các điều khoản và điều kiện cũng như chính sách quyền riêng tư của chúng tôi.</p>
							<div className="">
								<button type="submit" onClick={handleSubmit} className="mt-2.5 rounded-md bg-yellow-400 px-4 py-2 text-white text-sm font-medium transition hover:bg-yellow-500 flex items-center justify-center">
									Gửi biểu mẫu
								</button>
							</div>
						</div>
					</form>
					<div className="absolute w-full h-full bg-black opacity-40"></div>
					<img src={contact_img} className="w-full h-full object-cover object-center" />
				</div>
				<div className="w-full mx-auto mt-[30rem] lg:mt-80">
					<div className="flex flex-wrap gap-4">
						{listContact}
					</div>
				</div>
				<div className="w-full flex flex-col lg:grid lg:grid-cols-2 px-20 mt-20 gap-4 items-center justify-center">
					<div className="text-center lg:text-right text-gray-900 space-y-2">
						<strong className="block text-md md:text-2xl lg:text-4xl font-bold">
							THÔNG TIN LIÊN HỆ
						</strong>
						<p className="text-sm lg:text-lg text-gray-500">
							MST: 1702141349
						</p>
						<p className="text-sm lg:text-lg text-gray-500">
							STK: 070093974148 - CÔNG TY TNHH TM CUNG CẤP THIẾT BỊ NHÀ YẾN THÂN THI - SACOMBANK CHI NHÁNH RẠCH GIÁ - KIÊN GIANG
						</p>
						<p className="text-sm lg:text-lg text-gray-500">
							STK: 0091000598929 - TRẦN THỊ NGỌC THI - VIETCOMBANK CHI NHÁNH RẠCH GIÁ - KIÊN
						</p>
						<p className="text-sm lg:text-lg text-gray-500">
							Địa chỉ: C11 - L60, đường 3/2, phường Vĩnh Lạc, TP. Rạch Giá, tỉnh Kiên Giang
						</p>
						<p className="text-sm lg:text-lg text-gray-500">
							Email: yensaothanthi@gmail.com
						</p>
					</div>
					<div className="w-[500px] h-[500px]">
						<img src={nhayenthanthi} className="w-full h-full object-center object-cover" />
					</div>
				</div>
			</div>
		</>
	)
}

function Modal({ handleClose, open }) {

	return (
			<React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
				maxWidth="xs" // Set maxWidth to xs
  			fullWidth
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Xác nhận gửi thành công
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
        <DialogContent ddividers style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <Typography gutterBottom>
						<CheckCircleOutlineIcon style={{ fontSize: 60, color: 'green' }} />
          </Typography>
          <Typography gutterBottom>
						Cảm ơn bạn đã liên hệ. Tin nhắn của bạn đã được tiếp nhận và chúng tôi cam kết sẽ phản hồi trong thời gian sớm nhất.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus color="error" variant="contained" onClick={handleClose}>
            Đóng
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
	);
};