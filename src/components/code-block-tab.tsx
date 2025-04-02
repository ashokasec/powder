import { CommonTabsContent } from "./code-and-preview-tab-group";
import Editor from "./monaco-code-editor";

const CodeBlock = ({
  code,
  setCode,
}: {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <CommonTabsContent value="code">
      <Editor code={code} setCode={setCode} />
    </CommonTabsContent>
  );
};

export default CodeBlock;
