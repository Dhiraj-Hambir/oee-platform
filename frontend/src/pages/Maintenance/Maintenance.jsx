import ModuleLayout from '../../components/ModuleLayout';
import '../../components/ModulePage.css';

function Maintenance() {
  return (
    <ModuleLayout moduleName="Maintenance" sidebarItems={['Schedule', 'Work Orders', 'Assets', 'History']}>
      <div className="module-page-container">
        <div className="module-toggle-container">
          <h2>Maintenance Module</h2>
          <p>Maintenance management will be available here.</p>
        </div>
      </div>
    </ModuleLayout>
  );
}

export default Maintenance;

