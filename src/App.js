// Import the App.css file to apply global styles to the application
import './App.css';

// Import the Footer component from the components folder
import Footer from './components/Footer';

// Import the AdminDashboard component from the components/home file
import AdminDashboard from './components/home';

function App() {
  return (
    <>
      {/* Start of the component's JSX */}
      <div>
        {/* Render the AdminDashboard component */}
        <AdminDashboard/>

        {/* Render the Footer component */}
        <Footer/>
      </div>
      {/* End of the component's JSX */}
    </>
  );
}

// Export the App component to be used in other parts of the application
export default App;
