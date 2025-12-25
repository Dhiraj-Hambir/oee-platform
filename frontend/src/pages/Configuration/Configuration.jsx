import { useState, useEffect } from 'react';
import ModuleLayout from '../../components/ModuleLayout';
import {
  getPermissions,
  savePermissions,
  resetPermissions,
  getAllModules,
  getEnergySubRoutes,
} from '../../utils/permissions';
import './Configuration.css';

function Configuration() {
  const [permissions, setPermissions] = useState(getPermissions());
  const [selectedUserEmail, setSelectedUserEmail] = useState('');
  const [expandedModules, setExpandedModules] = useState({});

  const modules = getAllModules();
  const energySubRoutes = getEnergySubRoutes();

  useEffect(() => {
    // Reload permissions to ensure they're up to date
    const perms = getPermissions();
    setPermissions(perms);
    // Set default selected user to first user
    if (perms.users.length > 0 && !selectedUserEmail) {
      setSelectedUserEmail(perms.users[0].email);
    }
  }, []);

  // Reload permissions when user selection changes
  useEffect(() => {
    if (selectedUserEmail) {
      const perms = getPermissions();
      setPermissions(perms);
    }
  }, [selectedUserEmail]);

  const selectedUser = permissions.users.find(
    (u) => u.email === selectedUserEmail
  );

  const handleUserSelect = (email) => {
    setSelectedUserEmail(email);
  };

  const handleModuleToggle = (moduleId, enabled) => {
    if (!selectedUser) return;

    const updatedPermissions = { ...permissions };
    const userIndex = updatedPermissions.users.findIndex(
      (u) => u.email === selectedUserEmail
    );

    if (userIndex !== -1) {
      updatedPermissions.users[userIndex].modules[moduleId] = enabled;
      
      // If disabling Energy module, disable all Energy sub-routes
      if (moduleId === 'energy' && !enabled) {
        Object.keys(updatedPermissions.users[userIndex].energySubRoutes).forEach(
          (route) => {
            updatedPermissions.users[userIndex].energySubRoutes[route] = false;
          }
        );
      }

      // If enabling module, enable all sub-routes (for Energy)
      if (moduleId === 'energy' && enabled) {
        Object.keys(updatedPermissions.users[userIndex].energySubRoutes).forEach(
          (route) => {
            updatedPermissions.users[userIndex].energySubRoutes[route] = true;
          }
        );
      }

      savePermissions(updatedPermissions);
      setPermissions(updatedPermissions);
    }
  };

  const handleEnableAllModule = (moduleId, enabled) => {
    if (!selectedUser || moduleId !== 'energy') return;

    const updatedPermissions = { ...permissions };
    const userIndex = updatedPermissions.users.findIndex(
      (u) => u.email === selectedUserEmail
    );

    if (userIndex !== -1) {
      // Enable/disable all Energy sub-routes
      Object.keys(updatedPermissions.users[userIndex].energySubRoutes).forEach(
        (route) => {
          updatedPermissions.users[userIndex].energySubRoutes[route] = enabled;
        }
      );
      // Also update the main module
      updatedPermissions.users[userIndex].modules[moduleId] = enabled;

      savePermissions(updatedPermissions);
      setPermissions(updatedPermissions);
    }
  };

  const handleEnergySubRouteToggle = (routeId, enabled) => {
    if (!selectedUser) return;

    const updatedPermissions = { ...permissions };
    const userIndex = updatedPermissions.users.findIndex(
      (u) => u.email === selectedUserEmail
    );

    if (userIndex !== -1) {
      updatedPermissions.users[userIndex].energySubRoutes[routeId] = enabled;
      
      // If enabling any Energy sub-route, enable Energy module
      if (enabled) {
        updatedPermissions.users[userIndex].modules.energy = true;
      } else {
        // If disabling, check if all sub-routes are now disabled
        const allDisabled = Object.values(updatedPermissions.users[userIndex].energySubRoutes).every(
          (val) => val === false
        );
        if (allDisabled) {
          updatedPermissions.users[userIndex].modules.energy = false;
        }
      }

      savePermissions(updatedPermissions);
      setPermissions(updatedPermissions);
    }
  };

  const handleGroupToggle = (groupName, routes, enabled) => {
    if (!selectedUser) return;

    const updatedPermissions = { ...permissions };
    const userIndex = updatedPermissions.users.findIndex(
      (u) => u.email === selectedUserEmail
    );

    if (userIndex !== -1) {
      // Toggle all routes in this group
      routes.forEach((route) => {
        updatedPermissions.users[userIndex].energySubRoutes[route.id] = enabled;
      });

      // Check if all Energy sub-routes are now disabled
      const allDisabled = Object.values(updatedPermissions.users[userIndex].energySubRoutes).every(
        (val) => val === false
      );
      
      if (allDisabled) {
        updatedPermissions.users[userIndex].modules.energy = false;
      } else {
        updatedPermissions.users[userIndex].modules.energy = true;
      }

      savePermissions(updatedPermissions);
      setPermissions(updatedPermissions);
    }
  };


  const toggleModuleExpansion = (moduleId) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  const groupedEnergyRoutes = energySubRoutes.reduce((acc, route) => {
    if (!acc[route.group]) {
      acc[route.group] = [];
    }
    acc[route.group].push(route);
    return acc;
  }, {});

  return (
    <ModuleLayout moduleName="Configuration" sidebarItems={['User Management', 'Permissions', 'Access Control', 'Settings']}>
      <div className="configuration-container">
        <div className="configuration-header">
          <div className="header-top">
            <div>
              <h1>User Access Management</h1>
              <p>Manage user permissions and module access</p>
            </div>
          </div>

          <div className="user-selector-section">
            <div className="user-selector">
              <label htmlFor="user-select">Select User:</label>
              <select
                id="user-select"
                value={selectedUserEmail}
                onChange={(e) => {
                  handleUserSelect(e.target.value);
                  // Reload permissions when user changes
                  setPermissions(getPermissions());
                }}
                className="user-dropdown"
              >
                <option value="">-- Select User --</option>
                {permissions.users.map((user) => (
                  <option key={user.email} value={user.email}>
                    {user.email} ({user.role})
                  </option>
                ))}
              </select>
              <button
                className="reset-permissions-btn"
                onClick={() => {
                  if (window.confirm('Reset all permissions to default? This will reset test user to only have Energy access.')) {
                    resetPermissions();
                    setPermissions(getPermissions());
                    if (selectedUserEmail) {
                      // Reload the selected user's permissions
                      const updatedPerms = getPermissions();
                      const updatedUser = updatedPerms.users.find(
                        (u) => u.email === selectedUserEmail
                      );
                      if (updatedUser) {
                        setSelectedUserEmail(selectedUserEmail); // Trigger re-render
                      }
                    }
                    alert('Permissions reset to default. Test user now only has Energy access.');
                  }
                }}
                title="Reset to default permissions"
              >
                🔄 Reset
              </button>
            </div>
          </div>
        </div>

        {selectedUser ? (
          <div className="permissions-content-new">
            <div className="modules-list">
              {modules.map((module) => {
                const hasAccess = selectedUser.modules[module.id] === true;
                const isExpanded = expandedModules[module.id];
                const isEnergy = module.id === 'energy';
                const isAdmin = selectedUser.role === 'admin';

                return (
                  <div key={module.id} className="module-section">
                    <div
                      className="module-section-header"
                      onClick={() => {
                        if (hasAccess || isEnergy) {
                          toggleModuleExpansion(module.id);
                        }
                      }}
                    >
                      <div className="module-header-left">
                        <button
                          className="expand-icon-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (hasAccess || isEnergy) {
                              toggleModuleExpansion(module.id);
                            }
                          }}
                          disabled={!hasAccess && !isEnergy}
                        >
                          {isExpanded ? '▼' : '▶'}
                        </button>
                        <span className="module-section-title">{module.name} Features</span>
                        <span className="info-icon" title="Module information">ℹ️</span>
                      </div>
                      <div className="module-header-right" onClick={(e) => e.stopPropagation()}>
                        <span className="enable-all-label">Enable All {module.name} Features</span>
                        <label className="toggle-switch">
                          <input
                            type="checkbox"
                            checked={hasAccess}
                            onChange={(e) => handleModuleToggle(module.id, e.target.checked)}
                            disabled={isAdmin}
                          />
                          <span className="toggle-slider"></span>
                        </label>
                      </div>
                    </div>

                    {isEnergy && hasAccess && isExpanded && (
                      <div className="module-sub-features">
                        {Object.entries(groupedEnergyRoutes).map(([group, routes]) => {
                          const allGroupRoutesEnabled = routes.every(
                            (route) => selectedUser.energySubRoutes[route.id] === true
                          );
                          const hasAnyGroupRouteEnabled = routes.some(
                            (route) => selectedUser.energySubRoutes[route.id] === true
                          );

                          return (
                            <div key={group} className="sub-feature-group">
                              <div
                                className="sub-feature-group-header"
                                onClick={() =>
                                  setExpandedModules((prev) => ({
                                    ...prev,
                                    [group]: !prev[group],
                                  }))
                                }
                              >
                                <button
                                  className="expand-icon-btn small"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setExpandedModules((prev) => ({
                                      ...prev,
                                      [group]: !prev[group],
                                    }));
                                  }}
                                >
                                  {expandedModules[group] ? '▼' : '▶'}
                                </button>
                                <span className="sub-feature-group-title">{group}</span>
                                <div className="group-toggle-container">
                                  <span className="enable-all-label">Enable All {group} Features</span>
                                  <label
                                    className="toggle-switch"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <input
                                      type="checkbox"
                                      checked={allGroupRoutesEnabled}
                                      onChange={(e) =>
                                        handleGroupToggle(group, routes, e.target.checked)
                                      }
                                      disabled={isAdmin}
                                    />
                                    <span className="toggle-slider"></span>
                                  </label>
                                </div>
                              </div>

                            {expandedModules[group] && (
                              <div className="sub-feature-items">
                                {routes.map((route) => {
                                  const hasSubAccess =
                                    selectedUser.energySubRoutes[route.id] === true;
                                  return (
                                    <div key={route.id} className="sub-feature-item">
                                      <div className="sub-feature-info">
                                        <span className="sub-feature-name">{route.name}?</span>
                                        <span className="info-icon small" title="Feature information">
                                          ℹ️
                                        </span>
                                      </div>
                                      <label className="toggle-switch">
                                        <input
                                          type="checkbox"
                                          checked={hasSubAccess}
                                          onChange={(e) =>
                                            handleEnergySubRouteToggle(route.id, e.target.checked)
                                          }
                                          disabled={isAdmin}
                                        />
                                        <span className="toggle-slider"></span>
                                      </label>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="no-selection">
            <p>Please select a user to manage their permissions</p>
          </div>
        )}
      </div>
    </ModuleLayout>
  );
}

export default Configuration;
