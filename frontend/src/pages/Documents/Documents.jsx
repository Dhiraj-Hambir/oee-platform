import ModuleLayout from '../../components/ModuleLayout';
import '../../components/ModulePage.css';

function Documents() {
  return (
    <ModuleLayout moduleName="Documents" sidebarItems={['All Documents', 'Recent', 'Shared', 'Trash']}>
      <div className="module-page-container">
        <div className="module-toggle-container">
          <h2>Documents Module</h2>
          <p>Document management will be available here.</p>
        </div>
      </div>
    </ModuleLayout>
  );
}

export default Documents;

