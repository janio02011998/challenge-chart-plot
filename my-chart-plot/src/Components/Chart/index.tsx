import Chart from 'react-apexcharts';

type ChartPlotProps = {
    series: any
    categories: any
}

export default function ChartPlot({ series, categories }: ChartPlotProps) {
    const options = {
        chart: {
            id: "",
            toolbar: {
                show: false
            }
        },
        xaxis: {
            categories: categories
        },
        toolbar: false,
    }

    return (
        <div className="chartplot-container">
            <div className="donut">
                <Chart
                    options={options}
                    series={series}
                    type="line"
                    width="80%"
                    height="280px" />
            </div>
        </div>
    )
}

