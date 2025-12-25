import ModuleLayout from '../../components/ModuleLayout';
import '../../components/ModulePage.css';

function Productivity() {
  return (
    <ModuleLayout moduleName="Productivity" sidebarItems={['Dashboard', 'Analytics', 'Reports', 'Settings']}>
      <div className="module-page-container">
        <div className="module-toggle-container">
          <h2>Productivity Module</h2>
          <p>Productivity tracking will be available here.</p>
        </div>
      </div>
    </ModuleLayout>
  );
}

export default Productivity;

