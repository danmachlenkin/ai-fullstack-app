"use client";

import { useState } from "react";
import { useAutosave } from "react-autosave";
import { updateEntry } from "../util/api";

const Editor = ({ entry }) => {
  let [value, setValue] = useState(entry.content);
  let [isLoading, setIsLoading] = useState(false);
  let [analysis,setAnalysis] = useState(entry.analysis)

  const { mood, summary, negative, color, subject } = analysis;
  const analysisData = [
    { name: "Summary", value: summary },
    { name: "Subject", value: subject },
    { name: "Mood", value: mood },
    { name: "Negative", value: negative ? "True" : "False" },
  ];

  useAutosave({
    data: value,
    onSave: async (_value) => {
      setIsLoading(true);
      const data = await updateEntry(entry.id, _value);
      setAnalysis(data.analysis);
      setIsLoading(false);
    },
  });


  return (
    <div className="w-full h-full grid grid-cols-3 overflow-hidden">
      <div className="col-span-2">
        <div>{isLoading && <div>...loading</div>}</div>
        <textarea
          className="w-full h-full p-8 text-xl outline-none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div className="border-l border-black/10">
        <div className=" px-10 py-10" style={{ backgroundColor: color }}>
          <h2 className="text-2xl ">Analysis</h2>
        </div>
        <div>
          <ul>
            {analysisData.map((item) => (
              <li
                key={item.name}
                className="flex items-center justify-between border-t border-b border-black/10 px-2 py-4"
              >
                <span className="text-lg font-semibold">{item.name}</span>
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Editor;
