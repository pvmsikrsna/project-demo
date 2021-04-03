import React from "react";
import {Form} from "react-bootstrap";

import {Bar} from '@reactchartjs/react-chart.js'

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
export default (issues, topData) => {

  const [topCount, setTopCount] = React.useState(4);

  React.useMemo(() => {

  }, [issues, topData, topCount])

  const handleChange = React.useCallback((event) => {
    setTopCount(event.target.value);
  }, [])

  return <div>
    <Form>
      <Form.Group controlId="no">
        <Form.Label>Top Issues Length - {topCount}</Form.Label>
        <Form.Control type="range" value={topCount} min={0} max={issues.length || 4}
                      custom onChange={handleChange}/>
      </Form.Group>
    </Form>
    <Bar data={data} options={options}/>
  </div>
}