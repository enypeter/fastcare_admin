import totalcon from '/svg/totalcon.svg';
import completedcon from '/svg/completedcon.svg';
import pendingcon from '/svg/pendingcon.svg';
import missedcon from '/svg/missedcon.svg';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import AllConsultation from './all-consultation';

const data = [
  { month: 'Jan', value: 20 },
  { month: 'Feb', value: 35 },
  { month: 'Mar', value: 50 },
  { month: 'Apr', value: 25 },
  { month: 'May', value: 40 },
  { month: 'Jun', value: 30 },
  { month: 'Jul', value: 45 },
  { month: 'Aug', value: 55 },
  { month: 'Sep', value: 60 },
  { month: 'Oct', value: 48 },
  { month: 'Nov', value: 35 },
  { month: 'Dec', value: 52 },
];


const stats = [
  {
    count: 84,
    title: 'Total Consultations',
    icon: totalcon,
  },
  {
    count: 15,
    title: 'Pending Consultations',
    icon: pendingcon,
  },
  {
    count: 42,
    title: 'Completed Consultations',
    icon: completedcon,
  },

  {
    count: 7,
    title: 'Missed Consultations',
    icon: missedcon,
  },
];

const Consultation = () => {
  return (
    <div className="mt-10 mx-4">
      <div className="flex flex-col lg:flex-row justify-between gap-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 w-full lg:w-1/2">
          {stats.map((item, index) => (
            <div
              key={index}
              className="flex flex-col gap-5 rounded-md bg-white border p-5 w-full"
            >
              <div className="flex items-center justify-between gap-2 mt-1">
                <h4 className="text-2xl font-semibold leading-tight">
                  {item.count}
                </h4>
                <img src={item.icon} alt={item.title} className="w-8 h-8" />
              </div>
              <p className=" text-md text-gray-600 mt-">{item.title}</p>
            </div>
          ))}
        </div>

        <div className="w-full lg:w-1/2">
          <div className="bg-white border py-5 px-3 w-full rounded-md">
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

            <div className="mt-6 flex  items-center gap-6">
              {/* LEFT SIDE */}
              <div className="flex flex-col items-center justify-center gap-2 w-[50%]">
                <h3 className="text-lg text-gray-700">Average Wait Time</h3>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold text-gray-900">
                    1.32 min
                  </span>
                </div>
                <span className="text-green-600 font-semibold text-sm">
                  +0.1
                </span>
                <p className="text-sm text-gray-500">This month – September</p>
              </div>

              {/* RIGHT SIDE (Bar Chart) */}
              <div className="w-full h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <XAxis dataKey="month" />

                    <Tooltip />
                    <Bar
                      dataKey="value"
                      radius={[6, 6, 0, 0]}
                      shape={(props: any) => {
                        const {x, y, width, value} = props;
                        if (value === 0) {
                          return (
                            <rect
                              x={x}
                              y={y - 80} // place slightly above axis
                              width={width}
                              height={80} // small fixed height
                              fill="#9CA3AF"
                              rx={2}
                              ry={2}
                            />
                          );
                        }
                        return <rect {...props} fill="#3B82F6" rx={4} ry={4} />;
                      }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="mt-24">
        <AllConsultation />
      </div>
    </div>
  );
};

export default Consultation;
