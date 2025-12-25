import ModuleLayout from '../../components/ModuleLayout';
import '../../components/ModulePage.css';

function Checklist() {
  return (
    <ModuleLayout moduleName="Checklist" sidebarItems={['My Checklists', 'Templates', 'Completed', 'Reports']}>
      <div className="module-page-container">
        <div className="module-toggle-container">
          <h2>Checklist Module</h2>
          <p>Checklist functionality will be available here.</p>
        </div>
      </div>
    </ModuleLayout>
  );
}

export default Checklist;

