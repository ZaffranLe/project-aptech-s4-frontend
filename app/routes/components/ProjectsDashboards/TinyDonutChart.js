import React from 'react';
import {  
    PieChart, 
    Pie,
    Cell
} from 'recharts';

import colors from './../../../colors';

const data = [
    {name: 'Pending', value: 5},
    {name: 'Waiting for delivery', value: 12},
    {name: 'Cancelled', value: 3},
    {name: 'Returned', value: 1},
];

const COLORS = [ colors['yellow'], colors['success'], colors['red'], colors['primary']];

const TinyDonutChart = () => (
    <PieChart width={ 140 } height={ 140 }>
        <Pie
            data={data}
            dataKey="value"
            stroke={ colors['white'] }
            innerRadius={ 40 }
            outerRadius={ 65 } 
            fill="#8884d8"
        >
            {
                data.map((entry, index) => <Cell key={ index } fill={COLORS[index % COLORS.length]} />)
            }
        </Pie>
    </PieChart>
);

export { TinyDonutChart };
