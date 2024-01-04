"use client";

import { useState } from "react";
import { askQuestion } from "../util/api";

const Question = () => {
  const [value, setValue] = useState("");
  const [loading, isLoading] = useState(false);
  const [answer,setAnswer] = useState('')

  const textInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    isLoading(true);
    const answer = await askQuestion(value);
    setAnswer(answer);
    setValue('');
    isLoading(false);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
        disabled={loading}
          onChange={textInputChange}
          className="border border-gray-300 rounded-md p-2 text-lg"
          type="text"
          value={value}
          placeholder="Ask anything.."
        ></input>
        <button
          disabled={loading}
          type="submit"
          className="bg-blue-400 px-4 py-2 rounded-md"
        >
          Ask
        </button>
      </form>
        {loading && <div> ...loading</div>}
        {answer && <div>{answer}</div>}
    </div>
  );
};

export default Question;
