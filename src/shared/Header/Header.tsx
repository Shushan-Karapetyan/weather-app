import s from "./Header.module.scss";
import GlobalSVGSelector from "../../asstets/icons/global/GlobalSVGSelector";
import { useTheme } from "../../hooks/useTheme";
import { Theme } from "../../context/ThemeContext";

type Props = {};

const Header = (props: Props) => {

  const theme = useTheme();

  function changeTheme() {
  theme.changeTheme(theme.theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT)
  }



  return (
    <header className={s.header}>
      <div className={s.wrapper}>
        <div className={s.change_theme} onClick={changeTheme}>
          <GlobalSVGSelector id="change-theme" />
        </div>
      </div>
    </header>
  );
};

export default Header;
