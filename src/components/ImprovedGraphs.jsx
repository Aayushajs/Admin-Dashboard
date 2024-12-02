import React, { useEffect, useState } from 'react'; // Import necessary React hooks
import {
  BarChart,
  LineChart,
  PieChart,
  Pie,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
  Cell
} from 'recharts'; // Import required chart components from recharts

// Fetch products API
const FetchProducts = () => {
  const [products, setProducts] = useState([]); // State to store fetched product data
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    // Effect hook to fetch products when the component is mounted
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://e-comerce-backend-mf8i.onrender.com/api/v1/product'); // API call to fetch products
        const data = await response.json(); // Parse the response data as JSON
        setProducts(data); // Store fetched products in state
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching products:', error); // Log any errors
        setLoading(false); // Set loading to false even if an error occurs
      }
    };

    fetchProducts(); // Call the fetchProducts function
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  if (loading) {
    return <p>Loading products...</p>; // Show loading message while data is being fetched
  }

  return <ProductGraphs products={products} />; // Pass the fetched products to the ProductGraphs component
};

// Group products by category and month based on DateOfSale
const groupByCategoryAndMonth = (products) => {
  return products.reduce((acc, product) => {
    const category = product.category || 'Uncategorized'; // If no category, default to 'Uncategorized'
    const month = new Date(product.DateOfSale).toLocaleString('default', { month: 'long', year: 'numeric' }); // Format DateOfSale to "Month Year"

    const key = `${category}-${month}`; // Combine category and month as a unique key

    if (!acc[key]) {
      acc[key] = { category, month, totalSales: 0, totalItems: 0 }; // Initialize key if it doesn't exist
    }

    acc[key].totalSales += product.Price; // Add product's price to total sales
    acc[key].totalItems += 1; // Increment the total items count
    return acc; // Return accumulator with updated values
  }, {});
};

// Prepare data for BarChart (Sales)
const prepareBarChartData = (groupedData) => {
  const monthlyData = {}; // Object to hold monthly data by category

  Object.values(groupedData).forEach((item) => {
    const { category, month, totalSales } = item; // Destructure to get category, month, and total sales

    if (!monthlyData[month]) {
      monthlyData[month] = {}; // Initialize monthly data if it doesn't exist
    }

    monthlyData[month][category] = totalSales; // Store total sales per category for the given month
  });

  // Return the final array of data to be used in BarChart
  return Object.keys(monthlyData).map((month) => ({
    name: month, // Month name
    ...monthlyData[month], // Spread category-wise sales data
  }));
};

// Prepare data for LineChart (Items)
const prepareLineChartData = (groupedData) => {
  const monthlyData = {}; // Object to hold monthly data by category

  Object.values(groupedData).forEach((item) => {
    const { category, month, totalItems } = item; // Destructure to get category, month, and total items

    if (!monthlyData[month]) {
      monthlyData[month] = {}; // Initialize monthly data if it doesn't exist
    }

    monthlyData[month][category] = totalItems; // Store total items per category for the given month
  });

  // Return the final array of data to be used in LineChart
  return Object.keys(monthlyData).map((month) => ({
    name: month, // Month name
    ...monthlyData[month], // Spread category-wise item data
  }));
};

// Prepare data for PieChart (Category Distribution)
const preparePieChartData = (products) => {
  const categoryCounts = products.reduce((acc, product) => {
    const category = product.category || 'Unknown Category'; // Default to 'Unknown Category' if no category
    acc[category] = (acc[category] || 0) + 1; // Count the occurrences of each category
    return acc; // Return accumulator with updated counts
  }, {});

  // Return the final array of category counts to be used in PieChart
  return Object.keys(categoryCounts).map((category) => ({
    name: category, // Category name
    value: categoryCounts[category], // Category count
  }));
};

// Graph component
const ProductGraphs = ({ products }) => {
  const groupedData = groupByCategoryAndMonth(products); // Group products by category and month

  // Prepare data for sales and items
  const salesData = prepareBarChartData(groupedData); // Prepare data for BarChart (Sales)
  const itemsData = prepareLineChartData(groupedData); // Prepare data for LineChart (Items)

  // Prepare data for category-wise distribution
  const pieChartData = preparePieChartData(products); // Prepare data for PieChart (Category Distribution)

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF499E']; // Define color palette for charts

  return (
    <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '12px' }}>
      {/* Title */}
      <h3 style={{ textAlign: 'center', color: '#333', fontSize: '28px', marginBottom: '30px' }}>
        Product Sales and Items Analysis
      </h3>

      {/* Category-Wise Sales Amount (Monthly) */}
      <div style={{ marginBottom: '40px' }}>
        <h4 style={{ marginBottom: '20px', color: '#4caf50', textAlign: 'center' }}>
          Category-Wise Sales Amount (Monthly)
        </h4>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={salesData} // Pass sales data to BarChart
            margin={{ top: 20, right: 40, left: 30, bottom: 20 }}
          >
            <XAxis dataKey="name" style={{ fontSize: 12, fill: '#888' }}>
              <Label value="Month-Year" position="bottom" style={{ fontSize: 14, fill: '#333' }} />
            </XAxis>
            <YAxis style={{ fontSize: 12, fill: '#888' }}>
              <Label value="Sales Amount (in USD)" angle={-90} position="left" style={{ fontSize: 14, fill: '#333' }} />
            </YAxis>
            <CartesianGrid strokeDasharray="4 4" stroke="#ccc" />
            <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: 5, fontSize: '14px' }} />
            <Legend verticalAlign="top" height={36} />
            {Object.keys(salesData[0]).map((key, idx) => {
              if (key !== 'name') {
                return (
                  <Bar
                    key={key}
                    dataKey={key}
                    fill={COLORS[idx % COLORS.length]} // Assign colors to bars
                    barSize={30}
                    radius={[10, 10, 0, 0]} // Round the top corners of bars
                  />
                );
              }
              return null;
            })}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Total Items in Each Category (Monthly) */}
      <div>
        <h4 style={{ marginBottom: '20px', color: '#2196f3', textAlign: 'center' }}>
          Total Items in Each Category (Monthly)
        </h4>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={itemsData} margin={{ top: 20, right: 40, left: 30, bottom: 20 }}>
            <XAxis dataKey="name" style={{ fontSize: 12, fill: '#888' }}>
              <Label value="Month-Year" position="bottom" style={{ fontSize: 14, fill: '#333' }} />
            </XAxis>
            <YAxis style={{ fontSize: 12, fill: '#888' }}>
              <Label value="Total Items" angle={-90} position="left" style={{ fontSize: 14, fill: '#333' }} />
            </YAxis>
            <CartesianGrid strokeDasharray="4 4" stroke="#ccc" />
            <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: 5, fontSize: '14px' }} />
            <Legend verticalAlign="top" height={36} />
            {Object.keys(itemsData[0]).map((key, idx) => {
              if (key !== 'name') {
                return (
                  <Line
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stroke={COLORS[idx % COLORS.length]}
                    strokeWidth={3}
                    dot={{ fill: COLORS[idx % COLORS.length] }}
                  />
                );
              }
              return null;
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Category Distribution (Pie Chart) */}
      <div style={{ marginTop: '40px' }}>
        <h4 style={{ marginBottom: '20px', color: '#f44336', textAlign: 'center' }}>
          Category Distribution
        </h4>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={pieChartData} // Pass pie chart data
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={150}
              label
              labelLine={false}
            >
              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} /> // Set colors for pie segments
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FetchProducts; // Export the FetchProducts component
