import { useState } from "react";
import {
  FileText,
  CheckCircle2,
  Circle,
  ClipboardCheck,
  Upload,
  Trash2,
} from "lucide-react";

interface DocumentAssistantProps {
  documents: string[];
}

function DocumentAssistant({ documents }: DocumentAssistantProps) {
  const [completedDocuments, setCompletedDocuments] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  function toggleDocument(document: string) {
    setCompletedDocuments((previous) =>
      previous.includes(document)
        ? previous.filter((item) => item !== document)
        : [...previous, document],
    );
  }

  function handleFileUpload(document: string, file?: File) {
    if (!file) return;

    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];

    if (!allowedTypes.includes(file.type)) {
      setErrors((previous) => ({
        ...previous,
        [document]: "Only PDF, JPG and PNG files are allowed.",
      }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((previous) => ({
        ...previous,
        [document]: "File size must not exceed 5 MB.",
      }));
      return;
    }

    setUploadedFiles((previous) => ({
      ...previous,
      [document]: file,
    }));

    setErrors((previous) => ({
      ...previous,
      [document]: "",
    }));
  }

  function removeFile(document: string) {
    setUploadedFiles((previous) => {
      const updated = { ...previous };
      delete updated[document];
      return updated;
    });

    setErrors((previous) => ({
      ...previous,
      [document]: "",
    }));
  }

  const progress =
    documents.length === 0
      ? 0
      : Math.round((completedDocuments.length / documents.length) * 100);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm mt-8">
      {/* Heading */}
      <div className="flex items-center gap-3">
        <div className="bg-blue-50 text-blue-600 p-3 rounded-lg">
          <ClipboardCheck size={24} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-800">
            Document Assistant
          </h2>
          <p className="text-sm text-slate-500">
            Keep track of and upload your required documents.
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="mt-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="font-medium text-slate-700">
            Preparation Progress
          </span>

          <span className="text-blue-600 font-semibold">{progress}%</span>
        </div>

        <div className="w-full bg-slate-100 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-xs text-slate-500 mt-2">
          {completedDocuments.length} of {documents.length} documents prepared
        </p>
      </div>

      {/* Document checklist and uploads */}
      <div className="mt-6 space-y-4">
        {documents.map((document, index) => {
          const isCompleted = completedDocuments.includes(document);
          const uploadedFile = uploadedFiles[document];
          const error = errors[document];

          const inputId = `document-upload-${index}`;

          return (
            <div
              key={document}
              className="border border-slate-200 rounded-lg p-4 space-y-3"
            >
              {/* Document name */}
              <button
                type="button"
                onClick={() => toggleDocument(document)}
                className="w-full flex items-center gap-3 text-left"
              >
                {isCompleted ? (
                  <CheckCircle2 className="text-green-600" size={22} />
                ) : (
                  <Circle className="text-slate-400" size={22} />
                )}

                <FileText size={20} className="text-slate-500" />

                <span
                  className={`flex-1 text-sm font-medium ${
                    isCompleted
                      ? "text-slate-400 line-through"
                      : "text-slate-700"
                  }`}
                >
                  {document}
                </span>

                <span
                  className={`text-xs font-medium ${
                    isCompleted ? "text-green-600" : "text-slate-400"
                  }`}
                >
                  {isCompleted ? "Prepared" : "Pending"}
                </span>
              </button>

              {/* Upload area */}
              {uploadedFile ? (
                <div className="flex items-center gap-3 bg-blue-50 rounded-lg p-3">
                  <FileText size={20} className="text-blue-600" />

                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-700 truncate">
                      {uploadedFile.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFile(document)}
                    className="text-red-500 hover:text-red-700"
                    aria-label={`Remove ${document} file`}
                  >
                    <Trash2 size={19} />
                  </button>
                </div>
              ) : (
                <div>
                  <input
                    id={inputId}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    onChange={(e) =>
                      handleFileUpload(document, e.target.files?.[0])
                    }
                  />

                  <label
                    htmlFor={inputId}
                    className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer"
                  >
                    <Upload size={17} />
                    Choose a file
                  </label>

                  <p className="text-xs text-slate-400 mt-1">
                    PDF, JPG or PNG (maximum 5 MB)
                  </p>
                </div>
              )}

              {/* Validation error */}
              {error && <p className="text-sm text-red-600">{error}</p>}
            </div>
          );
        })}
      </div>

      {/* Completion message */}
      {progress === 100 && documents.length > 0 && (
        <div className="mt-5 bg-green-50 text-green-700 rounded-lg p-4 text-sm">
          Great! You've marked all required documents as prepared.
        </div>
      )}
    </div>
  );
}

export default DocumentAssistant;
