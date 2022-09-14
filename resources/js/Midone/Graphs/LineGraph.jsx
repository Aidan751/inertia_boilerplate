import { Chart } from "@/base-components";
import { colors } from "@/utils";
import PropTypes from "prop-types";
import { useMemo } from "react";

function LineGraph(props) {

    const values  = [];
    const labels  = [];

    props.data.forEach(element => {
        values.push(element.totalAmount);
        labels.push(element.month);
    });

  const data = useMemo(() => {
    return {
      labels: labels,
      datasets: [
        {
          label: "Sales in Rands",
          data: values,
          borderWidth: 2,
          borderColor: colors.dark(0.8),
          backgroundColor: "transparent",
          pointBorderColor: "transparent",
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
            color: colors.slate["500"](0.8),
          },
          grid: {
            display: false,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            font: {
              size: 12,
            },
            color: colors.slate["500"](0.8),
            callback: function (value) {
              return "R " + value;
            },
          },
          grid: {
            color:  colors.slate["300"](),
            borderDash: [2, 2],
            drawBorder: false,
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

LineGraph.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};

LineGraph.defaultProps = {
  width: "auto",
  height: "auto",
  className: "",
};

export default LineGraph;
