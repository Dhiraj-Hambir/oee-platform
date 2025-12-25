import ModuleLayout from '../../components/ModuleLayout';
import '../../components/ModulePage.css';

function Designer() {
  return (
    <ModuleLayout moduleName="Designer" sidebarItems={['Templates', 'Components', 'Layouts', 'Settings']}>
      <div className="module-page-container">
        <div className="module-toggle-container">
          <h2>Designer Module</h2>
          <p>Designer functionality will be available here.</p>
        </div>
      </div>
    </ModuleLayout>
  );
}

export default Designer;

