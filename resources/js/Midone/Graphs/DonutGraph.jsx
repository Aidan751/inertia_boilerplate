import { Chart } from "@/base-components";
import { colors } from "@/utils";
import PropTypes from "prop-types";
import { useMemo } from "react";

function DonutGraph(props) {

  const chartData = props.values;
  const chartColors = () => [
    colors.success(0.9),
    colors.danger(0.9),
  ];
  const data = useMemo(() => {
    return {
      labels: ["Paid", "Not Paid"],
      datasets: [
        {
          data: chartData,
          backgroundColor: chartColors(),
          hoverBackgroundColor: chartColors(),
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
          display: false,
        },
      },
      cutout: "80%",
    };
  });

  return (
    <Chart
      type="doughnut"
      width={props.width}
      height={props.height}
      data={data}
      options={options}
      className={props.className}
    />
  );
}

DonutGraph.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};

DonutGraph.defaultProps = {
  width: "auto",
  height: "auto",
  className: "",
};

export default DonutGraph;
