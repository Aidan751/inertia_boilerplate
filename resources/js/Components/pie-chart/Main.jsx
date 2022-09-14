import { Chart } from "@/base-components";
import { colors } from "@/utils";
import PropTypes from "prop-types";
import { useMemo } from "react";

function Main(props) {

  const chartData = [props.data1, props.data2,];
  const chartColors = () => [
    colors.primary(0.9),
    colors.secondary(0.9),
  ];
  const data = useMemo(() => {
    return {
      labels: ["Customers", "Members",],
      datasets: [
        {
          data: chartData,
          backgroundColor:chartColors(),
          hoverBackgroundColor:chartColors(),
          borderWidth: 5,
          borderColor: colors.white,
        },
      ],
    };
  });

  const options = useMemo(() => {
    return {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: colors.slate["500"](0.8),
          },
        },
      },
    };
  });

  return (
    <Chart
      type="pie"
      width={props.width}
      height={props.height}
      data={data}
      options={options}
      className={props.className}
    />
  );
}

Main.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};

Main.defaultProps = {
  width: "auto",
  height: "auto",
  className: "",
};

export default Main;
