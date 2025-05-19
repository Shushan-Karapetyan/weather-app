import s from "./ThisDay.module.scss";
import GlobalSVGSelector from "../../../../asstets/icons/global/GlobalSVGSelector";
import { DailyForecast } from "../../../../types/type";

type Props = {
  data: DailyForecast | null;
  city: string;
};

const ThisDay = ({ data, city }: Props) => {
    if (!data) return null;
    
  return (
    <div className={s.this_day}>
      <div className={s.top_block}>
        <div className={s.top_block_wrapper}>
          <div className={s.current_city}>{city}</div>
          <div className={s.current_temp}>
            {data.temp_day}
          </div>
          <div className={s.bottom_block}>
            <GlobalSVGSelector id={data.icon_id} />
            {data.info}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThisDay;
