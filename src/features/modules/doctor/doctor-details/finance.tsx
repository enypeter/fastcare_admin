import {useState} from 'react';
import {AreaChart, Area, XAxis, Tooltip, ResponsiveContainer} from 'recharts';
import AllConsultation from './all-consultation';
import {format, parse} from 'date-fns';
import payout from '/svg/pendingpayout.svg';
import commission from '/svg/commission.svg';
import refund from '/svg/refund.svg';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const data = [
  {date: '2025-09-01', earnings: 4000},
  {date: '2025-09-03', earnings: 2000},
  {date: '2025-09-05', earnings: 3000},
  {date: '2025-09-07', earnings: 1000},
  {date: '2025-09-10', earnings: 5000},
  {date: '2025-09-13', earnings: 8000},
  {date: '2025-09-15', earnings: 2780},
  {date: '2025-09-20', earnings: 4890},
];

const stats = [
  {
    count: 'NGN 84,067.00',
    title: 'Pending Payout',
    icon: payout,
  },
  {
    count: 'NGN 4,067.00',
    title: 'Commission',
    icon: commission,
  },
  {
    count: 'NGN 44,067.00',
    title: 'Refunds',
    icon: refund,
  },
];

const ranges = ['1M', '3M', '6M', '1Y'];

// ✅ Custom tooltip component
const CustomTooltip = ({active, payload, label}: any) => {
  if (active && payload && payload.length) {
    // Parse the date string into a Date object
    const dateObj = parse(label, 'yyyy-MM-dd', new Date());
    const formattedDate = format(dateObj, "EEEE, MMM d'th', yyyy"); // Tuesday, Sep 15th, 2025

    return (
      <div className="bg-white shadow-md rounded-lg p-3 border border-gray-200">
        <p className="text-gray-800 font-medium">{formattedDate}</p>
        <p className="text-gray-600 text-sm">
          Revenue:{' '}
          <span className="font-semibold text-gray-900">
            NGN {payload[0].value.toLocaleString()}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

const Finance = () => {
  const [activeRange, setActiveRange] = useState('1M');

  return (
    <div className="mt-10 mx-4">
      {/* Top filter (right side) */}
      <div className="flex items-end justify-end">
        {/* Filter */}
        <Select defaultValue="monthly">
          <SelectTrigger className=" px-3 py-1 w-32 font-semibold rounded-lg bg-blue-100 text-primary text-md border-none">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 justify-between items-center">
        {/* Chart Section */}
        <div className="w-full lg:w-[60%] bg-white rounded-xl shadow">
          {/* Header row */}
          <div className=" p-6">
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-gray-600 text-xl">Total Earnings</h2>
                {/* Range buttons */}
                <div className="flex gap-2 mt-4 md:mt-0">
                  {ranges.map(r => (
                    <button
                      key={r}
                      onClick={() => setActiveRange(r)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium ${
                        activeRange === r
                          ? 'bg-gray-200 text-gray-600'
                          : ' text-gray-600'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between  gap-2 mt-4">
                <span className="text-2xl font-semibold text-gray-700">
                  NGN 34,566.66
                </span>
                <span className="text-green-600 font-medium text-sm">
                  +23% vs last month
                </span>
              </div>
            </div>
          </div>

          {/* AreaChart */}
          <div className=" h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{top: 16, right: 0, left: 0, bottom: 0}}
              >
                {/* Gradient definition */}
                <defs>
                  <linearGradient
                    id="earningsGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="20%" stopColor="#2563eb" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={value => format(new Date(value), 'MMM d')}
                  tick={{fill: '#6b7280'}}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="earnings"
                  stroke="#2563eb"
                  strokeWidth={2}
                  fill="url(#earningsGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="w-full lg:w-[40%]">
          <div className="flex flex-col gap-4 w-full">
            {stats.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between   gap-5 rounded-md bg-white border p-5 w-full"
              >
                <div className="flex flex-col  justify-between gap-1 mt-1">
                  <p className=" text-md text-gray-600 mt-">{item.title}</p>
                  <h4 className="text-2xl font-semibold leading-tight">
                    {item.count}
                  </h4>
                </div>

                <img src={item.icon} alt={item.title} className="w-8 h-8" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Below chart: AllConsultation */}
      <div className="mt-10">
        <AllConsultation />
      </div>
    </div>
  );
};

export default Finance;
