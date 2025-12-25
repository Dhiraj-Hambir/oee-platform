// Permissions management utility

// Default permissions structure
const DEFAULT_PERMISSIONS = {
  users: [
    {
      email: 'nikhil@gmail.com',
      role: 'admin',
      modules: {
        admin: true,
        configuration: true,
        checklist: true,
        mint: true,
        energy: true,
        quality: true,
        console: true,
        productivity: true,
        'dfx-ai': true,
        'datonis-bi': true,
        documents: true,
        maintenance: true,
        designer: true,
      },
      energySubRoutes: {
        'digital-input': true,
        'digital-output': true,
        'analog-input': true,
        'analog-output': true,
        'machine-dashboard': true,
        'oee-dashboard': true,
        report: true,
        'energy-consumption': true,
        'energy-monitoring-dashboard': true,
        'power-quality-monitoring': true,
        alerts: true,
        'alert-setup': true,
        'event-data': true,
      },
    },
    {
      email: 'test@gmail.com',
      role: 'user',
      modules: {
        admin: false,
        configuration: false,
        checklist: false,
        mint: false,
        energy: true,
        quality: true,
        console: true,
        productivity: false,
        'dfx-ai': false,
        'datonis-bi': false,
        documents: false,
        maintenance: false,
        designer: false,
      },
      energySubRoutes: {
        'digital-input': true,
        'digital-output': false,
        'analog-input': false,
        'analog-output': false,
        'machine-dashboard': false,
        'oee-dashboard': false,
        report: true,
        'energy-consumption': true,
        'energy-monitoring-dashboard': true,
        'power-quality-monitoring': true,
        alerts: true,
        'alert-setup': true,
        'event-data': true,
      },
    },
  ],
};

// Get permissions from localStorage or return default
export const getPermissions = () => {
  try {
    const stored = localStorage.getItem('userPermissions');
    if (stored) {
      const parsed = JSON.parse(stored);
      // Ensure all default users exist in stored permissions
      const merged = { ...DEFAULT_PERMISSIONS };
      DEFAULT_PERMISSIONS.users.forEach((defaultUser) => {
        const existingUser = parsed.users.find(
          (u) => u.email.toLowerCase() === defaultUser.email.toLowerCase()
        );
        if (existingUser) {
          // Merge existing user with default to ensure all modules are present
          const userIndex = parsed.users.findIndex(
            (u) => u.email.toLowerCase() === defaultUser.email.toLowerCase()
          );
          parsed.users[userIndex] = {
            ...defaultUser,
            ...parsed.users[userIndex],
            modules: { ...defaultUser.modules, ...parsed.users[userIndex].modules },
            energySubRoutes: {
              ...defaultUser.energySubRoutes,
              ...parsed.users[userIndex].energySubRoutes,
            },
          };
        } else {
          // Add default user if not exists
          parsed.users.push(defaultUser);
        }
      });
      return parsed;
    }
    // Initialize with default permissions
    localStorage.setItem('userPermissions', JSON.stringify(DEFAULT_PERMISSIONS));
    return DEFAULT_PERMISSIONS;
  } catch (error) {
    console.error('Error loading permissions:', error);
    // Reset to default on error
    localStorage.setItem('userPermissions', JSON.stringify(DEFAULT_PERMISSIONS));
    return DEFAULT_PERMISSIONS;
  }
};

// Reset permissions to default
export const resetPermissions = () => {
  localStorage.setItem('userPermissions', JSON.stringify(DEFAULT_PERMISSIONS));
  return DEFAULT_PERMISSIONS;
};

// Save permissions to localStorage
export const savePermissions = (permissions) => {
  try {
    localStorage.setItem('userPermissions', JSON.stringify(permissions));
    return true;
  } catch (error) {
    console.error('Error saving permissions:', error);
    return false;
  }
};

// Get user permissions by email
export const getUserPermissions = (email) => {
  const permissions = getPermissions();
  const user = permissions.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  return user || null;
};

// Check if user has access to a module
export const hasModuleAccess = (email, moduleId) => {
  const user = getUserPermissions(email);
  if (!user) return false;
  if (user.role === 'admin') return true; // Admin has access to everything
  return user.modules[moduleId] === true;
};

