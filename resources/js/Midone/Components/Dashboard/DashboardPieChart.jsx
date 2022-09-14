import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


export default function DashboardPieChart(props){

    const data = {
        title:props.title,
        labels: props.labels,
        datasets: [
          {
            label: '# of Votes',
            data: props.data,
            backgroundColor: [
                'rgb(13,33,54)','rgb(46,119,174)',"rgb(224,234,245)"
            ],
            borderColor: [
                'rgb(13,33,54)','rgb(46,119,174)',"rgb(224,234,245)"
            ],
            borderWidth: 1,
          },
        ],
      };

    return(
        <>
            <Pie data={data} />
        </>
    )
}