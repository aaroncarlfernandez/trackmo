import React from 'react'
import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts)
}

const Visualization = ({ visualizationData }) => {
    const shuffle = (array) =>{
        let currentIndex = array.length,  randomIndex;
        while (0 !== currentIndex) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
        return array;
    }
    const colorCollection = ["#e83e8c","#9fd1ff", "#fd988e", "#513d71", "#0185ff", "#0b1b34", "#0b4112", "#aa2825", "#fc3826", "#fed607", "#03d47c", "#46b8da", "#ec971f", "#985f0d"]
    let randomColors = shuffle(colorCollection)
    
    const reportSettings = [
        {
            title: 'Income Vs Expense',
            data: visualizationData.incomeVsExpense
        },
        {
            title: 'Income Breakdown',
            data: visualizationData.income
        },
        {
            title: 'Expenses Breakdown',
            data: visualizationData.expense
        }
    ]

    let reportOptions = reportSettings.map(setting => {
        return (
            {
                chart: {
                    type: 'donut',
                    options3d: {
                        enabled: true,
                        alpha: 45,
                        beta: 0
                    }
                },
                title: {
                    text: `${setting.title}`
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                colors: randomColors,
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        depth: 35,
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}'
                        }
                    }
                },
                credits: {
                    enabled: false
                },
                series: [{
                    type: 'pie',
                    name: 'Amount',
                    data: setting.data
                }]
            }

        )
    })

    let reportContents = reportOptions.map(option=> {
        return (
            <div className="contentCard" key={Math.random()}>
                <div id="categoryChartContainer">
                    <HighchartsReact highcharts={Highcharts} options={option} />
                </div>
            </div>
        )
    })

    return (
        <div id={'expensesList'} className="charts">
            <div className="center">
                {reportContents}
            </div>
        </div>
    );
}

export default Visualization