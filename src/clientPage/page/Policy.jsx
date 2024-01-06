import React, { useState, useEffect, useRef } from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import cooperateImg from "../../asset/img/wepik-export-20231121015625G76j.png";
// import Card from "../component/Card";

export default function Policy() {
	const [value, setValue] = useState('1');

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	  }, [])

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<>
			<div className="relative pt-32">
				<div className="flex flex-col items-center mb-2 px-10 md:px-20">
					<strong className="block text-2xl font-bold text-black sm:text-4xl">
						CHÍNH SÁCH CỦA NHÀ YẾN THÂN THI
					</strong>
					<span className="block w-[450px] sm:w-[670px] h-1 bg-yellow-400 rounded"></span>
					<br />
					<span className="">
						<p className="text-md sm:text-xl text-justify">
							NHÀ YẾN THÂN THI xin chân thành cảm ơn Quý khách đã luôn tin tưởng, ủng hộ chúng tôi trong suốt quá trình xây dựng và phát triển.
							Để tiếp tục sứ mệnh “Giúp hàng ngàn người Việt thành công từ nhà nuôi Yến”. NHÀ YẾN THÂN THI cam kết nỗ lực hết mình để hoàn thiện
							và cung cấp những sản phẩm, dịch vụ chất lượng tốt nhất, đồng hành cùng quý khách trên con đường xây dựng sự nghiệp thành công, thịnh vượng.
						</p>
						<br />
						<strong
							class="text-left mr-auto block text-sm font-bold text-black sm:text-lg"
						>
							Trân trọng!
						</strong>
					</span>
				</div>
				<Box sx={{ width: '100%', typography: 'body1' }}>
					<TabContext value={value}>
						<Box sx={{
							display: 'flex',
							justifyContent: 'center',
							borderBottom: 1,
							borderColor: 'divider',
						}}>
							<TabList
								value={value}
								onChange={handleChange}
								sx={{
									"& .MuiTabs-indicator": {
										backgroundColor: "#eab308", // Set the tab indicator color
									}
								}}
							>
								<Tab label="MUA HÀNG" value="1"
									sx={{
										"&.Mui-selected": {
											color: "#eab308", // Add '#' and fix the color value
										},
									}}
								/>
								<Tab label="GIAO HÀNG" value="2"
									sx={{
										"&.Mui-selected": {
											color: "#eab308", // Add '#' and fix the color value
										},
									}}
								/>
								<Tab label="ĐỔI TRẢ VÀ BẢO HÀNH" value="3"
									sx={{
										"&.Mui-selected": {
											color: "#eab308", // Add '#' and fix the color value
										},
									}}
								/>
								<Tab label="ĐẠI LÝ" value="4"
									sx={{
										"&.Mui-selected": {
											color: "#eab308", // Add '#' and fix the color value
										},
									}}
								/>
								<Tab label="BẢO MẬT THÔNG TIN" value="5"
									sx={{
										"&.Mui-selected": {
											color: "#eab308", // Add '#' and fix the color value
										},
									}}
								/>
							</TabList>
						</Box>
						<TabPanel value="1">
							<div className="text-left px-10 md:px-20">
								<div className="flex items-center pb-2">
									<span class="block mr-2 w-1 h-7 bg-yellow-400 rounded"></span>
									<strong
										class="block text-xl font-bold text-black sm:text-2xl"
									>
										HƯỚNG DẪN MUA HÀNG
									</strong>
								</div>
								<div className="space-y-2">
									<span className="">
										<strong className="block text-sm font-bold text-black sm:text-lg">
											Cách 1: <span className="text-sm text-black sm:text-lg font-normal">Gọi điện trực tiếp tới Hotline: 09 6789 8779 - 0919 4848 18</span>
										</strong>
									</span>
									<span className="">
										<strong className="block text-sm font-bold text-black sm:text-lg">
											Cách 2: <span className="text-sm text-black sm:text-lg font-normal">Đặt hàng trực tiếp tại Website: http://www.yenkiengiang.com/</span>
										</strong>
									</span>
									<span className="">
										<strong className="block text-sm font-bold text-black sm:text-lg">
											Cách 3: <span className="text-sm text-black sm:text-lg font-normal">Để lại thông tin trên Fanpage: https://www.facebook.com/thanthi.nhayen</span>
										</strong>
									</span>
									<span className="">
										<strong className="block text-sm font-bold text-black sm:text-lg">
											Cách 4: <span className="text-sm text-black sm:text-lg font-normal">Mua hàng tại địa chỉ: C11-L60 đường 3 tháng 2, phường Vĩnh Lạc, Thành phố Rạch Giá, Kiên Giang</span>
										</strong>
									</span>
								</div>
								<br />
								<div className="flex items-center pb-2">
									<span class="block mr-2 w-1 h-7 bg-yellow-400 rounded"></span>
									<strong
										class="block text-xl font-bold text-black sm:text-2xl"
									>
										SAU KHI TIẾP NHẬN THÔNG TIN
									</strong>
								</div>
								<div className="space-y-2">
									<span className="">
										<strong className="block text-sm font-bold text-black sm:text-lg">
											Bước 1: <span className="text-sm text-black sm:text-lg font-normal">Tư vấn đưa ra các giải pháp, sản phẩm phù hợp cho khách hàng.</span>
										</strong>
									</span>
									<span className="">
										<strong className="block text-sm font-bold text-black sm:text-lg">
											Bước 2: <span className="text-sm text-black sm:text-lg font-normal">Tiến hành báo giá và lập hóa đơn cho khách hàng.</span>
										</strong>
									</span>
									<span className="">
										<strong className="block text-sm font-bold text-black sm:text-lg">
											Bước 3: <span className="text-sm text-black sm:text-lg font-normal">Thanh toán</span>
										</strong>
									</span>
									<span className="">
										<strong className="block text-sm font-bold text-black sm:text-lg">
											Bước 4: <span className="text-sm text-black sm:text-lg font-normal">Giao hàng là thỏa thuận của khách hàng về thời gian và hình thức giao hàng.
												Nhà yến Thân Thi sẽ hỗ trợ tư vấn hình thức giao hàng đảm bảo đến tay khách hàng với chi phí giao hàng tốt nhất </span>
										</strong>
									</span>
									<span className="">
										<strong className="block text-sm font-bold text-black sm:text-lg">
											Lưu ý: <span className="text-sm text-black sm:text-lg font-normal">Quý khách đặt hàng cần chuyển khoản trước rồi Công ty mới xuất hàng.</span>
										</strong>
									</span>
								</div>
								<br />
								<div className="flex items-center pb-2">
									<span class="block mr-2 w-1 h-7 bg-yellow-400 rounded"></span>
									<strong
										class="block text-xl font-bold text-black sm:text-2xl"
									>
										THANH TOÁN
									</strong>
								</div>
								<div className="space-y-2">
									<span className="">
										<strong className="block text-sm font-bold text-black sm:text-lg">
											Tên chủ tài khoản: <span className="text-sm text-black sm:text-lg font-normal">TRẦN THỊ NGỌC THI</span>
										</strong>
									</span>
									<span className="">
										<strong className="block text-sm font-bold text-black sm:text-lg">
											Số tài khoản: <span className="text-sm text-black sm:text-lg font-normal">0091000598929</span>
										</strong>
									</span>
									<span className="">
										<strong className="block text-sm font-bold text-black sm:text-lg">
											Ngân hàng Vietcombank chi nhánh Rạch Giá, Kiên Giang.
										</strong>
									</span>
								</div>
								<br />
								<div className="flex items-center pb-2">
									<span class="block mr-2 w-1 h-7 bg-yellow-400 rounded"></span>
									<strong
										class="block text-xl font-bold text-black sm:text-2xl"
									>
										HUONGỨ DẪN CHUYỂN KHOẢN
									</strong>
								</div>
								<div className="space-y-2">
									<span className="">
										<strong className="block text-sm font-bold text-black sm:text-lg">
											Nội dung chuyển khoản: <span className="text-sm text-black sm:text-lg font-normal">Tên người mua hàng trên hóa đơn + số điện thoại. (VD: TRẦN VĂN A -0123 456 789)</span>
										</strong>
									</span>
									<span className="">
										<strong className="block text-sm font-bold text-black sm:text-lg">
											Chúng tôi sẽ cập nhật hóa đơn khi đã nhận được thông tin chuyển tiền của Quý khách từ Ngân hàng và báo lại cho quý khách đã nhận được thanh toán và xử lý giao hàng cho Quý khách trong thời gian sớm nhất.
										</strong>
									</span>
									<span className="">
										<strong className="block text-sm font-bold text-black sm:text-lg">
											Trân trọng!
										</strong>
									</span>
								</div>
							</div>
						</TabPanel>
						<TabPanel value="2">
							<div className="text-left px-10 md:px-20">
								<div className="flex items-center pb-2">
									<span class="block mr-2 w-1 h-7 bg-yellow-400 rounded"></span>
									<strong
										class="block text-xl font-bold text-black sm:text-2xl"
									>
										HÌNH THỨC GIAO HÀNG
									</strong>
								</div>
								<div className="space-y-2">
									<p className="text-justify">
										Để thuận tiện cho quý khách hiện tại Nhà yến Thân Thi giao hàng theo 2 hình thức chính.
									</p>
									<div>
										<span>
											<strong
												class="block text-sm font-bold text-black sm:text-lg"
											>
												1. Giao hàng qua bưu điện
											</strong>
											<p className="text-justify">
												Thời gian gửi hàng từ 8h sáng thứ 2 đến trước 11h ngày thứ 7.
											</p>
										</span>
										<span>
											<strong
												class="block text-sm font-bold text-black sm:text-lg"
											>
												2. Giao hàng qua nhà xe
											</strong>
											<p className="text-justify">
												Theo thỏa thuận giữa Nhà yến Thân Thi và khách hàng.
											</p>
										</span>
									</div>
								</div>
								<div className="flex items-center pb-2">
									<span class="block mr-2 w-1 h-7 bg-yellow-400 rounded"></span>
									<strong
										class="block text-xl font-bold text-black sm:text-2xl"
									>
										THỜI GIAN GIAO HÀNG
									</strong>
								</div>
								<div className="space-y-2">
									<div>
										<p className="text-justify">
											Thời gian giao hàng dự kiến từ 1-3 ngày tùy vào hình thức giao hàng.
										</p>
										<p className="text-justify">
											Trong một số trường hợp khách quan NHÀ YẾN THÂN THI có thể giao hàng chậm trễ do những điều kiện bất khả kháng như thời tiết xấu, điều kiện giao thông không thuận lợi, xe hỏng hóc trên đường giao hàng, trục trặc trong quá trình xuất hàng.
										</p>
										<p className="text-justify">
											Trong thời gian chờ đợi nhận hàng quý khách có bất cứ thắc mắc gì về thông tin vận chuyển xin vui lòng liên hệ hotline của NHÀ YẾN THÂN THI để nhận trợ giúp.
										</p>
										<p className="text-justify">
											Quý khách vui lòng kiểm tra hàng, số lượng hàng đảm bảo đúng với hóa đơn giao dịch.
										</p>
										<span className="">
											<strong className="block text-sm font-bold text-black sm:text-lg">
												Lưu ý:
											</strong>
											<p className="text-justify">
												- Các đơn hàng đặt trước 15h sẽ được giao trong ngày.
											</p>
											<p className="text-justify">
												- Các đơn hàng đặt sau 15h sẽ được giao vào ngày làm việc kế tiếp.
											</p>
											<p className="text-justify">
												- Phí giao hàng khách hàng tự thỏa thuận với nhà xe.
											</p>
										</span>
									</div>
								</div>
							</div>
						</TabPanel>
						<TabPanel value="3">
							<div className="text-left px-10 md:px-20">
								<div className="flex items-center pb-2">
									<span class="block mr-2 w-1 h-7 bg-yellow-400 rounded"></span>
									<strong
										class="block text-xl font-bold text-black sm:text-2xl"
									>
										THỜI GIAN BẢO HÀNH
									</strong>
								</div>
								<div className="space-y-2">
									<span className="">
										<strong className="block text-sm font-bold text-black sm:text-lg">
											Cách 1: <span className="text-sm text-black sm:text-lg font-normal">Gọi điện trực tiếp tới Hotline: 09 6789 8779 - 0919 4848 18</span>
										</strong>
									</span>
									<span className="">
										<strong className="block text-sm font-bold text-black sm:text-lg">
											Cách 2: <span className="text-sm text-black sm:text-lg font-normal">Đặt hàng trực tiếp tại Website: http://www.yenkiengiang.com/</span>
										</strong>
									</span>
									<span className="">
										<strong className="block text-sm font-bold text-black sm:text-lg">
											Cách 3: <span className="text-sm text-black sm:text-lg font-normal">Để lại thông tin trên Fanpage: https://www.facebook.com/thanthi.nhayen</span>
										</strong>
									</span>
									<span className="">
										<strong className="block text-sm font-bold text-black sm:text-lg">
											Cách 4: <span className="text-sm text-black sm:text-lg font-normal">Mua hàng tại địa chỉ: C11-L60 đường 3 tháng 2, phường Vĩnh Lạc, Thành phố Rạch Giá, Kiên Giang</span>
										</strong>
									</span>
								</div>
								<br />
								<div className="flex items-center pb-2">
									<span class="block mr-2 w-1 h-7 bg-yellow-400 rounded"></span>
									<strong
										class="block text-xl font-bold text-black sm:text-2xl"
									>
										SAU KHI TIẾP NHẬN THÔNG TIN
									</strong>
								</div>
								<div className="space-y-2">
									<span className="">
										<strong className="block text-sm font-bold text-black sm:text-lg">
											Bước 1: <span className="text-sm text-black sm:text-lg font-normal">Tư vấn đưa ra các giải pháp, sản phẩm phù hợp cho khách hàng.</span>
										</strong>
									</span>
									<span className="">
										<strong className="block text-sm font-bold text-black sm:text-lg">
											Bước 2: <span className="text-sm text-black sm:text-lg font-normal">Tiến hành báo giá và lập hóa đơn cho khách hàng.</span>
										</strong>
									</span>
									<span className="">
										<strong className="block text-sm font-bold text-black sm:text-lg">
											Bước 3: <span className="text-sm text-black sm:text-lg font-normal">Thanh toán</span>
										</strong>
									</span>
									<span className="">
										<strong className="block text-sm font-bold text-black sm:text-lg">
											Bước 4: <span className="text-sm text-black sm:text-lg font-normal">Giao hàng là thỏa thuận của khách hàng về thời gian và hình thức giao hàng.
												Nhà yến Thân Thi sẽ hỗ trợ tư vấn hình thức giao hàng đảm bảo đến tay khách hàng với chi phí giao hàng tốt nhất </span>
										</strong>
									</span>
									<span className="">
										<strong className="block text-sm font-bold text-black sm:text-lg">
											Lưu ý: <span className="text-sm text-black sm:text-lg font-normal">Quý khách đặt hàng cần chuyển khoản trước rồi Công ty mới xuất hàng.</span>
										</strong>
									</span>
								</div>
								<br />
								<div className="flex items-center pb-2">
									<span class="block mr-2 w-1 h-7 bg-yellow-400 rounded"></span>
									<strong
										class="block text-xl font-bold text-black sm:text-2xl"
									>
										THANH TOÁN
									</strong>
								</div>
								<div className="space-y-2">
									<span className="">
										<strong className="block text-sm font-bold text-black sm:text-lg">
											Tên chủ tài khoản: <span className="text-sm text-black sm:text-lg font-normal">TRẦN THỊ NGỌC THI</span>
										</strong>
									</span>
									<span className="">
										<strong className="block text-sm font-bold text-black sm:text-lg">
											Số tài khoản: <span className="text-sm text-black sm:text-lg font-normal">0091000598929</span>
										</strong>
									</span>
									<span className="">
										<strong className="block text-sm font-bold text-black sm:text-lg">
											Ngân hàng Vietcombank chi nhánh Rạch Giá, Kiên Giang.
										</strong>
									</span>
								</div>
								<br />
								<div className="flex items-center pb-2">
									<span class="block mr-2 w-1 h-7 bg-yellow-400 rounded"></span>
									<strong
										class="block text-xl font-bold text-black sm:text-2xl"
									>
										HUONGỨ DẪN CHUYỂN KHOẢN
									</strong>
								</div>
								<div className="space-y-2">
									<span className="">
										<strong className="block text-sm font-bold text-black sm:text-lg">
											Nội dung chuyển khoản: <span className="text-sm text-black sm:text-lg font-normal">Tên người mua hàng trên hóa đơn + số điện thoại. (VD: TRẦN VĂN A -0123 456 789)</span>
										</strong>
									</span>
									<span className="">
										<strong className="block text-sm font-bold text-black sm:text-lg">
											Chúng tôi sẽ cập nhật hóa đơn khi đã nhận được thông tin chuyển tiền của Quý khách từ Ngân hàng và báo lại cho quý khách đã nhận được thanh toán và xử lý giao hàng cho Quý khách trong thời gian sớm nhất.
										</strong>
									</span>
									<span className="">
										<strong className="block text-sm font-bold text-black sm:text-lg">
											Trân trọng!
										</strong>
									</span>
								</div>
							</div>
						</TabPanel>
						<TabPanel value="4">
							<div className="text-left px-10 md:px-20">
								<div className="flex items-center pb-2">
									<span class="block mr-2 w-1 h-7 bg-yellow-400 rounded"></span>
									<strong
										class="block text-xl font-bold text-black sm:text-2xl"
									>
										GIÁ TRỊ CỐT LÕI
									</strong>
								</div>
								<div className="space-y-2">
									<span>
										<strong
											class="block text-sm font-bold text-black sm:text-lg"
										>
											Tín
										</strong>
										<p className="text-justify">
											Với triết lý “Uy Tín tạo nên thành công”. NHÀ YẾN THÂN THI xây dựng môi trường làm việc lấy chữ TÍN
											làm nền tảng cho mọi hoạt động kinh doanh, sản xuất- thương mại.
										</p>
									</span>
									<span>
										<strong
											class="block text-sm font-bold text-black sm:text-lg"
										>
											Nhân
										</strong>
										<p className="text-justify">
											NHÀ YẾN THÂN THI xây dựng các mối quan hệ với khách hàng, đối tác dựa trên tinh thần thiện chí,
											nhân ái, tôn trọng và mang tính nhân văn sâu sắc.
										</p>
									</span>
									<span>
										<strong
											class="block text-sm font-bold text-black sm:text-lg"
										>
											Trí
										</strong>
										<p className="text-justify">
											NHÀ YẾN THÂN THI coi sự sáng tạo hợp lý trong công việc là nền tảng để phát triển. Là điểm mấu chốt để nâng cao
											chất lượng dịch vụ hoàn thành vai trò “người phục vụ khách hàng tốt nhất”.
										</p>
									</span>
									<span>
										<strong
											class="block text-sm font-bold text-black sm:text-lg"
										>
											Tốc
										</strong>
										<p className="text-justify">
											Với đặc thù của nghề Nhà Nuôi Yến. NHÀ YẾN THÂN THI chỉ đưa ra những quyết định khi có đủ thông tin, các yếu tố kỹ thuật.
											Do đó, chúng tôi làm việc trên tinh thần tận tâm, tận lực thu thập đầy đủ thông tin, dữ liệu trước khi ra quyết định, tiết
											kiệm tối đa thời gian và tiền bạc cho đối tác, khách hàng.
										</p>
									</span>
									<span>
										<strong
											class="block text-sm font-bold text-black sm:text-lg"
										>
											Kỷ
										</strong>
										<p className="text-justify">
											NHÀ YẾN THÂN THI trên tinh thần “kỷ luật là nguyên tắc” tạo nên những con người có phong cách làm việc chuẩn mực, phong
											cách sống đúng đắn. Tôn trọng các giá trị cốt lõi, giá trị nhân văn, tinh thần dân tộc.
										</p>
									</span>
									<span>
										<strong
											class="block text-sm font-bold text-black sm:text-lg"
										>
											Hợp
										</strong>
										<p className="text-justify">
											NHÀ YẾN THÂN THI đề cao mối quan hệ tương- hỗ “tương tác và hỗ trợ lẫn nhau”. Phối hợp- hợp tác trở thành một
											chỉnh thể đoàn kết, có sức mạnh và phát triển thịnh vượng.
										</p>
									</span>
								</div>
							</div>
						</TabPanel>
						<TabPanel value="5">
							<div className="text-left px-10 md:px-20">
								<div className="flex items-center pb-2">
									<span class="block mr-2 w-1 h-7 bg-yellow-400 rounded"></span>
									<strong
										class="block text-xl font-bold text-black sm:text-2xl"
									>
										GIÁ TRỊ CỐT LÕI
									</strong>
								</div>
								<div className="space-y-2">
									<span>
										<strong
											class="block text-sm font-bold text-black sm:text-lg"
										>
											Tín
										</strong>
										<p className="text-justify">
											Với triết lý “Uy Tín tạo nên thành công”. NHÀ YẾN THÂN THI xây dựng môi trường làm việc lấy chữ TÍN
											làm nền tảng cho mọi hoạt động kinh doanh, sản xuất- thương mại.
										</p>
									</span>
									<span>
										<strong
											class="block text-sm font-bold text-black sm:text-lg"
										>
											Nhân
										</strong>
										<p className="text-justify">
											NHÀ YẾN THÂN THI xây dựng các mối quan hệ với khách hàng, đối tác dựa trên tinh thần thiện chí,
											nhân ái, tôn trọng và mang tính nhân văn sâu sắc.
										</p>
									</span>
									<span>
										<strong
											class="block text-sm font-bold text-black sm:text-lg"
										>
											Trí
										</strong>
										<p className="text-justify">
											NHÀ YẾN THÂN THI coi sự sáng tạo hợp lý trong công việc là nền tảng để phát triển. Là điểm mấu chốt để nâng cao
											chất lượng dịch vụ hoàn thành vai trò “người phục vụ khách hàng tốt nhất”.
										</p>
									</span>
									<span>
										<strong
											class="block text-sm font-bold text-black sm:text-lg"
										>
											Tốc
										</strong>
										<p className="text-justify">
											Với đặc thù của nghề Nhà Nuôi Yến. NHÀ YẾN THÂN THI chỉ đưa ra những quyết định khi có đủ thông tin, các yếu tố kỹ thuật.
											Do đó, chúng tôi làm việc trên tinh thần tận tâm, tận lực thu thập đầy đủ thông tin, dữ liệu trước khi ra quyết định, tiết
											kiệm tối đa thời gian và tiền bạc cho đối tác, khách hàng.
										</p>
									</span>
									<span>
										<strong
											class="block text-sm font-bold text-black sm:text-lg"
										>
											Kỷ
										</strong>
										<p className="text-justify">
											NHÀ YẾN THÂN THI trên tinh thần “kỷ luật là nguyên tắc” tạo nên những con người có phong cách làm việc chuẩn mực, phong
											cách sống đúng đắn. Tôn trọng các giá trị cốt lõi, giá trị nhân văn, tinh thần dân tộc.
										</p>
									</span>
									<span>
										<strong
											class="block text-sm font-bold text-black sm:text-lg"
										>
											Hợp
										</strong>
										<p className="text-justify">
											NHÀ YẾN THÂN THI đề cao mối quan hệ tương- hỗ “tương tác và hỗ trợ lẫn nhau”. Phối hợp- hợp tác trở thành một
											chỉnh thể đoàn kết, có sức mạnh và phát triển thịnh vượng.
										</p>
									</span>
								</div>
							</div>
						</TabPanel>
					</TabContext>
				</Box>
			</div>
		</>
	)
}