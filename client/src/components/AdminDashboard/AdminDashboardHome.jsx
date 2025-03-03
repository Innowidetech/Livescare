import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getProfile} from "../../redux/adminprofile";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdPeople } from "react-icons/md";
import { GoPackage } from "react-icons/go";
import { BsGraphUp } from "react-icons/bs";
import { FaHistory } from "react-icons/fa";
import { 
  fetchDashboardStats, 
  fetchDashboardPercentages,
  fetchDailyUsers,
  setTimePeriod,
  setSelectedDate 
} from '../../redux/dashboardSlice';

ChartJS.register(ArcElement, Tooltip, Legend);

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { stats, percentages, loading, error } = useSelector((state) => state.dashboard);
  const { 
    currentPeriod, 
    previousPeriod, 
    timePeriod, 
    selectedDate,
    loading: usersLoading, 
    error: usersError 
  } = useSelector((state) => state.dashboard.dailyUsers);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { profile } = useSelector((state) => state.adminProfile);

   useEffect(() => {
      dispatch(getProfile());
    }, [dispatch]);

  const handleTimePeriodChange = (period) => {
    const newPeriod = period.toLowerCase();
    dispatch(setTimePeriod(newPeriod));
    dispatch(fetchDailyUsers({ 
      timePeriod: newPeriod,
      date: selectedDate
    }));
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    dispatch(fetchDashboardStats());
    dispatch(fetchDashboardPercentages({
      year: selectedDate.getFullYear(),
      month: selectedDate.getMonth() + 1
    }));
    dispatch(fetchDailyUsers({ 
      timePeriod,
      date: selectedDate
    }));
  }, [dispatch, selectedDate, timePeriod]);

  const donorData = {
    labels: ['Clothes', 'Medical', 'Food', 'Money', 'Toys', 'Books', 'Games Kit', 'Others'],
    datasets: [
      {
        data: [
          parseFloat(percentages.donorRequest?.itemPercentages?.Clothes || 0),
          parseFloat(percentages.donorRequest?.itemPercentages?.Medical || 0),
          parseFloat(percentages.donorRequest?.itemPercentages?.Food || 0),
          parseFloat(percentages.donorRequest?.itemPercentages?.Money || 0),
          parseFloat(percentages.donorRequest?.itemPercentages?.Toys || 0),
          parseFloat(percentages.donorRequest?.itemPercentages?.Books || 0),
          parseFloat(percentages.donorRequest?.itemPercentages?.["Games Kit"] || 0),
          parseFloat(percentages.donorRequest?.itemPercentages?.Others || 0)
        ],
        backgroundColor: [
          "#FFA500",
          "#5CACE7",
          "#A1CB76",
          "#F93C65",
          "#A8ABAD",
          "#9B59B6",
          "#3498DB",
          "#95A5A6",
        ],
        borderWidth: 1,
      },
    ],
  };

  const handleDateChange = (date) => {
    dispatch(setSelectedDate(date));
    dispatch(fetchDashboardPercentages({
      year: date.getFullYear(),
      month: date.getMonth() + 1
    }));
  };

  const generatePathData = (data) => {
    if (!data || Object.keys(data).length === 0) return "";
    
    let sortedEntries;
    
    if (timePeriod === 'month') {
      // Sort months in chronological order
      const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      sortedEntries = months
        .filter(month => month in data)
        .map(month => [month, data[month]]);
    } else if (timePeriod === 'week') {
      // Sort weeks numerically
      sortedEntries = Object.entries(data).sort((a, b) => {
        const weekA = parseInt(a[0].split(' ')[1]);
        const weekB = parseInt(b[0].split(' ')[1]);
        return weekA - weekB;
      });
    } else {
      // Sort years numerically
      sortedEntries = Object.entries(data).sort((a, b) => parseInt(a[0]) - parseInt(b[0]));
    }

    // Calculate points with proper spacing
    const points = sortedEntries.map(([key, value], index) => {
      const x = 50 + index * (1700 / Math.max(sortedEntries.length - 1, 1));
      const y = 290 - (value / (maxValue || 1) * 280);
      return { x, y, label: key };
    });

    if (points.length === 0) return "";
    if (points.length === 1) {
      // If only one point, draw a dot
      return `M${points[0].x},${points[0].y}`;
    }

    // Generate smooth curve through points
    let path = `M${points[0].x},${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      const controlPoint1 = {
        x: current.x + (next.x - current.x) / 3,
        y: current.y
      };
      const controlPoint2 = {
        x: current.x + (next.x - current.x) * 2 / 3,
        y: next.y
      };
      path += ` C${controlPoint1.x},${controlPoint1.y} ${controlPoint2.x},${controlPoint2.y} ${next.x},${next.y}`;
    }
    
    return path;
  };

  const maxValue = Math.max(
    ...Object.values(currentPeriod || {}),
    ...Object.values(previousPeriod || {}),
    1
  );

  const submitData = {
    labels: ['Clothes', 'Medical', 'Food', 'Money', 'Toys', 'Books', 'Games Kit', 'Others'],
    datasets: [
      {
        data: [
          parseFloat(percentages.submitRequest?.itemPercentages?.Clothes || 0),
          parseFloat(percentages.submitRequest?.itemPercentages?.Medical || 0),
          parseFloat(percentages.submitRequest?.itemPercentages?.Food || 0),
          parseFloat(percentages.submitRequest?.itemPercentages?.Money || 0),
          parseFloat(percentages.submitRequest?.itemPercentages?.Toys || 0),
          parseFloat(percentages.submitRequest?.itemPercentages?.Books || 0),
          parseFloat(percentages.submitRequest?.itemPercentages?.["Games Kit"] || 0),
          parseFloat(percentages.submitRequest?.itemPercentages?.Others || 0)
        ],
        backgroundColor: [
          "#FFA500",
          "#5CACE7",
          "#A1CB76",
          "#F93C65",
          "#A8ABAD",
          "#9B59B6",
          "#3498DB",
          "#95A5A6",
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: true,
      },
      legend: {
        display: false,
      },
    },
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  return (
    <>
      <div className="p-4 sm:p-6 md:mt-16 mt-10 ">
        <h2 className="text-3xl mb-2 font-medium text-left" style={{fontFamily:'Inter'}}>Hi,<span className=""> {profile?.loggedinuser?.fullname} </span></h2>
        <h3 className="text-lg mb-6 text-left font-extralight" style={{fontFamily:'Inter'}}> {profile?.loggedinuser?.city}, {profile?.loggedinuser?.pincode} </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 py-4" style={{fontFamily:'Inter'}}>
          <div className="bg-white text-black p-6 shadow-lg rounded-lg flex justify-between items-center">
            <div>
              <h3 className="text-sm font-normal opacity-70">Total Inventory</h3>
              <p className="text-2xl font-bold" style={{fontFamily:'Nunito Sans'}}>{stats.itemCount}</p>
            </div>
            <i className="fas fa-box text-2xl bg-[#908ddb8c] text-[#8280ff] p-3 rounded-2xl">
              <MdPeople className="h-6 w-6"/>
            </i>
          </div>
          <div className="bg-white text-black p-6 shadow-lg rounded-lg flex justify-between items-center">
            <div>
              <h3 className="text-sm font-normal opacity-70">Submit Requests</h3>
              <p className="text-2xl font-bold" style={{fontFamily:'Nunito Sans'}}>{stats.submitRequestsCount}</p>
            </div>
            <i className="fas fa-receipt text-2xl text-[#a57f27] bg-[#f3cd5bd1] p-4 rounded-2xl">
              <GoPackage className="h-6 w-6"/>
            </i>
          </div>
          <div className="bg-white text-black p-6 shadow-lg rounded-lg flex justify-between items-center">
            <div>
              <h3 className="text-sm font-normal opacity-70">Donar Requests</h3>
              <p className="text-2xl font-bold" style={{fontFamily:'Nunito Sans'}}>{stats.donorRequestsCount}</p>
            </div>
            <i className="fas fa-hand-holding-heart text-3xl text-[#4AD991] bg-[#4ac78452] p-3 rounded-2xl">
              <BsGraphUp className="h-6 w-6"/>
            </i>
          </div>
          <div className="bg-white text-black p-6 shadow-lg rounded-lg flex justify-between items-center">
            <div>
              <h3 className="text-sm font-normal opacity-70">Dispatched</h3>
              <p className="text-2xl font-bold" style={{fontFamily:'Nunito Sans'}}>{stats.dispatchedCount}</p>
            </div>
            <i className="fas fa-truck text-2xl text-[#FF9066] bg-[#ffc7b6] p-3 rounded-2xl">
              <FaHistory className="h-6 w-6"/>
            </i>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-6">
          <div className="bg-white p-4 sm:p-6 shadow-lg rounded-lg border border-gray-300">
            <div className="flex justify-between mb-4 flex-wrap">
              <div className="text-lg font-medium sm:text-xl w-full sm:w-auto text-[#1e1e1e]" style={{fontFamily:'Inter'}}>Requests</div>
              <div className="flex items-center bg-[#fcfdfd] border border-[#d5d5d5] rounded-md px-3 py-2 sm:px-4 sm:py-3 w-full sm:w-auto justify-between mt-2 sm:mt-0">
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  dateFormat="MMMM yyyy"
                  showMonthYearPicker
                  className="bg-transparent text-[#2b3034] opacity-60 text-xs sm:text-sm md:text-base cursor-pointer"
                />
              </div>
            </div>
            <hr className="border-t-2 border-gray-200 mb-4" />
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="flex flex-col items-start mb-6 sm:mb-0 sm:w-1/2 gap-3">
                <div className="flex items-center mb-4 sm:mb-0">
                  <div className="bg-orange-400 text-white text-sm font-bold rounded-full px-5 py-2 mr-3" />
                  <div className="text-lg font-normal sm:text-xl text-[#1e1e1e]" style={{fontFamily:'Inter'}}>
                    Clothes - {percentages.donorRequest?.itemPercentages?.Clothes || "0.00"}%
                  </div>
                </div>
                <div className="flex items-center mb-4 sm:mb-0">
                  <div className="bg-[#5CACE7] text-white text-sm font-bold rounded-full px-5 py-2 mr-3" />
                  <div className="text-lg font-normal sm:text-xl text-[#1e1e1e]" style={{fontFamily:'Inter'}}>
                    Medical - {percentages.donorRequest?.itemPercentages?.Medical || "0.00"}%
                  </div>
                </div>
                <div className="flex items-center mb-4 sm:mb-0">
                  <div className="bg-[#A1CB76] text-white text-sm font-bold rounded-full px-5 py-2 mr-3" />
                  <div className="text-lg font-normal sm:text-xl text-[#1e1e1e]" style={{fontFamily:'Inter'}}>
                    Food - {percentages.donorRequest?.itemPercentages?.Food || "0.00"}%
                  </div>
                </div>
                <div className="flex items-center mb-4 sm:mb-0">
                  <div className="bg-[#F93C65] text-white text-sm font-bold rounded-full px-5 py-2 mr-3" />
                  <div className="text-lg font-normal sm:text-xl text-[#1e1e1e]" style={{fontFamily:'Inter'}}>
                    Money - {percentages.donorRequest?.itemPercentages?.Money || "0.00"}%
                  </div>
                </div>
                <div className="flex items-center mb-4 sm:mb-0">
                  <div className="bg-[#A8ABAD] text-white text-sm font-bold rounded-full px-5 py-2 mr-3" />
                  <div className="text-lg font-normal sm:text-xl text-[#1e1e1e]" style={{fontFamily:'Inter'}}>
                    Toys - {percentages.donorRequest?.itemPercentages?.Toys || "0.00"}%
                  </div>
                </div>
                <div className="flex items-center mb-4 sm:mb-0">
                  <div className="bg-[#9B59B6] text-white text-sm font-bold rounded-full px-5 py-2 mr-3" />
                  <div className="text-lg font-normal sm:text-xl text-[#1e1e1e]" style={{fontFamily:'Inter'}}>
                    Books - {percentages.donorRequest?.itemPercentages?.Books || "0.00"}%
                  </div>
                </div>
                <div className="flex items-center mb-4 sm:mb-0">
                  <div className="bg-[#3498DB] text-white text-sm font-bold rounded-full px-5 py-2 mr-3" />
                  <div className="text-lg font-normal sm:text-xl text-[#1e1e1e]" style={{fontFamily:'Inter'}}>
                    Games Kit - {percentages.donorRequest?.itemPercentages?.["Games Kit"] || "0.00"}%
                  </div>
                </div>
                <div className="flex items-center mb-4 sm:mb-0">
                  <div className="bg-[#95A5A6] text-white text-sm font-bold rounded-full px-5 py-2 mr-3" />
                  <div className="text-lg font-normal sm:text-xl text-[#1e1e1e]" style={{fontFamily:'Inter'}}>
                    Others - {percentages.donorRequest?.itemPercentages?.Others || "0.00"}%
                  </div>
                </div>
              </div>
              <div className="sm:w-full max-w-[300px] w-full flex justify-center mb-4 sm:mb-0">
                <Doughnut data={donorData} options={chartOptions} />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 shadow-lg rounded-lg border border-gray-300">
            <div className="flex justify-between mb-4 flex-wrap">
              <div className="text-lg font-medium sm:text-xl w-full sm:w-auto text-[#1e1e1e]" style={{fontFamily:'Inter'}}>Dispatched</div>
              <div className="flex items-center bg-[#fcfdfd] border border-[#d5d5d5] rounded-md px-3 py-2 sm:px-4 sm:py-3 w-full sm:w-auto justify-between mt-2 sm:mt-0">
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  dateFormat="MMMM yyyy"
                  showMonthYearPicker
                  className="bg-transparent text-[#2b3034] opacity-60 text-xs sm:text-sm md:text-base cursor-pointer"
                />
              </div>
            </div>
            <hr className="border-t-2 border-gray-200 mb-4" />
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="flex flex-col items-start mb-6 sm:mb-0 sm:w-1/2 gap-3">
                <div className="flex items-center mb-4 sm:mb-0">
                  <div className="bg-orange-400 text-white text-sm font-bold rounded-full px-5 py-2 mr-3" />
                  <div className="text-lg font-normal sm:text-xl text-[#1e1e1e]" style={{fontFamily:'Inter'}}>
                    Clothes - {percentages.submitRequest?.itemPercentages?.Clothes || "0.00"}%
                  </div>
                </div>
                <div className="flex items-center mb-4 sm:mb-0">
                  <div className="bg-[#5CACE7] text-white text-sm font-bold rounded-full px-5 py-2 mr-3" />
                  <div className="text-lg font-normal sm:text-xl text-[#1e1e1e]" style={{fontFamily:'Inter'}}>
                    Medical - {percentages.submitRequest?.itemPercentages?.Medical || "0.00"}%
                  </div>
                </div>
                <div className="flex items-center mb-4 sm:mb-0">
                  <div className="bg-[#A1CB76] text-white text-sm font-bold rounded-full px-5 py-2 mr-3" />
                  <div className="text-lg font-normal sm:text-xl text-[#1e1e1e]" style={{fontFamily:'Inter'}}>
                    Food - {percentages.submitRequest?.itemPercentages?.Food || "0.00"}%
                  </div>
                </div>
                <div className="flex items-center mb-4 sm:mb-0">
                  <div className="bg-[#F93C65] text-white text-sm font-bold rounded-full px-5 py-2 mr-3" />
                  <div className="text-lg font-normal sm:text-xl text-[#1e1e1e]" style={{fontFamily:'Inter'}}>
                    Money - {percentages.submitRequest?.itemPercentages?.Money || "0.00"}%
                  </div>
                </div>
                <div className="flex items-center mb-4 sm:mb-0">
                  <div className="bg-[#A8ABAD] text-white text-sm font-bold rounded-full px-5 py-2 mr-3" />
                  <div className="text-lg font-normal sm:text-xl text-[#1e1e1e]" style={{fontFamily:'Inter'}}>
                    Toys - {percentages.submitRequest?.itemPercentages?.Toys || "0.00"}%
                  </div>
                </div>
                <div className="flex items-center mb-4 sm:mb-0">
                  <div className="bg-[#9B59B6] text-white text-sm font-bold rounded-full px-5 py-2 mr-3" />
                  <div className="text-lg font-normal sm:text-xl text-[#1e1e1e]" style={{fontFamily:'Inter'}}>
                    Books - {percentages.submitRequest?.itemPercentages?.Books || "0.00"}%
                  </div>
                </div>
                <div className="flex items-center mb-4 sm:mb-0">
                  <div className="bg-[#3498DB] text-white text-sm font-bold rounded-full px-5 py-2 mr-3" />
                  <div className="text-lg font-normal sm:text-xl text-[#1e1e1e]" style={{fontFamily:'Inter'}}>
                    Games Kit - {percentages.submitRequest?.itemPercentages?.["Games Kit"] || "0.00"}%
                  </div>
                </div>
                <div className="flex items-center mb-4 sm:mb-0">
                  <div className="bg-[#95A5A6] text-white text-sm font-bold rounded-full px-5 py-2 mr-3" />
                  <div className="text-lg font-normal sm:text-xl text-[#1e1e1e]" style={{fontFamily:'Inter'}}>
                    Others - {percentages.submitRequest?.itemPercentages?.Others || "0.00"}%
                  </div>
                </div>
              </div>
              <div className="sm:w-full max-w-[300px] w-full flex justify-center mb-4 sm:mb-0">
                <Doughnut data={submitData} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 shadow-lg rounded-lg border border-gray-300 mt-6">
          <div className="flex flex-wrap justify-between items-center mb-4">
            <div className="text-xl font-medium mb-2 sm:mb-0" style={{fontFamily:'Inter'}}>Daily Users</div>

            <div className="flex items-center flex-wrap">
              <div className="flex items-center mr-6 mb-2 sm:mb-0">
                <div className="w-4 h-4 bg-[#4745A4] rounded-full mr-2"></div>
                <div className="text-sm">This {timePeriod}</div>
              </div>

              <div className="flex items-center mr-6 mb-2 sm:mb-0">
                <div className="w-4 h-4 bg-[#FCA311] rounded-full mr-2"></div>
                <div className="text-sm">Last {timePeriod}</div>
              </div>

              <button
                className="flex items-center bg-gray-200 text-sm py-2 px-4 rounded-md border border-gray-300"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {timePeriod.charAt(0).toUpperCase() + timePeriod.slice(1)}
                <i className={`ml-2 fas ${isDropdownOpen ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
              </button>
            </div>
          </div>

          {isDropdownOpen && (
            <div className="bg-white border border-[#dedede] rounded-md shadow-md p-2 w-24 absolute mt-2 z-50 right-6">
              <ul>
                <li 
                  className="py-2 px-4 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleTimePeriodChange('week')}
                >
                  Week
                </li>
                <li 
                  className="py-2 px-4 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleTimePeriodChange('month')}
                >
                  Month
                </li>
                <li 
                  className="py-2 px-4 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleTimePeriodChange('year')}
                >
                  Year
                </li>
              </ul>
            </div>
          )}

          <div className="mt-6">
            {usersLoading ? (
              <div className="flex justify-center items-center h-[300px]">
                Loading...
              </div>
            ) : usersError ? (
              <div className="flex justify-center items-center h-[300px] text-red-500">
                {usersError}
              </div>
            ) : (
              <svg
                width="100%"
                height="300"
                className="relative"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1800 300"
              >
                {/* Y-axis line and labels */}
                 Continuing the SVG section of the AdminDashboardHome.js file:

                <line x1="50" y1="10" x2="50" y2="290" stroke="gray" strokeWidth="1" />
                {[...Array(6)].map((_, idx) => {
                  const value = Math.round((maxValue / 5) * idx);
                  return (
                    <text
                      key={idx}
                      x="35"
                      y={290 - (idx * 280 / 5)}
                      className="text-gray-500 text-xs"
                      dy="5"
                      textAnchor="end"
                    >
                      {value}
                    </text>
                  );
                })}

                {/* X-axis line */}
                <line x1="50" y1="290" x2="1750" y2="290" stroke="gray" strokeWidth="1" />

                {/* X-axis labels */}
                {(() => {
                  let entries;
                  if (timePeriod === 'month') {
                    const months = [
                      "January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December"
                    ];
                    entries = months.filter(month => month in currentPeriod);
                  } else {
                    entries = Object.keys(currentPeriod || {});
                  }
                  
                  return entries.map((label, idx) => (
                    <text
                      key={idx}
                      x={50 + idx * (1700 / Math.max(entries.length - 1, 1))}
                      y="310"
                      className="text-gray-500 text-xs"
                      textAnchor="middle"
                    >
                      {label}
                    </text>
                  ));
                })()}

                {/* Current period line */}
                {Object.keys(currentPeriod || {}).length > 0 && (
                  <path
                    d={generatePathData(currentPeriod)}
                    fill="transparent"
                    stroke="#4745A4"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}

                {/* Previous period line */}
                {Object.keys(previousPeriod || {}).length > 0 && (
                  <path
                    d={generatePathData(previousPeriod)}
                    fill="transparent"
                    stroke="#FCA311"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}

                {/* Current period points */}
                {(() => {
                  let entries;
                  if (timePeriod === 'month') {
                    const months = [
                      "January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December"
                    ];
                    entries = months
                      .filter(month => month in currentPeriod)
                      .map(month => [month, currentPeriod[month]]);
                  } else if (timePeriod === 'week') {
                    entries = Object.entries(currentPeriod || {}).sort((a, b) => {
                      const weekA = parseInt(a[0].split(' ')[1]);
                      const weekB = parseInt(b[0].split(' ')[1]);
                      return weekA - weekB;
                    });
                  } else {
                    entries = Object.entries(currentPeriod || {}).sort((a, b) => 
                      parseInt(a[0]) - parseInt(b[0])
                    );
                  }

                  return entries.map(([key, value], idx) => (
                    <circle
                      key={`current-${idx}`}
                      cx={50 + idx * (1700 / Math.max(entries.length - 1, 1))}
                      cy={290 - (value / (maxValue || 1) * 280)}
                      r="4"
                      fill="#4745A4"
                    />
                  ));
                })()}

                {/* Previous period points */}
                {(() => {
                  let entries;
                  if (timePeriod === 'month') {
                    const months = [
                      "January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December"
                    ];
                    entries = months
                      .filter(month => month in previousPeriod)
                      .map(month => [month, previousPeriod[month]]);
                  } else if (timePeriod === 'week') {
                    entries = Object.entries(previousPeriod || {}).sort((a, b) => {
                      const weekA = parseInt(a[0].split(' ')[1]);
                      const weekB = parseInt(b[0].split(' ')[1]);
                      return weekA - weekB;
                    });
                  } else {
                    entries = Object.entries(previousPeriod || {}).sort((a, b) => 
                      parseInt(a[0]) - parseInt(b[0])
                    );
                  }

                  return entries.map(([key, value], idx) => (
                    <circle
                      key={`previous-${idx}`}
                      cx={50 + idx * (1700 / Math.max(entries.length - 1, 1))}
                      cy={290 - (value / (maxValue || 1) * 280)}
                      r="4"
                      fill="#FCA311"
                    />
                  ));
                })()}
              </svg>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;