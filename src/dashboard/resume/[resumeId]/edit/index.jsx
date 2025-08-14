import Toolbar from "./components/Toolbar";
import ResumePreview from "../../components/ResumePreview";
import FormSection from "../../components/FormSection";
function EditResume() {
  return (
      <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
        <FormSection />
        <div>
          <Toolbar />
          <ResumePreview  />
        </div>
      </div>
  );
}

export default EditResume;
