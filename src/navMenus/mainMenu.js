import {
  HomeOutlined as HomeIcon,
  SearchOutlined as SearchIcon,
  UserOutlined as MyPageIcon,
} from "@ant-design/icons";

const menus = [
  {
    name: "내 농장",
    value: "",
    icon: HomeIcon,
  },
  {
    name: "다른 농장",
    value: "farms",
    icon: SearchIcon,
  },
  {
    name: "마이",
    value: "mypage",
    icon: MyPageIcon,
  },
];

export default menus;
