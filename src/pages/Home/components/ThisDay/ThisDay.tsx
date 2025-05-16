import s from "./ThisDay.module.scss";
import GlobalSVGSelector from "../../../../asstets/icons/global/GlobalSVGSelector";

type Props = {
  data: {
    name: string;
    main: {
      temp: number;
    };
    weather: Array<{
      main: string;
      description: string;
    }>;
  };
};

const ThisDay = ({ data }: Props) => {
  return (
    <div className={s.this_day}>
      <div className={s.top_block}>
        <div className={s.top_block_wrapper}>
          <div className={s.current_city}>{data.name}</div>
          <div className={s.current_temp}>
            {Math.floor(data.main.temp)}°C
          </div>
          <div className={s.bottom_block}>
            <GlobalSVGSelector id={data.weather[0].main.toLowerCase()} />
            {data.weather[0].description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThisDay;
