import React from "react";
import {Form} from "react-bootstrap";

import _ from 'lodash';
import {Bar} from '@reactchartjs/react-chart.js'
import {useTopIssues} from "../hooks/useTopIssues";

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
}

const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
}

const generateChartData = (topIssues, countMap) => {
  let labels = topIssues.map(x => `ID - ${x.id}`)
  if(topIssues.length> 0){
    debugger
  }
  let counts = topIssues.map(x => countMap[x.id].count)
  let dataset = {
    label: '# View Count',
    data: counts,
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)',
    ],
    borderColor: [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)',
    ],
    borderWidth: 1,
  }
  let datasets = [dataset]
  return {labels, datasets};

}
export default ({issues, topData}) => {

  const {topIssues} = useTopIssues()

  const [topCount, setTopCount] = React.useState(0);
  const [max, setMax] = React.useState(0);

  const chartData = React.useMemo(() => {
    if (issues.length === 0) return {labels: [], datasets: []}
    let list = []
    let ids = Object.keys(topIssues);

    ids.forEach(key => {
      list.push({id: parseInt(key), count: topIssues[key]})
    })
    let sorted = _.sortBy(list, 'count');
    // most viewed - order by descending
    sorted = sorted.reverse();
    let top = _.intersectionBy(issues, _.take(sorted, topCount), 'id');

    let countMap = _.keyBy(list, 'id');
    return  generateChartData(top, countMap);
  }, [topIssues, issues, topData, topCount])

  const handleChange = React.useCallback((event) => {
    setTopCount(event.target.value);
  }, [])

  React.useEffect(() => {
    let value = Math.min(Object.keys(topIssues).length, 6);
    setTopCount(value)
    setMax(value)
  }, [topIssues])

  return <div>
    <Form>
      <Form.Group controlId="no">
        <Form.Label>Top Issues Length - {topCount}</Form.Label>
        <Form.Control type="range" value={topCount} min={1} max={max}
                      custom onChange={handleChange}/>
      </Form.Group>
    </Form>
    <Bar data={chartData} options={options}/>
  </div>
}