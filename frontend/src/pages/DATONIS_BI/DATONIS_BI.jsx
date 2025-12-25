import ModuleLayout from '../../components/ModuleLayout';
import '../../components/ModulePage.css';

function DATONIS_BI() {
  return (
    <ModuleLayout moduleName="DATONIS BI" sidebarItems={['Dashboards', 'Reports', 'Data Sources', 'Analytics']}>
      <div className="module-page-container">
        <div className="module-toggle-container">
          <h2>DATONIS BI Module</h2>
          <p>DATONIS BI analytics will be available here.</p>
        </div>
      </div>
    </ModuleLayout>
  );
}

export default DATONIS_BI;

