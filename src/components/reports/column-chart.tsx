import { Column } from '@ant-design/plots';
import { useEffect, useState } from 'react';

export const ColumnChart = () => {
    const [data, setData] = useState<Record<string, any>[]>([]);

    useEffect(() => {
      fetch('https://gw.alipayobjects.com/os/antfincdn/iPY8JFnxdb/dodge-padding.json')
        .then((response) => response.json())
        .then((data) => setData(data));
    }, []);

    const config = {
      data,
      xField: '月份',
      yField: '月均降雨量',
      colorField: 'name',
      group: true,
      style: {
        inset: 5,
        radiusTopLeft: 150,
        radiusTopRight: 10,
        insetLeft:5,
        insetRight:20,
        insetBottom:10,
        insetTop:10
      },
    };

    return <Column {...config} />;
  };