import { FontProvider } from "@/context/FontContext";
import Toolbar from "./components/Toolbar";
import ResumePreview from "../../components/ResumePreview";
import FormSection from "../../components/FormSection";
import { useContext} from "react";
import { useParams } from "react-router-dom";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
function EditResume() {
  const { resumeId } = useParams();
  const { resumeInfo } = useContext(ResumeInfoContext);

  return (
    <FontProvider resumeId={resumeId} resumeInfo={resumeInfo}>
      <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
        <FormSection />
        <div>
          <Toolbar />
          <ResumePreview  />
        </div>
      </div>
    </FontProvider>
  );
}

export default EditResume;
