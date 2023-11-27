import React, { useState, useEffect, useRef } from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import cooperateImg from "../../asset/img/wepik-export-20231121015625G76j.png";
// import Card from "../component/Card";

export default function Introduction() {
	const [value, setValue] = useState('1');

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<>
			<div className="relative pt-32">
				<div className="flex flex-col items-center mb-2">
					<strong className="block text-2xl font-bold text-black sm:text-4xl">
						NHÀ YẾN THÂN THI
					</strong>
					<span className="block w-[240px] sm:w-[350px] h-1 bg-yellow-400 rounded"></span>
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
								<Tab label="GIỚI THIỆU" value="1" 
									sx={{
										"&.Mui-selected": {
											color: "#eab308", // Add '#' and fix the color value
										},
									}}
								/>
								<Tab label="TẦM NHÌN VÀ SỨ MỆNH" value="2" 
									sx={{
										"&.Mui-selected": {
											color: "#eab308", // Add '#' and fix the color value
										},
									}}
								/>
								<Tab label="GIÁ TRỊ CỐT LỖI" value="3" 
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
										LỊCH SỬ THÀNH LẬP
									</strong>
								</div>
								<p className="text-justify">
									Được thành lập vào năm 2013 - trải qua một chặng đường dài trong việc nghiên cứu và phát triển về lĩnh vực thiết bị nhà nuôi yến,
									cùng với mong muốn mang đến cho khách hàng những sản phẩm và dịch vụ tốt nhất, ngày nay, CÔNG TY TNHH TM CUNG CẤP THIẾT BỊ NHÀ YẾN THÂN THI
									được nhắc đến như là một trong những nhà cung cấp hàng đầu các giải pháp dịch vụ trọn gói cho hệ thống Nhà Nuôi yến và hệ thống thiết bị lắp
									đặt nhà yến chuyên nghiệp, cũng như hỗ trợ, tư vấn tận tâm cho Quý khách hàng.
								</p>
								<br />
								<p className="text-justify">
									Hiểu được tâm tư và nguyện vọng của khách hàng, NHÀ YẾN THÂN THI luôn không ngừng phấn đấu để đem đến một quy trình phục vụ tốt nhất từ việc lên kế hoạch
									tìm hiểu, Tư vấn cho khách hàng, Thiết kế mô hình nhà nuôi yến, Cung cấp trọn gói hệ thống thiết bị lắp đặt nhà yến hoàn chỉnh và quan tâm
									sát sao đến việc bảo hành, bảo trì sản phẩm cho Quý khách hàng.
									May mắn nhận được sự hỗ trợ từ phía đối tác cũng như sự tin tưởng và tín nhiệm của khách hàng, NHÀ YẾN THÂN THI THÂN THI đã có cơ hội mở rộng quy mô thị
									trường hoạt động từ Trung Bộ trải dài tới Tây Nam Bộ nhằm đáp ứng nhu cầu ngày một cao hơn của khách hàng là các chủ nhà yến, kỹ thuật lắp đặt, đại
									lý phân phối sản phẩm thiết bị… trên Toàn Quốc.
								</p>
								<br />
								<div className="flex items-center pb-2">
									<span class="block mr-2 w-1 h-7 bg-yellow-400 rounded"></span>
									<strong
										class="block text-xl font-bold text-black sm:text-2xl"
									>
										TÌNH HÌNH HIỆN NAY
									</strong>
								</div>
								<p className="text-justify">
									Được thành lập vào năm 2013 - trải qua một chặng đường dài trong việc nghiên cứu và phát triển về lĩnh vực thiết bị nhà nuôi yến,
									cùng với mong muốn mang đến cho khách hàng những sản phẩm và dịch vụ tốt nhất, ngày nay, CÔNG TY TNHH TM CUNG CẤP THIẾT BỊ NHÀ YẾN THÂN THI
									được nhắc đến như là một trong những nhà cung cấp hàng đầu các giải pháp dịch vụ trọn gói cho hệ thống Nhà Nuôi yến và hệ thống thiết bị lắp
									đặt nhà yến chuyên nghiệp, cũng như hỗ trợ, tư vấn tận tâm cho Quý khách hàng.
								</p>
								<br />
								<p className="text-justify">
									Hiểu được tâm tư và nguyện vọng của khách hàng, NHÀ YẾN THÂN THI luôn không ngừng phấn đấu để đem đến một quy trình phục vụ tốt nhất từ việc lên kế hoạch
									tìm hiểu, Tư vấn cho khách hàng, Thiết kế mô hình nhà nuôi yến, Cung cấp trọn gói hệ thống thiết bị lắp đặt nhà yến hoàn chỉnh và quan tâm
									sát sao đến việc bảo hành, bảo trì sản phẩm cho Quý khách hàng.
									May mắn nhận được sự hỗ trợ từ phía đối tác cũng như sự tin tưởng và tín nhiệm của khách hàng, NHÀ YẾN THÂN THI THÂN THI đã có cơ hội mở rộng quy mô thị
									trường hoạt động từ Trung Bộ trải dài tới Tây Nam Bộ nhằm đáp ứng nhu cầu ngày một cao hơn của khách hàng là các chủ nhà yến, kỹ thuật lắp đặt, đại
									lý phân phối sản phẩm thiết bị… trên Toàn Quốc.
								</p>
								<br />
								<div className="flex items-center pb-2">
									<span class="block mr-2 w-1 h-7 bg-yellow-400 rounded"></span>
									<strong
										class="block text-xl font-bold text-black sm:text-2xl"
									>
										NHÓM HÀNG - SẢN PHẨM CHỦ LỰC
									</strong>
								</div>
								<p className="text-justify">
									Nhóm hệ thống gỗ
									Nhóm hệ thống Loa và Amply
									Nhóm hệ thống phun sương, tạo ẩm
									Nhóm dung dịch
									Nhóm thiết bị điện
									Nhóm thiết bị khác
								</p>
								<br />
								<div className="flex items-center pb-2">
									<span class="block mr-2 w-1 h-7 bg-yellow-400 rounded"></span>
									<strong
										class="block text-xl font-bold text-black sm:text-2xl"
									>
										THẾ MẠNH CỦA NHÀ YẾN THÂN THI
									</strong>
								</div>
								<div className="space-y-2">
									<p className="text-justify">
										Có kinh nghiệm hơn 10 năm tìm hiểu và hoạt động trong lĩnh vực cung cấp thiết bị lắp đặt nhà nuôi yến.
									</p>
									<p className="text-justify">
										Sản phẩm mang thương hiệu  được nhập khẩu chính ngạch từ Malaysia, Indonesia, Taiwan,…Quý khách hàng khi
										mua thiết bị tại NHÀ YẾN THÂN THI sẽ được tư vấn và hướng dẫn cách sử dụng tận tâm cùng với chế độ bảo hành sản phẩm đặc biệt dành riêng cho quý khách hàng.
									</p>
									<p className="text-justify">
										Các nhóm sản phẩm đa dạng, chất lượng cao, với mức chi phí cạnh tranh và phù hợp nhất cho từng điều kiện kinh tế của chủ đầu tư.
									</p>
									<p className="text-justify">
										Hệ thống Đại lý phân phối của lớn mạnh trải dài từ Bắc Trung Bộ đến Tây Nam Bộ , đáp ứng mọi nhu cầu xây dựng, lắp đặt nhà yến của chủ nhà yến mọi miền Tổ quốc.
									</p>
									<p className="text-justify">
										Dịch vụ chăm sóc khách hàng, bảo trì, thay thế linh kiện linh hoạt, tận tâm và nhanh chóng.
									</p>
									<p className="text-justify">
										Đội ngũ nhân viên THÂN THI giàu kinh nghiệm, thân thiện, nhịêt tình và đầy trách nhiệm luôn thấu hiểu nhu cầu và phục vụ tối đa quyền lợi cho Quý khách hàng.
									</p>
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
										TẦM NHÌN CHIẾN LƯỢC
									</strong>
								</div>
								<div className="space-y-2">
									<p className="text-justify">
										“NHÀ YẾN THÂN THI- niềm tin hàng đầu của Quý khách hàng về sản phẩm thiết bị và dịch vụ”
									</p>
									<p className="text-justify">
										Với tầm nhìn dài hạn tập trung cho sự phát triển bền vững trở thành công ty tiên phong có tên tuổi và vị thế trên thị trường trong lĩnh vực Nhà nuôi yến.
									</p>
									<p className="text-justify">
										NHÀ YẾN THÂN THI tập trung cơ cấu ở 4 mảng chính gồm:
										<div className="space-y-1 ml-4">
											<p className="text-justify">
												Nghiên cứu cải tiến và phát triển công nghệ sản phẩm theo tiêu chuẩn chất lượng Quốc tế.
											</p>
											<p className="text-justify">
												Nhập khẩu và thương mại Thiết Bị Nhà Yến.
											</p>
											<p className="text-justify">
												Tư vấn và hỗ trợ kỹ thuật lắp đặt thiết bị nhà yến cho khách hàng.
											</p>
											<p className="text-justify">
												Xây dựng kênh thu mua, chế biến và phân phối.
											</p>
										</div>
									</p>
								</div>
								<br />
								<div className="flex items-center pb-2">
									<span class="block mr-2 w-1 h-7 bg-yellow-400 rounded"></span>
									<strong
										class="block text-xl font-bold text-black sm:text-2xl"
									>
										SỨ MỆNH
									</strong>
								</div>
								<div className="space-y-2">
									<p className="text-justify">
										“Giúp hàng ngàn người Việt thành công trong lĩnh vực Nhà Nuôi Yến”
									</p>
									<div>
										<span>
											<strong
												class="block text-sm font-bold text-black sm:text-lg"
											>
												Đối với khách hàng
											</strong>
											<p className="text-justify">
												THÂN THI tận tâm phục vụ đưa ra giải pháp thiết kế xây dựng- cung cấp thiết bị Nhà Nuôi Yến phù hợp đạt
												tiêu chuẩn chất lượng quốc tế. Giúp khách hàng tiết kiệm tối đa chi phí đầu tư và đem về nguồn lợi đáng kể từ Nhà Nuôi Yến.
											</p>
										</span>
										<span>
											<strong
												class="block text-sm font-bold text-black sm:text-lg"
											>
												Đối với đối tác
											</strong>
											<p className="text-justify">
												Trên tinh thần hợp tác cùng phát triển. Tuân thủ các thỏa thuận hợp tác và tuân thủ Pháp luật.
											</p>
										</span>
										<span>
											<strong
												class="block text-sm font-bold text-black sm:text-lg"
											>
												Đối với CBCNV
											</strong>
											<p className="text-justify">
												Xây dựng môi trường làm việc chuyên nghiệp, có nguồn thu nhập cao. Mỗi cá nhân đều có cơ hội học tập,
												phát triển trong môi trường năng động, sáng tạo, mang tính nhân văn và công bằng.
											</p>
										</span>
										<span>
											<strong
												class="block text-sm font-bold text-black sm:text-lg"
											>
												Đối với xã hội
											</strong>
											<p className="text-justify">
												Cân bằng giữa lợi ích doanh nghiệp và lợi ích xã hội. THÂN THI tích cực tham gia đóng góp, xây dựng các
												chương trình vì cộng đồng. Thể hiện tinh thần dân tộc và trách nhiệm đối với xã hội.
											</p>
										</span>
										<span>
											<strong
												class="block text-sm font-bold text-black sm:text-lg"
											>
												Đối với môi trường
											</strong>
											<p className="text-justify">
												Tuân thủ các quy định của Pháp luật về thiết kế- thi công- xây dựng. Bên cạnh đó là bảo vệ môi trường sinh sống cho loài Chim Yến.
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