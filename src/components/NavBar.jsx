import { useState } from "react";
import Params from "./Params";
import Auth from "./Auth";
import Body from "./Body";
import Headers from "./Headers";

const examples = [
  {
    name: "Params",
  },
  {
    name: "Authorization",
  },
  {
    name: "Headers",
  },
  {
    name: "Body",
  },
];

export default function NavBar({ className, ...props }) {
  const [selected, setSelected] = useState("Params");

  function handleSelected(value) {
    setSelected(value);
  }

  return (
    <div className="relative">
      <div className={"max-w-[600px] lg:max-w-none"}>
        <ul className={`mb-4 flex items-center ${className}`} {...props}>
          {examples.map((example) => (
            <li
              onClick={() => handleSelected(example.name)}
              key={example.name}
              className={`
                flex h-7 cursor-pointer items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary
                ${
                  selected === example.name
                    ? "bg-muted font-medium text-primary"
                    : "text-muted-foreground"
                }
              `}
            >
              {example.name}
            </li>
          ))}
        </ul>
      </div>
      {selected === "Params" && <Params />}
      {selected === "Authorization" && <Auth />}
      {selected === "Headers" && <Headers/>}
      {selected === "Body" && <Body />}
    </div>
  );
}
