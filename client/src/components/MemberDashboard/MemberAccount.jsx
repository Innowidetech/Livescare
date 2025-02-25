import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import { fetchDashboardPercentages } from '../../redux/dashboardSlice';
import {getProfile} from  '../../redux/member/memberProfile';


function MemberAccount() {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isDailyDatePickerOpen, setIsDailyDatePickerOpen] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [hoveredSegment, setHoveredSegment] = useState(null);
  const [hoveredOutflowSegment, setHoveredOutflowSegment] = useState(null);
  const { percentages, loading } = useSelector((state) => state.dashboard);
  const { profile } = useSelector((state) => state.memberProfile);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);


  // Define all possible categories
  const allCategories = [
    'Books',
    'Clothes',
    'Food',
    'Games Kit',
    'Medical',
    'Money',
    'Others',
    'Toys'
  ];

  useEffect(() => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1;
    dispatch(fetchDashboardPercentages({ year, month }));
  }, [selectedDate, dispatch]);

  const donorIncome = percentages?.donorRequest?.dailyIncome || [];
  const submitIncome = percentages?.submitRequest?.dailyIncome || [];
  const itemPercentages = percentages?.donorRequest?.itemPercentages || {};
  const totalCompleted = percentages?.donorRequest?.totalCompleted || 0;
  const totalMoney = percentages?.donorRequest?.totalMoney || 0;
  const submitTotalMoney = percentages?.submitRequest?.totalMoney || 0;

  // Calculate the maximum income value for donor income only in the first graph
  const maxDonorIncome = Math.max(...donorIncome.map(item => item.income), 50);
  const donorYAxisValues = Array.from({ length: 6 }, (_, i) => Math.round(maxDonorIncome * (i / 5)));

  // Calculate the maximum income value across both datasets for the bottom graph
  const maxIncome = Math.max(
    ...donorIncome.map(item => item.income),
    ...submitIncome.map(item => item.income),
    50
  );
  const yAxisValues = Array.from({ length: 6 }, (_, i) => Math.round(maxIncome * (i / 5)));

  // Generate points for both graphs
  const generateGraphPoints = (data, maxValue) => {
    return data.map((item, index) => {
      const x = 50 + (index * (1700 / (data.length - 1)));
      const y = 290 - ((item.income / maxValue) * 280);
      return { x, y, income: item.income, date: item.date };
    });
  };

  const donorPoints = generateGraphPoints(donorIncome, maxDonorIncome);
  const donorPointsBottom = generateGraphPoints(donorIncome, maxIncome);
  const submitPoints = generateGraphPoints(submitIncome, maxIncome);

  // Helper function to get color based on item type
  const getItemColor = (item) => {
    const colors = {
      Books: '#2E7D32',
      Clothes: '#1565C0',
      Food: '#C62828',
      'Games Kit': '#6A1B9A',
      Medical: '#EF6C00',
      Money: '#283593',
      Others: '#424242',
      Toys: '#00838F'
    };
    return colors[item] || '#424242';
  };

  // Calculate pie chart segments
  const generatePieChart = (percentages, itemCounts = {}) => {
    let currentAngle = 0;
    const segments = [];
    const total = Object.values(percentages).reduce((sum, val) => sum + parseFloat(val), 0);
    
    Object.entries(percentages).forEach(([item, percentage]) => {
      const value = parseFloat(percentage);
      if (value > 0) {
        const startAngle = currentAngle;
        const angle = (value / total) * Math.PI * 2;
        const endAngle = currentAngle + angle;
        
        const x1 = Math.cos(startAngle);
        const y1 = Math.sin(startAngle);
        const x2 = Math.cos(endAngle);
        const y2 = Math.sin(endAngle);
        
        const largeArcFlag = angle > Math.PI ? 1 : 0;
        
        const d = [
          `M 0 0`,
          `L ${x1 * 80} ${y1 * 80}`,
          `A 80 80 0 ${largeArcFlag} 1 ${x2 * 80} ${y2 * 80}`,
          'Z'
        ].join(' ');
        
        segments.push({
          path: d,
          item,
          percentage: value,
          count: itemCounts[item] || 0,
          color: getItemColor(item)
        });
        
        currentAngle += angle;
      }
    });
    
    return segments;
  };

  const pieSegments = generatePieChart(itemPercentages, percentages?.donorRequest?.itemCounts || {});

  // Create a complete list of items with their percentages
  const allItemsWithPercentages = allCategories.map(category => ({
    item: category,
    percentage: parseFloat(itemPercentages[category] || "0.00"),
    color: getItemColor(category)
  }));

  // Mock data for outflow - replace with actual data when available
  const outflowPercentages = percentages?.submitRequest?.itemPercentages || {};

  const outflowPieSegments = generatePieChart(outflowPercentages, percentages?.submitRequest?.itemCounts || {});
  const allOutflowItemsWithPercentages = allCategories.map(category => ({
    item: category,
    percentage: parseFloat(outflowPercentages[category] || "0.00"),
    color: getItemColor(category)
  }));

  return (
    <>
     <h2 className="text-3xl mb-2 font-medium text-left md:mt-14 mt-12" style={{fontFamily:'Inter'}}>Hi,<span className=""> {profile?.loggedinuser?.fullname} </span></h2>
      <div className="bg-white p-6 shadow-lg rounded-lg border border-gray-300 mt-6 w-full mx-auto">
     
        <div className="flex flex-wrap justify-between items-center mb-4">
          <div className="md:text-2xl font-medium text-[#202224]" style={{fontFamily:'Inter'}}>Total Donor Income</div>

          <div className="relative">
            <button
              className="flex items-center bg-gray-200 text-sm py-2 px-4 rounded-md border border-gray-300"
              onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
            >
              {format(selectedDate, 'MMMM yyyy')}
              <i className={`ml-2 fas ${isDatePickerOpen ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
            </button>
            
            {isDatePickerOpen && (
              <div className="absolute right-0 mt-1 z-10">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => {
                    setSelectedDate(date);
                    setIsDatePickerOpen(false);
                  }}
                  dateFormat="MM/yyyy"
                  showMonthYearPicker
                  inline
                />
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 relative">
          <svg
            width="100%"
            height="300"
            className="relative"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1800 300"
          >
            {/* Y-axis */}
            <line x1="50" y1="10" x2="50" y2="290" stroke="gray" strokeWidth="1" />
            {donorYAxisValues.reverse().map((value, idx) => (
              <text
                key={idx}
                x="35"
                y={10 + (idx * (280 / 5))}
                className="text-gray-500 text-xs"
                dy="5"
                textAnchor="end"
              >
                {value}
              </text>
            ))}

            {/* X-axis */}
            <line x1="50" y1="290" x2="1750" y2="290" stroke="gray" strokeWidth="1" />
            {donorIncome.map((item, idx) => (
              <text
                key={idx}
                x={50 + (idx * (1700 / (donorIncome.length - 1)))}
                y="310"
                className="text-gray-500 text-xs"
                textAnchor="middle"
              >
                {format(new Date(item.date), 'd')}
              </text>
            ))}

            {/* Legend */}
            <g transform="translate(1500, 30)">
              <circle cx="0" cy="0" r="6" fill="#4745A4" />
              <text x="15" y="5" className="text-sm">Donor Request</text>
            </g>

            {/* Donor Request Line */}
            <path
              d={`M ${donorPoints.map(p => `${p.x},${p.y}`).join(' L ')}`}
              fill="none"
              stroke="#4745A4"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Interactive Points for Donor Request */}
            {donorPoints.map((point, idx) => (
              <g key={`donor-${idx}`}>
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="6"
                  fill={hoveredPoint === `donor-${idx}` ? '#4745A4' : 'white'}
                  stroke="#4745A4"
                  strokeWidth="2"
                  onMouseEnter={() => setHoveredPoint(`donor-${idx}`)}
                  onMouseLeave={() => setHoveredPoint(null)}
                  style={{ cursor: 'pointer' }}
                />
                {hoveredPoint === `donor-${idx}` && (
                  <g>
                    <rect
                      x={point.x - 50}
                      y={point.y - 45}
                      width="100"
                      height="35"
                      rx="5"
                      fill="#4745A4"
                    />
                    <text
                      x={point.x}
                      y={point.y - 25}
                      textAnchor="middle"
                      fill="white"
                      fontSize="12"
                    >
                      ₹{point.income.toLocaleString()}
                    </text>
                  </g>
                )}
              </g>
            ))}
          </svg>
        </div>

        {loading && (
          <div className="flex justify-center items-center mt-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        )}
      </div>

      <div className="mt-8 grid lg:grid-cols-2 gap-8">
        {/* Inflow Pie Chart Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-medium" style={{fontFamily:'Inter'}}>Inflow invoices</h3>
          </div>
          <div className="grid md:flex items-start justify-between">
            <div className="relative w-48 h-48">
              <svg
                viewBox="-100 -100 200 200"
                className="transform -rotate-90 w-full h-full"
              >
                {pieSegments.map((segment, index) => (
                  <g key={index}>
                    <path
                      d={segment.path}
                      fill={segment.color}
                      stroke="white"
                      strokeWidth="1"
                      onMouseEnter={() => setHoveredSegment(segment)}
                      onMouseLeave={() => setHoveredSegment(null)}
                      className="transition-opacity duration-200 hover:opacity-80 cursor-pointer"
                    />
                  </g>
                ))}
                {hoveredSegment && (
                  <g className="transform rotate-90">
                    <rect
                      x="-80"
                      y="-40"
                      width="160"
                      height="80"
                      fill="rgba(0,0,0,0.8)"
                      rx="5"
                    />
                    <text
                      x="0"
                      y="-20"
                      textAnchor="middle"
                      fill="white"
                      fontSize="14"
                      fontWeight="bold"
                    >
                      {hoveredSegment.item}
                    </text>
                    <text
                      x="0"
                      y="5"
                      textAnchor="middle"
                      fill="white"
                      fontSize="12"
                    >
                      Count: {hoveredSegment.count}
                    </text>
                    {/* <text
                      x="0"
                      y="30"
                      textAnchor="middle"
                      fill="white"
                      fontSize="12"
                    >
                      {hoveredSegment.percentage.toFixed(1)}% (₹{(totalMoney * (hoveredSegment.percentage / 100)).toLocaleString()})
                    </text> */}
                  </g>
                )}
              </svg>
            </div>
            
            {/* Legend with better alignment and counts */}
            <div className='grid p-4'>
              <div className="text-xl font-medium mb-6">INR {totalMoney.toLocaleString()}</div>
              <div className='grid grid-cols-2 lg:grid-cols-2 gap-3 flex-grow md:ml-8'>
                {allItemsWithPercentages.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-2"
                    onMouseEnter={() => setHoveredSegment(pieSegments.find(s => s.item === item.item))}
                    onMouseLeave={() => setHoveredSegment(null)}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm font-medium" style={{fontFamily:'Inter'}}>{item.item}</span>
                    </div>
                    <div className="flex items-center  mr-32 gap-2">
                      <span className="text-xs text-gray-500">
                        ({percentages?.donorRequest?.itemCounts?.[item.item] || 0})
                      </span>
                      <span className="text-sm text-gray-600">
                        {/* {item.percentage > 0 ? `${item.percentage.toFixed(1)}%` : '-'} */}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Outflow Pie Chart Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-medium" style={{fontFamily:'Inter'}}>Outflow invoices</h3>
          </div>
          <div className="md:flex items-start justify-between">
            <div className="relative w-48 h-48">
              <svg
                viewBox="-100 -100 200 200"
                className="transform -rotate-90 w-full h-full"
              >
                {outflowPieSegments.map((segment, index) => (
                  <g key={index}>
                    <path
                      d={segment.path}
                      fill={segment.color}
                      stroke="white"
                      strokeWidth="1"
                      onMouseEnter={() => setHoveredOutflowSegment(segment)}
                      onMouseLeave={() => setHoveredOutflowSegment(null)}
                      className="transition-opacity duration-200 hover:opacity-80 cursor-pointer"
                    />
                  </g>
                ))}
                {hoveredOutflowSegment && (
                  <g className="transform rotate-90">
                    <rect
                      x="-80"
                      y="-40"
                      width="160"
                      height="80"
                      fill="rgba(0,0,0,0.8)"
                      rx="5"
                    />
                    <text
                      x="0"
                      y="-20"
                      textAnchor="middle"
                      fill="white"
                      fontSize="14"
                      fontWeight="bold"
                    >
                      {hoveredOutflowSegment.item}
                    </text>
                    <text
                      x="0"
                      y="5"
                      textAnchor="middle"
                      fill="white"
                      fontSize="12"
                    >
                      Count: {hoveredOutflowSegment.count}
                    </text>
                    {/* <text
                      x="0"
                      y="30"
                      textAnchor="middle"
                      fill="white"
                      fontSize="12"
                    >
                      {hoveredOutflowSegment.percentage.toFixed(1)}% (₹{(submitTotalMoney * (hoveredOutflowSegment.percentage / 100)).toLocaleString()})
                    </text> */}
                  </g>
                )}
              </svg>
            </div>
            
            {/* Legend with better alignment and counts */}
            <div className="grid p-4">
              <div className="text-xl font-medium mb-6">INR {submitTotalMoney.toLocaleString()}</div>
              <div className='grid grid-cols-2 lg:grid-cols-2 gap-3 flex-grow md:ml-8'>
                {allOutflowItemsWithPercentages.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-2"
                    onMouseEnter={() => setHoveredOutflowSegment(outflowPieSegments.find(s => s.item === item.item))}
                    onMouseLeave={() => setHoveredOutflowSegment(null)}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm font-medium" style={{fontFamily:'Inter'}}>{item.item}</span>
                    </div>
                    <div className="flex items-center  mr-32 gap-2">
                      <span className="text-xs text-gray-500">
                        ({percentages?.submitRequest?.itemCounts?.[item.item] || 0})
                      </span>
                      <span className="text-sm text-gray-600">
                        {/* {item.percentage > 0 ? `${item.percentage.toFixed(1)}%` : '-'} */}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Income Graph Section */}
      <div className="mt-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-medium" style={{fontFamily:'Inter'}}>Analysis</h3>
            <div className="relative">
              <button
                className="flex items-center bg-gray-200 text-sm py-2 px-4 rounded-md border border-gray-300"
                onClick={() => setIsDailyDatePickerOpen(!isDailyDatePickerOpen)}
              >
                {format(selectedDate, 'MMMM yyyy')}
                <i className={`ml-2 fas ${isDailyDatePickerOpen ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
              </button>
              
              {isDailyDatePickerOpen && (
                <div className="absolute right-0 mt-1 z-10">
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => {
                      setSelectedDate(date);
                      setIsDailyDatePickerOpen(false);
                    }}
                    dateFormat="MM/yyyy"
                    showMonthYearPicker
                    inline
                  />
                </div>
              )}
            </div>
          </div>

          <div className="relative">
            <svg
              width="100%"
              height="300"
              className="relative"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1800 300"
            >
              {/* Y-axis */}
              <line x1="50" y1="10" x2="50" y2="290" stroke="gray" strokeWidth="1" />
              {yAxisValues.reverse().map((value, idx) => (
                <text
                  key={idx}
                  x="35"
                  y={10 + (idx * (280 / 5))}
                  className="text-gray-500 text-xs"
                  dy="5"
                  textAnchor="end"
                >
                  {value}
                </text>
              ))}

              {/* X-axis */}
              <line x1="50" y1="290" x2="1750" y2="290" stroke="gray" strokeWidth="1" />
              {donorIncome.map((item, idx) => (
                <text
                  key={idx}
                  x={50 + (idx * (1700 / (donorIncome.length - 1)))}
                  y="310"
                  className="text-gray-500 text-xs"
                  textAnchor="middle"
                >
                  {format(new Date(item.date), 'd')}
                </text>
              ))}

              {/* Legend */}
              <g transform="translate(1500, 30)">
                <circle cx="0" cy="0" r="6" fill="#4745A4" />
                <text x="15" y="5" className="text-sm">Donor Request</text>
                <circle cx="0" cy="25" r="6" fill="#10B981" />
                <text x="15" y="30" className="text-sm">Submit Request</text>
              </g>

              {/* Donor Request Line */}
              <path
                d={`M ${donorPointsBottom.map(p => `${p.x},${p.y}`).join(' L ')}`}
                fill="none"
                stroke="#4745A4"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Submit Request Line */}
              <path
                d={`M ${submitPoints.map(p => `${p.x},${p.y}`).join(' L ')}`}
                fill="none"
                stroke="#10B981"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Interactive Points for Donor Request */}
              {donorPointsBottom.map((point, idx) => (
                <g key={`donor-daily-${idx}`}>
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="6"
                    fill={hoveredPoint === `donor-daily-${idx}` ? '#4745A4' : 'white'}
                    stroke="#4745A4"
                    strokeWidth="2"
                    onMouseEnter={() => setHoveredPoint(`donor-daily-${idx}`)}
                    onMouseLeave={() => setHoveredPoint(null)}
                    style={{ cursor: 'pointer' }}
                  />
                  {hoveredPoint === `donor-daily-${idx}` && (
                    <g>
                      <rect
                        x={point.x - 50}
                        y={point.y - 45}
                        width="100"
                        height="35"
                        rx="5"
                        fill="#4745A4"
                      />
                      <text
                        x={point.x}
                        y={point.y - 25}
                        textAnchor="middle"
                        fill="white"
                        fontSize="12"
                      >
                        ₹{point.income.toLocaleString()}
                      </text>
                    </g>
                  )}
                </g>
              ))}

              {/* Interactive Points for Submit Request */}
              {submitPoints.map((point, idx) => (
                <g key={`submit-daily-${idx}`}>
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="6"
                    fill={hoveredPoint === `submit-daily-${idx}` ? '#10B981' : 'white'}
                    stroke="#10B981"
                    strokeWidth="2"
                    onMouseEnter={() => setHoveredPoint(`submit-daily-${idx}`)}
                    onMouseLeave={() => setHoveredPoint(null)}
                    style={{ cursor: 'pointer' }}
                  />
                  {hoveredPoint === `submit-daily-${idx}` && (
                    <g>
                      <rect
                        x={point.x - 50}
                        y={point.y - 45}
                        width="100"
                        height="35"
                        rx="5"
                        fill="#10B981"
                      />
                      <text
                        x={point.x}
                        y={point.y - 25}
                        textAnchor="middle"
                        fill="white"
                        fontSize="12"
                      >
                        ₹{point.income.toLocaleString()}
                      </text>
                    </g>
                  )}
                </g>
              ))}
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}

export default MemberAccount;