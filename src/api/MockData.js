export const mockProducts = [
  {
    id: '1',
    name: 'Khóa học Lập trình Web với ReactJS',
    price: 850000,
    image: 'https://placehold.co/400x300/FFD700/000000?text=ReactJS+Course',
    shortDescription: 'Học ReactJS từ cơ bản đến nâng cao để xây dựng ứng dụng web hiện đại.',
    longDescription: 'Khóa học này bao gồm các kiến thức chuyên sâu về React Hooks, Context API, Redux, React Router và cách tối ưu hiệu suất ứng dụng. Bạn sẽ được thực hành qua nhiều dự án thực tế.',
    reviews: 5, 
    numReviews: 120, 
  },
  {
    id: '2',
    name: 'Giáo trình Tiếng Anh Giao tiếp cho người mới bắt đầu',
    price: 450000,
    image: 'https://placehold.co/400x300/87CEEB/000000?text=English+Book',
    shortDescription: 'Tài liệu toàn diện giúp bạn tự tin giao tiếp tiếng Anh hàng ngày.',
    longDescription: 'Giáo trình được thiết kế đặc biệt cho người mới bắt đầu, tập trung vào các tình huống giao tiếp thực tế, từ vựng thông dụng và ngữ pháp cơ bản. Kèm theo bài tập thực hành và file nghe.',
    reviews: 4.8,
    numReviews: 90,
  },
  {
    id: '3',
    name: 'Lớp học Online Marketing tổng thể',
    price: 1200000,
    image: 'https://placehold.co/400x300/90EE90/000000?text=Marketing+Class',
    shortDescription: 'Nắm vững các chiến lược Marketing Online từ SEO, SEM đến Social Media.',
    longDescription: 'Khóa học chuyên sâu về Digital Marketing, bao gồm SEO On-page/Off-page, Google Ads, Facebook Ads, Content Marketing, Email Marketing và phân tích dữ liệu. Phù hợp cho chủ doanh nghiệp và Marketer.',
    reviews: 4.9,
    numReviews: 150,
  },
  {
    id: '4',
    name: 'Ebook Kỹ năng Quản lý Thời gian hiệu quả',
    price: 150000,
    image: 'https://placehold.co/400x300/DDA0DD/000000?text=Time+Management',
    shortDescription: 'Bí quyết sắp xếp công việc, tối ưu năng suất cá nhân.',
    longDescription: 'Ebook cung cấp các phương pháp và công cụ quản lý thời gian tiên tiến như Pomodoro, Eisenhower Matrix, GTD. Giúp bạn làm việc hiệu quả hơn và giảm căng thẳng.',
    reviews: 4.7,
    numReviews: 70,
  },
  {
    id: '5',
    name: 'Khóa học Thiết kế UI/UX với Figma',
    price: 950000,
    image: 'https://placehold.co/400x300/FFB6C1/000000?text=Figma+Course',
    shortDescription: 'Học cách thiết kế giao diện người dùng và trải nghiệm người dùng chuyên nghiệp.',
    longDescription: 'Khóa học thực hành chuyên sâu về Figma, từ các công cụ cơ bản đến tạo prototype động, hệ thống thiết kế và làm việc nhóm. Phù hợp cho người muốn trở thành UI/UX Designer.',
    reviews: 5,
    numReviews: 110,
  },
  {
    id: '6',
    name: 'Tài liệu luyện thi IELTS cấp tốc',
    price: 600000,
    image: 'https://placehold.co/400x300/ADD8E6/000000?text=IELTS+Material',
    shortDescription: 'Bộ tài liệu tổng hợp giúp bạn đạt điểm cao trong kỳ thi IELTS.',
    longDescription: 'Tài liệu bao gồm các mẹo làm bài, bài tập thực hành cho cả 4 kỹ năng Nghe, Nói, Đọc, Viết, cùng với các đề thi mẫu và đáp án chi tiết. Cập nhật theo format mới nhất.',
    reviews: 4.6,
    numReviews: 80,
  },
  {
    id: '7',
    name: 'Khóa học Khoa học Dữ liệu với Python',
    price: 1500000,
    image: 'https://placehold.co/400x300/AFEEEE/000000?text=Data+Science',
    shortDescription: 'Khám phá thế giới dữ liệu và học cách phân tích, dự đoán bằng Python.',
    longDescription: 'Khóa học toàn diện về Khoa học Dữ liệu, bao gồm Python, Pandas, NumPy, Matplotlib, Scikit-learn, và các thuật toán Machine Learning cơ bản. Thực hành với các bộ dữ liệu thực tế.',
    reviews: 4.9,
    numReviews: 130,
  },
  {
    id: '8',
    name: 'Sách "Tư duy phản biện cho người trẻ"',
    price: 280000,
    image: 'https://placehold.co/400x300/F0E68C/000000?text=Critical+Thinking',
    shortDescription: 'Phát triển khả năng phân tích, đánh giá thông tin một cách khách quan.',
    longDescription: 'Cuốn sách này giúp bạn rèn luyện tư duy phản biện, nhận diện lỗi ngụy biện, đưa ra quyết định sáng suốt và giải quyết vấn đề hiệu quả trong cuộc sống và công việc.',
    reviews: 4.7,
    numReviews: 60,
  },
];

export const mockAISuggestions = (userId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.1) {
        reject(new Error('Không thể lấy gợi ý lúc này. Vui lòng thử lại sau.'));
        return;
      }
      const suggestedProductIds = ['1', '3', '5', '7'];
      const suggestions = mockProducts.filter(p => suggestedProductIds.includes(p.id));
      resolve(suggestions);
    }, 1500);
  });
};