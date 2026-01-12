import React from 'react';

const DateIcon = () => {
  return React.createElement(
    'svg',
    {
      width: '24',
      height: '24',
      viewBox: '0 0 24 24',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg',
    },
    [
      React.createElement('path', {
        key: '1',
        d: 'M3 7.5C3 5.29086 4.79086 3.5 7 3.5H17C19.2091 3.5 21 5.29086 21 7.5V18C21 20.2091 19.2091 22 17 22H7C4.79086 22 3 20.2091 3 18V7.5Z',
        stroke: '#1F1F1F',
        strokeWidth: '1.5'
      }),
      React.createElement('path', {
        key: '2',
        d: 'M3 9H21',
        stroke: '#1F1F1F',
        strokeWidth: '1.5',
        strokeLinecap: 'round'
      }),
      React.createElement('path', {
        key: '3',
        d: 'M8 2L8 5',
        stroke: '#1F1F1F',
        strokeWidth: '1.5',
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
      }),
      React.createElement('path', {
        key: '4',
        d: 'M16 2V5',
        stroke: '#1F1F1F',
        strokeWidth: '1.5',
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
      }),
      React.createElement('circle', {
        key: '5',
        cx: '12',
        cy: '15',
        r: '1',
        fill: '#1F1F1F'
      }),
      React.createElement('circle', {
        key: '6',
        cx: '16',
        cy: '15',
        r: '1',
        fill: '#1F1F1F'
      }),
      React.createElement('circle', {
        key: '7',
        cx: '8',
        cy: '15',
        r: '1',
        fill: '#1F1F1F'
      })
    ]
  );
};

export default DateIcon;