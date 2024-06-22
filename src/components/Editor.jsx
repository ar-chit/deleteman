import MonacoEditor from "@monaco-editor/react";
import { Rnd } from "react-rnd";

export default function Editor({ content, isPending }) {
  return (
    content && (
      <Rnd
        default={{
          x: 0,
          y: 300,
          width: "98.2vw",
          height: 300,
        }}
      >
        <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
          <MonacoEditor
            height="85vh"
            width={`100%`}
            language={"json"}
            value={content}
            theme="vs-dark"
            defaultValue="// some comment"
          />
        </div>
      </Rnd>
    )
  );
}
