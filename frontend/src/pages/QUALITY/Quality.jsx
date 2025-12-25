import ModuleLayout from '../../components/ModuleLayout';
import '../../components/ModulePage.css';

function Quality() {
  return (
    <ModuleLayout moduleName="Quality" sidebarItems={['Inspections', 'Reports', 'Standards', 'Analytics']}>
      <div className="module-page-container">
        <div className="module-toggle-container">
          <h2>Quality Module</h2>
          <p>Quality management will be available here.</p>
        </div>
      </div>
    </ModuleLayout>
  );
}

export default Quality;

