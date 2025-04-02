import { Monaco, Editor as MonacoEditor } from "@monaco-editor/react";

const Editor = ({
  code,
  setCode,
}: {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleEditorDidMount = (monaco: Monaco) => {
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: true,
    });
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ESNext,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      jsx: monaco.languages.typescript.JsxEmit.React, // ✅ Enable React JSX
      esModuleInterop: true,
      allowJs: true,
      noEmit: true,
      strict: true,
    });
  };
  return (
    <>
      <MonacoEditor
        theme="vs-dark"
        height={"100vh"}
        width={"100%"}
        value={code}
        onChange={(value: string | undefined) => setCode(value || "")}
        beforeMount={handleEditorDidMount}
        defaultLanguage="typescript"
        options={{
          stickyScroll: { enabled: false },
          fontSize: 14,
          fontFamily: "Jetbrains-Mono",
          fontLigatures: true,
          wordWrap: "on",
          minimap: {
            enabled: false,
          },
          bracketPairColorization: {
            enabled: true,
          },
          cursorBlinking: "expand",
          formatOnPaste: true,
          suggest: {
            showFields: false,
            showFunctions: false,
          },
        }}
      />
    </>
  );
};

export default Editor;
