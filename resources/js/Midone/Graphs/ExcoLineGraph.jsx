import { Chart } from "@/base-components";
import { colors } from "@/utils";
import PropTypes from "prop-types";
import { useMemo } from "react";

function ExcoLineGraph(props) {

  const data = useMemo(() => {
    return {
      labels: props.labels,
      datasets: [
        {
          label: "Users",
          data: props.values,
          borderWidth: 2,
          borderColor: colors.dark(1),
        //   backgroundColor: "transparent",
        //   pointBorderColor: "transparent",
          tension: 0.4,
        }
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
      scales: {
        x: {
          ticks: {
            font: {
              size: 12,
            },
            color: colors.slate["700"](0.8),
          },
          grid: {
            display: true,
            drawBorder: true,
          },
        },
        y: {
          ticks: {
            font: {
              size: 12,
            },
            color: colors.slate["500"](0.8),
            callback: function (value) {
              return "" + value;
            },
          },
          
        },
      },
    };
  });

  return (
    <Chart
      type="line"
      width={props.width}
      height={props.height}
      data={data}
      options={options}
      className={props.className}
    />
  );
}

ExcoLineGraph.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};

ExcoLineGraph.defaultProps = {
  width: "auto",
  height: "auto",
  className: "",
};

export default ExcoLineGraph;
