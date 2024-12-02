import React, { useState, useEffect } from 'react'; // Import React and necessary hooks
import { Table, Tag, Input, Button, Select, Spin, Layout, Menu, Avatar } from 'antd'; // Import Ant Design components
import {
  SearchOutlined, // Search icon for search bar
  DashboardOutlined, // Dashboard icon for sidebar menu
  ShoppingCartOutlined, // Shopping cart icon for sidebar menu
  FileTextOutlined, // File icon for sidebar menu
  SettingOutlined, // Settings icon for sidebar menu
  ShopOutlined, // Shop icon for sidebar menu
} from '@ant-design/icons'; // Import icons from Ant Design
import ImprovedGraphs from './ImprovedGraphs'; // Import custom graphs component
import './ProductsTable.css'; // Custom styles for the component
const { Header, Content, Sider } = Layout; // Destructure Layout component from Ant Design

const ProductsTable = () => {
  // State variables to manage product data and filters
  const [products, setProducts] = useState([]); // State for storing all products fetched from the API
  const [filteredProducts, setFilteredProducts] = useState([]); // State for storing filtered products
  const [loading, setLoading] = useState(true); // State for managing loading spinner
  const [searchText, setSearchText] = useState(''); // State for storing search input text
  const [selectedCategory, setSelectedCategory] = useState(''); // State for storing selected category filter
  const [soldStatus, setSoldStatus] = useState(null); // State for storing sold status filter (null for all, true/false for sold/not sold)
  const [collapsed, setCollapsed] = useState(true); // State for managing sidebar collapse (true = collapsed by default)

  // Define table columns for displaying product data
  const columns = [
    {
      title: 'Product Title', // Column header for product title
      dataIndex: 'Title', // Key for accessing the title from product data
      key: 'Title', // Unique key for the column
    },
    {
      title: 'Price', // Column header for product price
      dataIndex: 'Price', // Key for accessing the price from product data
      key: 'Price', // Unique key for the column
      render: (price) => `$${price?.toFixed(2) || '0.00'}`, // Format price to display two decimal places
    },
    {
      title: 'Description', // Column header for product description
      dataIndex: 'Description', // Key for accessing the description from product data
      key: 'Description', // Unique key for the column
    },
    {
      title: 'Category', // Column header for product category
      dataIndex: 'Category', // Key for accessing the category from product data
      key: 'Category', // Unique key for the column
    },
    {
      title: 'Image', // Column header for product image
      dataIndex: 'Image', // Key for accessing the image URL from product data
      key: 'Image', // Unique key for the column
      render: (image) =>
        image ? (
          <img
            src={image} // Display image from the product data
            alt="Product"
            style={{ width: '50px', height: '50px', objectFit: 'cover' }} // Style for the image
          />
        ) : (
          'No Image' // Display if image is not available
        ),
    },
    {
      title: 'Sold', // Column header for sold status
      dataIndex: 'Sold', // Key for accessing the sold status from product data
      key: 'Sold', // Unique key for the column
      render: (sold) => (sold ? 'Yes' : 'No'), // Convert boolean to "Yes"/"No"
    },
    {
      title: 'Is Sale', // Column header for sale status
      dataIndex: 'Is Sale', // Key for accessing sale status from product data
      key: 'Is Sale', // Unique key for the column
      render: (isSale) => (
        <Tag color={isSale ? 'green' : 'red'}>{isSale ? 'On Sale' : 'Not On Sale'}</Tag>
      ), // Show sale status with a color-coded tag
    },
    {
      title: 'Date of Sale', // Column header for sale date
      dataIndex: 'DateOfSale', // Key for accessing the sale date from product data
      key: 'DateOfSale', // Unique key for the column
    },
  ];

  // Fetch product data from the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Show loading spinner while fetching data
      try {
        const response = await fetch('https://e-comerce-backend-mf8i.onrender.com/api/v1/product'); // Fetch product data from API
        const data = await response.json(); // Parse response as JSON
        if (Array.isArray(data)) {
          setProducts(data); // If data is an array, set products state with the data
          setFilteredProducts(data); // Set filtered products as well
        } else if (data.products) {
          setProducts(data.products); // If data has a "products" field, set products state with the data
          setFilteredProducts(data.products); // Set filtered products as well
        }
      } catch (error) {
        console.error('Error fetching products:', error); // Log error if fetching fails
      } finally {
        setLoading(false); // Hide loading spinner after data is fetched
      }
    };

    fetchData(); // Call fetchData function to load the data
  }, []); // Empty dependency array means this effect runs only once when the component mounts

  // Handle search text change
  const handleSearch = (e) => setSearchText(e.target.value);

  // Handle category filter change
  const handleCategoryChange = (value) => setSelectedCategory(value);

  // Handle sold status filter change
  const handleSoldStatusChange = (value) => setSoldStatus(value);

  // Apply filters based on user input
  const applyFilters = () => {
    let filtered = products; // Start with all products
    if (searchText) {
      filtered = filtered.filter((product) =>
        product.Title.toLowerCase().includes(searchText.toLowerCase()) // Filter by product title
      );
    }
    if (selectedCategory) {
      filtered = filtered.filter((product) => product.Category === selectedCategory); // Filter by category
    }
    if (soldStatus !== null) {
      filtered = filtered.filter((product) => product.Sold === soldStatus); // Filter by sold status
    }
    setFilteredProducts(filtered); // Set the filtered products in state
  };

  // Get unique categories for the category filter dropdown
  const categories = [...new Set(products.map((product) => product.Category))];

  // Show loading spinner if data is still loading
  if (loading) return <Spin size="large" />;

  // Show a message if no products are available after filtering
  if (filteredProducts.length === 0) return <p>No products available</p>;

  return (
    <div className='aayush'>
      <Layout style={{ minHeight: '100vh', backgroundColor: '#1f1f1f' }}>
        {/* Sidebar for navigation */}
        <Sider
          width={200}
          style={{ background: '#1f1f1f', color: 'white' }}
          collapsible
          collapsed={collapsed}
          onCollapse={(collapsed) => setCollapsed(collapsed)} // Toggle sidebar collapse
          breakpoint="md" // Collapse sidebar at medium screen size
        >
          <div style={{ color: 'white', padding: '20px', fontSize: '24px', textAlign: 'center' }}>
            Admin Panel
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<DashboardOutlined />}>Dashboard</Menu.Item>
            <Menu.Item key="2" icon={<ShopOutlined />}>Products</Menu.Item>
            <Menu.Item key="3" icon={<ShoppingCartOutlined />}>Sales</Menu.Item>
            <Menu.Item key="4" icon={<FileTextOutlined />}>Orders</Menu.Item>
            <Menu.Item key="5" icon={<SettingOutlined />}>Settings</Menu.Item>
          </Menu>
        </Sider>

        <Layout style={{ padding: '0 20px', background: '#121212' }}>
          <Header style={{ background: '#000', padding: '0 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ color: 'white', fontSize: '24px' }}>E-Commerce Admin</div>
              <Avatar style={{ backgroundColor: '#87d068' }} /> {/* Avatar for profile */}
            </div>
          </Header>

          {/* Main content area */}
          <Content
            style={{
              padding: '24px',
              margin: '16px 0',
              background: '#121212',
              borderRadius: '10px',
              color: 'white',
            }}
          >
            {/* Filters section */}
            <div className="filters-container">
              <Input
                placeholder="Search by Product Title"
                value={searchText}
                onChange={handleSearch}
                style={{
                  width: '100%',
                  marginBottom: '10px',
                  backgroundColor: '#2c2c2c',
                  color: 'white',
                }}
                prefix={<SearchOutlined />}
              />
              <Select
                value={selectedCategory}
                onChange={handleCategoryChange}
                style={{ width: '100%', marginBottom: '10px', backgroundColor: '#2c2c2c', color: 'white' }}
                placeholder="Select Category"
              >
                {categories.map((category) => (
                  <Select.Option key={category} value={category}>
                    {category}
                  </Select.Option>
                ))}
              </Select>
              <Select
                value={soldStatus}
                onChange={handleSoldStatusChange}
                style={{
                  width: '100%',
                  marginBottom: '10px',
                  backgroundColor: '#2c2c2c',
                  color: 'white',
                }}
                placeholder="Select Sold Status"
              >
                <Select.Option value={null}>All</Select.Option>
                <Select.Option value={true}>Sold</Select.Option>
                <Select.Option value={false}>Not Sold</Select.Option>
              </Select>
              <Button
                type="primary"
                onClick={applyFilters}
                style={{ width: '100%', marginBottom: '10px' }}
              >
                Apply Filters
              </Button>
            </div>

            {/* Products table */}
            <Table
              columns={columns}
              dataSource={filteredProducts}
              rowKey="_id" // Use unique ID for each row
              pagination={{ pageSize: 5 }} // Pagination with 5 products per page
            />
            <ImprovedGraphs /> {/* Render custom graphs below the table */}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default ProductsTable;
