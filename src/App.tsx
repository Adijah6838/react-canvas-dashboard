import { useState } from 'react';
import CanvasGraph from './components/CanvasGraph';

const IconLayout = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>;
const IconBug = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m8 2 1.88 1.88"></path><path d="M14.12 3.88 16 2"></path><path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"></path><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"></path><path d="M12 20v-9"></path><path d="M6.53 9C4.6 8.8 3 7.1 3 5"></path><path d="M6 13H2"></path><path d="M3 21c0-2.1 1.7-3.9 3.8-4"></path><path d="M20.97 5c0 2.1-1.6 3.8-3.5 4"></path><path d="M22 13h-4"></path><path d="M17.2 17c2.1.1 3.8 1.9 3.8 4"></path></svg>;
const IconTerminal = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>;
const IconSettings = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>;
const IconActivity = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>;

function App() {
  const [isDebugOpen, setIsDebugOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // New state for navigation
  
  const [debugLogs, setDebugLogs] = useState<string[]>([
    "System initialized.",
    "Canvas context created successfully.",
    "Mock data loaded (10 points).",
    "Awaiting user interaction..."
  ]);

  const addDebugLog = (msg: string) => {
    const time = new Date().toLocaleTimeString();
    setDebugLogs(prev => [`[${time}] ${msg}`, ...prev]);
  };

  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    addDebugLog(`Navigated to ${tab.charAt(0).toUpperCase() + tab.slice(1)}`);
  };

  // Reusable Sidebar Item Component
  const NavItem = ({ id, icon, label }: { id: string, icon: React.ReactNode, label: string }) => {
    const isActive = activeTab === id;
    return (
      <div 
        onClick={() => handleNavClick(id)} 
        style={{ 
          display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', cursor: 'pointer', borderRadius: '8px', fontWeight: '500',
          backgroundColor: isActive ? 'rgba(94, 92, 230, 0.1)' : 'transparent',
          color: isActive ? '#5e5ce6' : '#8b8b9e',
          transition: 'all 0.2s'
        }}
      >
        {icon} {label}
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', backgroundColor: '#0f0f13', color: '#fff', overflow: 'hidden' }}>
      
      {/* Sidebar */}
      <div style={{ flexShrink: 0, width: '250px', backgroundColor: '#14141a', borderRight: '1px solid #2a2a35', padding: '20px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '40px', fontSize: '20px', fontWeight: 'bold' }}>
          <span style={{ color: '#5e5ce6' }}><IconActivity /></span> MicroDashboard
        </div>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <NavItem id="overview" icon={<IconLayout />} label="Overview" />
          <NavItem id="issues" icon={<IconBug />} label="Issues" />
          <NavItem id="settings" icon={<IconSettings />} label="Settings" />
        </nav>
      </div>

      {/* Main Content Area (Scrollable) */}
      <div style={{ flex: 1, padding: '40px', overflowY: 'auto', position: 'relative' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', marginBottom: '30px' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '28px', letterSpacing: '-0.5px', textTransform: 'capitalize' }}>
              {activeTab} {activeTab === 'overview' ? 'Performance' : 'Management'}
            </h1>
            <p style={{ color: '#8b8b9e', margin: '5px 0 0 0' }}>Real-time Canvas rendering metrics</p>
          </div>
          <button 
            onClick={() => { setIsDebugOpen(!isDebugOpen); addDebugLog(`Debug console ${!isDebugOpen ? 'opened' : 'closed'}.`); }}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#5e5ce6', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            <IconTerminal /> Toggle Debugger
          </button>
        </div>

        {/* CONDITIONAL RENDERING BASED ON TAB */}
        {activeTab === 'overview' && (
          <>
            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
              {['Active Nodes', 'Data Transfer', 'Error Rate'].map((stat, i) => (
                <div key={i} style={{ backgroundColor: '#181820', padding: '20px', borderRadius: '12px', border: '1px solid #2a2a35' }}>
                  <h3 style={{ margin: '0 0 10px 0', color: '#8b8b9e', fontSize: '14px' }}>{stat}</h3>
                  <p style={{ margin: 0, fontSize: '28px', fontWeight: 'bold' }}>{i === 0 ? '24' : i === 1 ? '1.2GB' : '0.04%'}</p>
                </div>
              ))}
            </div>

            {/* Canvas Graph Card */}
            <div style={{ backgroundColor: '#181820', padding: '25px', borderRadius: '12px', border: '1px solid #2a2a35', overflow: 'hidden' }}>
              <h3 style={{ margin: '0 0 20px 0' }}>Network Traffic Graph (HTML5 Canvas)</h3>
              <CanvasGraph />
            </div>
          </>
        )}

        {activeTab === 'issues' && (
          <div style={{ backgroundColor: '#181820', padding: '40px', borderRadius: '12px', border: '1px solid #2a2a35', textAlign: 'center', color: '#8b8b9e' }}>
            <div style={{ color: '#ff4d4d', marginBottom: '15px', display: 'flex', justifyContent: 'center' }}><IconBug /></div>
            <h2 style={{ color: '#fff', marginBottom: '10px' }}>No Active Issues</h2>
            <p>All systems operational. No bugs have been reported.</p>
          </div>
        )}

        {activeTab === 'settings' && (
          <div style={{ backgroundColor: '#181820', padding: '30px', borderRadius: '12px', border: '1px solid #2a2a35' }}>
            <h2 style={{ color: '#fff', marginBottom: '20px', fontSize: '18px' }}>System Preferences</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '15px', borderBottom: '1px solid #2a2a35' }}>
                <span>Dark Mode</span>
                <span style={{ color: '#4dff88' }}>Enabled</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '15px', borderBottom: '1px solid #2a2a35' }}>
                <span>API Version</span>
                <span style={{ color: '#8b8b9e' }}>v1.0.4</span>
              </div>
            </div>
          </div>
        )}

        {/* Debug Panel Overlay (Fixed Position) */}
        {isDebugOpen && (
          <div style={{ position: 'fixed', top: '80px', right: '40px', width: '400px', maxWidth: 'calc(100vw - 80px)', backgroundColor: '#0a0a0f', border: '1px solid #5e5ce6', borderRadius: '12px', padding: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.8)', zIndex: 1000 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <h3 style={{ margin: 0, color: '#5e5ce6', fontFamily: 'monospace' }}>Debug Console</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontFamily: 'monospace', fontSize: '12px', color: '#4dff88', maxHeight: '200px', overflowY: 'auto' }}>
              {debugLogs.map((log, i) => (
                <div key={i}>&gt; {log}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;