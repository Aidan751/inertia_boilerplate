import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


export default function DashboardLineChart(props){

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: props.title,
          },
        },
    };

    const labels = props.labels;

    
    let data = {
        labels,
        datasets: [
        {
            label: props.title1,
            data: props.data1,
            borderColor: 'rgb(21, 94, 61)',
            backgroundColor: 'rgb(21 128 61)',
        },
        {
            label: props.title2,
            data: props.data2,
            borderColor: 'rgb(21, 94, 117)',
            backgroundColor: 'rgb(21 94 117)',
        },
        ],
    };
    if(props.data3 !== null && props.data3 !== ""){
        data = {
            labels,
            datasets: [
            {
                label: props.title1,
                data: props.data1,
                borderColor: 'rgb(21, 94, 61)',
                backgroundColor: 'rgb(21 128 61)',
            },
            {
                label: props.title2,
                data: props.data2,
                borderColor: 'rgb(21 94 117)',
                backgroundColor: 'rgb(21 94 117)',
            },
            {
                label: props.title3,
                data: props.data3,
                borderColor: 'rgb(154 52 18)',
                backgroundColor: 'rgb(154 52 18)',
            },
            ],
        }; 
    }
    return(
        <>
            <Line options={options} data={data} />
        </>
    )
}