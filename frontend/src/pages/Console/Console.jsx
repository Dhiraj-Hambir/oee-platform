import ModuleLayout from '../../components/ModuleLayout';
import '../../components/ModulePage.css';

function Console() {
  return (
    <ModuleLayout moduleName="Console" sidebarItems={['Terminal', 'Logs', 'Commands', 'History']}>
      <div className="module-page-container">
        <div className="module-toggle-container">
          <h2>Console Module</h2>
          <p>Console functionality will be available here.</p>
        </div>
      </div>
    </ModuleLayout>
  );
}

export default Console;

