
import { TarotCard, ReadingTopic } from './types';

export const TAROT_DECK: TarotCard[] = [
  {
    id: 0,
    name: "The Fool",
    arcana: "Major",
    suit: null,
    rank: 0,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg",
    core_theme: ["Khởi đầu", "Tự do", "Tiềm năng vô hạn"],
    symbols: [
      { name: "Vực thẳm", meaning_psychological: "Ngưỡng cửa của sự chưa biết", visual_note: "Chàng trai đứng sát mép đá" },
      { name: "Bông hồng trắng", meaning_psychological: "Sự thuần khiết của ý định", visual_note: "Cầm trên tay trái" },
      { name: "Chú chó", meaning_psychological: "Bản năng bảo vệ hoặc tiếng vang của quá khứ", visual_note: "Nhảy múa bên chân" }
    ],
    psychological_dimensions: ["Sự tò mò", "Sẵn sàng mạo hiểm", "Giải phóng khỏi định kiến"],
    energy_profile: { pace: "nhanh", orientation: "hướng ngoại", tone: "mềm" },
    context_bias: {
      love_focus: "Khởi đầu một mối quan hệ mới hoặc làm mới cảm xúc cũ",
      work_focus: "Dự án mới, ý tưởng táo bạo hoặc thay đổi nghề nghiệp",
      self_focus: "Khám phá những khía cạnh chưa biết của bản thân",
      emotional_focus: "Cảm giác phấn khích xen lẫn một chút lo âu về tương lai"
    },
    action_seeds: ["Thử một thói quen mới nhỏ", "Viết ra một giấc mơ 'điên rồ'"],
    reflection_prompts: ["Điều gì đang ngăn cản bạn bước bước chân đầu tiên?", "Nếu không sợ hãi, bạn sẽ làm gì ngay bây giờ?"]
  },
  {
    id: 1,
    name: "The Magician",
    arcana: "Major",
    suit: null,
    rank: 1,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg",
    core_theme: ["Năng lực thực thi", "Sáng tạo", "Tập trung"],
    symbols: [
      { name: "Bàn đạo cụ", meaning_psychological: "Nguồn lực sẵn có bên trong", visual_note: "Đủ 4 biểu trưng Wands, Cups, Swords, Pentacles" },
      { name: "Cánh tay chỉ lên/xuống", meaning_psychological: "Sự kết nối giữa ý tưởng và thực tại", visual_note: "Một tay hướng trời, một tay hướng đất" }
    ],
    psychological_dimensions: ["Cảm giác tự tin", "Khả năng giải quyết vấn đề", "Sự chủ động"],
    energy_profile: { pace: "nhanh", orientation: "hướng ngoại", tone: "mạnh" },
    context_bias: {
      love_focus: "Chủ động bày tỏ hoặc kiến tạo không gian kết nối",
      work_focus: "Sử dụng tối đa kỹ năng để hoàn thành mục tiêu",
      self_focus: "Nhận diện những thế mạnh cá nhân",
      emotional_focus: "Trạng thái tỉnh táo và đầy năng lượng"
    },
    action_seeds: ["Lập danh sách các nguồn lực bạn đang có", "Bắt tay vào làm việc đã trì hoãn"],
    reflection_prompts: ["Bạn đang sở hữu công cụ nào mà mình chưa dùng đến?", "Làm thế nào để biến ý tưởng thành hành động cụ thể?"]
  },
  {
    id: 17,
    name: "The Star",
    arcana: "Major",
    suit: null,
    rank: 17,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_17_Star.jpg",
    core_theme: ["Hy vọng", "Chữa lành", "Sự yên bình"],
    symbols: [
      { name: "Ngôi sao lớn", meaning_psychological: "Sự dẫn lối từ nội tâm", visual_note: "Ngôi sao vàng 8 cánh trung tâm" },
      { name: "Bình nước", meaning_psychological: "Sự luân chuyển cảm xúc và tiềm thức", visual_note: "Đổ nước xuống đất và hồ" }
    ],
    psychological_dimensions: ["Niềm tin vào bản thân", "Sự phục hồi sau biến động", "Tĩnh lặng"],
    energy_profile: { pace: "chậm", orientation: "hướng nội", tone: "mềm" },
    context_bias: {
      love_focus: "Sự tin tưởng và thấu hiểu dịu dàng",
      work_focus: "Tìm lại cảm hứng và mục đích dài hạn",
      self_focus: "Giai đoạn tự chăm sóc và xoa dịu tâm hồn",
      emotional_focus: "Cảm giác nhẹ nhõm và thanh thản"
    },
    action_seeds: ["Dành 10 phút tĩnh tâm", "Ngắm nhìn bầu trời đêm"],
    reflection_prompts: ["Điều gì mang lại cho bạn cảm giác bình an nhất?", "Bạn đang nuôi dưỡng hy vọng nào cho tương lai?"]
  },
  {
    id: 21,
    name: "The World",
    arcana: "Major",
    suit: null,
    rank: 21,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/ff/RWS_Tarot_21_World.jpg",
    core_theme: ["Hoàn thiện", "Hòa hợp", "Thành tựu"],
    symbols: [
      { name: "Vòng nguyệt quế", meaning_psychological: "Chu kỳ thành công và sự bảo vệ", visual_note: "Bao quanh nhân vật trung tâm" },
      { name: "Nhân vật đang múa", meaning_psychological: "Trạng thái tự do và thăng hoa", visual_note: "Vị thế nhẹ nhàng, cân bằng" }
    ],
    psychological_dimensions: ["Sự hài lòng", "Kết nối với cộng đồng", "Thấu hiểu trọn vẹn"],
    energy_profile: { pace: "trung bình", orientation: "hướng ngoại", tone: "trung tính" },
    context_bias: {
      love_focus: "Sự viên mãn và đồng điệu sâu sắc",
      work_focus: "Hoàn thành một giai đoạn quan trọng thành công",
      self_focus: "Tìm thấy vị trí của mình trong thế giới",
      emotional_focus: "Sự tròn đầy và biết ơn"
    },
    action_seeds: ["Ăn mừng một thành tựu nhỏ", "Gửi lời cảm ơn đến người đồng hành"],
    reflection_prompts: ["Chu kỳ nào trong đời bạn vừa khép lại?", "Bạn cảm thấy mình thuộc về nơi nào nhất?"]
  },
  {
    id: 22,
    name: "Ace of Cups",
    arcana: "Minor",
    suit: "Cups",
    rank: 1,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/36/RWS_Tarot_01_Cups.jpg",
    core_theme: ["Cảm xúc mới", "Sự tràn đầy", "Trực giác"],
    symbols: [
      { name: "Chiếc cốc", meaning_psychological: "Chứa đựng tình yêu và sự thấu cảm", visual_note: "Nước tràn ra từ 5 dòng" },
      { name: "Bàn tay từ mây", meaning_psychological: "Cơ hội hoặc món quà từ cuộc sống", visual_note: "Nâng đỡ chiếc cốc" }
    ],
    psychological_dimensions: ["Sự cởi mở về cảm xúc", "Lòng trắc ẩn", "Trải nghiệm mới"],
    energy_profile: { pace: "chậm", orientation: "hướng nội", tone: "mềm" },
    context_bias: {
      love_focus: "Rung động mới hoặc sự bao dung trong tình cảm",
      work_focus: "Tìm thấy niềm vui thực sự trong công việc",
      self_focus: "Học cách yêu thương chính mình hơn",
      emotional_focus: "Sự tuôn trào của cảm hứng"
    },
    action_seeds: ["Lắng nghe bản nhạc yêu thích", "Viết một lời chúc tốt đẹp cho chính mình"],
    reflection_prompts: ["Trái tim bạn đang muốn nói điều gì ngay lúc này?", "Bạn sẵn sàng đón nhận niềm vui mới chưa?"]
  }
];

export const TOPICS: ReadingTopic[] = ["Tình cảm", "Công việc", "Phát triển bản thân", "Tâm trạng"];
