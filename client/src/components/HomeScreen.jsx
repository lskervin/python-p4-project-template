import React from 'react';
import { Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import { useOutletContext } from 'react-router-dom';

function HomeScreen() {
    const { tenants, suites } = useOutletContext();
    return (
    <div> 
    <div style={styles.container}>
        <h1 style={styles.greeting}>Welcome to Lease Assistant</h1>
    </div>
    <Dashboard tenants={tenants} suites={suites}/>
    </div> 
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%', // 100% viewport height
        textAlign: 'center',
        backgroundColor: '#00373d',
    },
    greeting: {
        fontWeight: 700,
        textAlign: 'center',
        fontSize: '40px',
        fontFamily: 'Hack, sans-serif',
        textTransform: 'uppercase',
        background: 'linear-gradient(90deg, #000, #fff, #000)',
        letterSpacing: '5px',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '80%',
        animation: 'shine 5s linear infinite',
    }
};



export default HomeScreen;
