import { useState } from 'react';
import ModuleLayout from '../../components/ModuleLayout';
import '../../components/ModulePage.css';
import './Admin.css';
import Users from './Users';
import CreateUser from './CreateUser';
import EditUser from './EditUser';

function Admin() {
  const [activeTab, setActiveTab] = useState('Users');
  const [editingUser, setEditingUser] = useState(null);

  const handleEditUser = (user) => {
    setEditingUser(user);
    setActiveTab('Edit User');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return (
          <div className="admin-container">
            <div className="admin-header">
              <h2>Dashboard Overview</h2>
            </div>
            <div className="dashboard-grid">
              <div className="stat-card">
                <h3>Total Users</h3>
                <div className="value">124</div>
              </div>
              <div className="stat-card">
                <h3>Active Now</h3>
                <div className="value">42</div>
              </div>
              <div className="stat-card">
                <h3>New Today</h3>
                <div className="value">5</div>
              </div>
            </div>
          </div>
        );
      case 'Users':
        return (
          <Users
            onCreateClick={() => setActiveTab('Create User')}
            onEditClick={handleEditUser}
          />
        );
      case 'Create User':
        return <CreateUser onCancel={() => setActiveTab('Users')} />;
      case 'Edit User':
        return <EditUser user={editingUser} onCancel={() => setActiveTab('Users')} />;
      default:
        return (
          <div className="module-page-container">
            <div className="module-toggle-container">
              <h2>{activeTab}</h2>
              <p>{activeTab} functionality will be available here.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <ModuleLayout
      moduleName="Admin"
      sidebarItems={['Dashboard', 'Users', 'Create User', 'Settings', 'Permissions']}
      activeItem={activeTab === 'Edit User' ? 'Users' : activeTab}
      onItemClick={(item) => setActiveTab(item)}
    >
      {renderContent()}
    </ModuleLayout>
  );
}


export default Admin;
