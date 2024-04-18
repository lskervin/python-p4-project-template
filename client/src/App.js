import React, { useState, useEffect } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Leases from './components/Leases/Leases';
import Tenants from './components/Tenants/Tenants';
import LeaseDetail from './components/Leases/LeaseDetail';
import TenantDetail from './components/Tenants/TenantDetail';
import LeaseForm from './components/Forms/LeaseForm';
import TenantForm from './components/Forms/TenantForm';
import NavBar from './components/NavBar';
import HomeScreen from './components/HomeScreen';

function App() {
    const [leases, setLeases] = useState([]);
    const [properties, setProperties] = useState([]);
    const [tenants, setTenants] = useState([]);
    const [suites, setSuites] = useState([]);
    const [landlord, setLandlord] = useState([]);
    const [guarantors, setGuarantors] = useState([]);

    // Fetch leases and set leases state
    useEffect(() => {
        const fetchLeases = async () => {
            try {
                const response = await fetch('/leases');
                if (!response.ok) {
                    throw new Error('Failed to fetch leases');
                }
                const leaseArr = await response.json();
                setLeases(leaseArr);
            } catch (error) {
                console.error(error);
            }
        };
        fetchLeases();
    }, []);

    // Fetch another data set and set properties
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await fetch('/properties');
                if (!response.ok) {
                    throw new Error('Failed to fetch data from another endpoint');
                }
                const data = await response.json();
                setProperties(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchProperties();
    }, []);

     // Fetch another data set and set properties
     useEffect(() => {
      const fetchTenants = async () => {
          try {
              const response = await fetch('/tenants');
              if (!response.ok) {
                  throw new Error('Failed to fetch data from another endpoint');
              }
              const data = await response.json();
              setTenants(data);
          } catch (error) {
              console.error(error);
          }
      };
      fetchTenants();
  }, []);

    // Fetch another data set and set properties
    useEffect(() => {
      const fetchSuites = async () => {
          try {
              const response = await fetch('/suites');
              if (!response.ok) {
                  throw new Error('Failed to fetch data from another endpoint');
              }
              const data = await response.json();
              setSuites(data);
          } catch (error) {
              console.error(error);
          }
      };
      fetchSuites();
  }, []);

  // Fetch another data set and set properties
  useEffect(() => {
    const fetchLandlord = async () => {
        try {
            const response = await fetch('/landlords');
            if (!response.ok) {
                throw new Error('Failed to fetch data from another endpoint');
            }
            const data = await response.json();
            setLandlord(data);
        } catch (error) {
            console.error(error);
        }
    };
    fetchLandlord();
}, []);

   // Fetch another data set and set properties
   useEffect(() => {
    const fetchGuarantors= async () => {
        try {
            const response = await fetch('/guarantors');
            if (!response.ok) {
                throw new Error('Failed to fetch data from another endpoint');
            }
            const data = await response.json();
            setGuarantors(data);
        } catch (error) {
            console.error(error);
        }
    };
    fetchGuarantors();
}, []);

    return (
      <div>
    <Header />
    <main>
        <NavBar />
        <hr style={{border: "1px solid rgba(0, 55, 61, 0.5)"}}/>
        {/* Providing the leases and properties as context to child routes */}
        <Routes>
            {/* Route for the home screen */}
            <Route path="/" element={<Outlet context={{ tenants, suites }} />}>
                <Route index element={<HomeScreen />} /> {/* Fixed element syntax */}
            </Route>

            {/* Route for leases */}
            <Route path="/leases/*" element={<Outlet context={{ leases, setLeases, properties, tenants, landlord, guarantors, suites }} />}>
                <Route index element={<Leases />} />
                <Route path=":id" element={<LeaseDetail />} />
                <Route path="new-lease/*" element={<LeaseForm />} />
            </Route>

            {/* Route for tenants */}
            <Route path="/tenants/*" element={<Outlet context={{ tenants, setTenants }} />}>
                <Route index element={<Tenants />} />
                <Route path=":id" element={<TenantDetail />} />
                <Route path="new-tenant/*" element={<TenantForm />} />
            </Route>
        </Routes>
    </main>
    <footer></footer>
</div>

    );
}

export default App;