// Check if user has access to a route
export const hasRouteAccess = (email, route) => {
  const user = getUserPermissions(email);
  if (!user) return false;
  if (user.role === 'admin') return true; // Admin has access to everything

  // Check if route is an Energy sub-route
  const energySubRoutes = [
    'digital-input',
    'digital-output',
    'analog-input',
    'analog-output',
    'machine-dashboard',
    'oee-dashboard',
    'report',
    'energy-consumption',
    'energy-monitoring-dashboard',
    'power-quality-monitoring',
    'alerts',
    'alert-setup',
    'event-data',
  ];

  if (energySubRoutes.includes(route)) {
    // Check if user has access to Energy module first
    if (!user.modules.energy) return false;
    // Then check specific sub-route
    return user.energySubRoutes[route] === true;
  }

  // For other routes, check module access
  const moduleMap = {
    '/admin': 'admin',
    '/configuration': 'configuration',
    '/checklist': 'checklist',
    '/mint': 'mint',
    '/quality': 'quality',
    '/console': 'console',
    '/productivity': 'productivity',
    '/dfx-ai': 'dfx-ai',
    '/datonis-bi': 'datonis-bi',
    '/documents': 'documents',
    '/maintenance': 'maintenance',
    '/designer': 'designer',
  };

  const moduleId = moduleMap[route];
  if (moduleId) {
    return user.modules[moduleId] === true;
  }

  return false;
};

// Update user permissions
export const updateUserPermissions = (email, updates) => {
  const permissions = getPermissions();
  const userIndex = permissions.users.findIndex(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );

  if (userIndex === -1) {
    // User doesn't exist, create new user
    permissions.users.push({
      email,
      role: 'user',
      modules: {},
      energySubRoutes: {},
      ...updates,
    });
  } else {
    // Update existing user
    permissions.users[userIndex] = {
      ...permissions.users[userIndex],
      ...updates,
    };
  }

  return savePermissions(permissions);
};

// Add new user
export const addUser = (email, role = 'user') => {
  const permissions = getPermissions();
  
  // Check if user already exists
  if (permissions.users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return false; // User already exists
  }

  permissions.users.push({
    email,
    role,
    modules: {},
    energySubRoutes: {},
  });

  return savePermissions(permissions);
};

// Delete user
export const deleteUser = (email) => {
  const permissions = getPermissions();
  permissions.users = permissions.users.filter(
    (u) => u.email.toLowerCase() !== email.toLowerCase()
  );
  return savePermissions(permissions);
};

// Get all modules list
export const getAllModules = () => {
  return [
    { id: 'admin', name: 'ADMIN', path: '/admin' },
    { id: 'configuration', name: 'CONFIGURATION', path: '/configuration' },
    { id: 'checklist', name: 'CHECKLIST', path: '/checklist' },
    { id: 'mint', name: 'MINT', path: '/mint' },
    { id: 'energy', name: 'ENERGY', path: '/digital-input' },
    { id: 'quality', name: 'QUALITY', path: '/quality' },
    { id: 'console', name: 'CONSOLE', path: '/console' },
    { id: 'productivity', name: 'PRODUCTIVITY', path: '/productivity' },
    { id: 'dfx-ai', name: 'DFX AI', path: '/dfx-ai' },
    { id: 'datonis-bi', name: 'DATONIS BI', path: '/datonis-bi' },
    { id: 'documents', name: 'DOCUMENTS', path: '/documents' },
    { id: 'maintenance', name: 'MAINTENANCE', path: '/maintenance' },
    { id: 'designer', name: 'DESIGNER', path: '/designer' },
  ];
};

// Get all Energy sub-routes
export const getEnergySubRoutes = () => {
  return [
    { id: 'digital-input', name: 'Digital Input', path: '/digital-input', group: 'IO Management' },
    { id: 'digital-output', name: 'Digital Output', path: '/digital-output', group: 'IO Management' },
    { id: 'analog-input', name: 'Analog Input', path: '/analog-input', group: 'IO Management' },
    { id: 'analog-output', name: 'Analog Output', path: '/analog-output', group: 'IO Management' },
    { id: 'machine-dashboard', name: 'Machine Dashboard', path: '/machine-dashboard', group: 'Machine' },
    { id: 'oee-dashboard', name: 'OEE Dashboard', path: '/oee-dashboard', group: 'Machine' },
    { id: 'energy-consumption', name: 'Energy Consumption', path: '/energy-consumption', group: 'Machine' },
    { id: 'report', name: 'Report', path: '/report', group: 'Machine' },
    { id: 'energy-monitoring-dashboard', name: 'Energy Monitoring Dashboard', path: '/energy-monitoring-dashboard', group: 'Energy Management' },
    { id: 'power-quality-monitoring', name: 'Power Quality Monitoring', path: '/power-quality-monitoring', group: 'Energy Management' },
    { id: 'event-data', name: 'Event Data', path: '/event-data', group: 'Energy Management' },
    { id: 'alerts', name: 'Alerts', path: '/alerts', group: 'Energy Management' },
    { id: 'alert-setup', name: 'Alert Setup', path: '/alert-setup', group: 'Energy Management' },
  ];
};

