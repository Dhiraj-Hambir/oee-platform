import ModuleLayout from '../../components/ModuleLayout';
import '../../components/ModulePage.css';

function Mint() {
  return (
    <ModuleLayout moduleName="Mint" sidebarItems={['Dashboard', 'Transactions', 'Settings']}>
      <div className="module-page-container">
        <div className="module-toggle-container">
          <h2>Mint Module</h2>
          <p>Mint functionality will be available here.</p>
        </div>
      </div>
    </ModuleLayout>
  );
}

export default Mint;

