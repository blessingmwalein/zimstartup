"use client";
import { useState, useEffect } from "react";
import { _postCompetitionAnswers } from "@/apiServices/competitionServices";
import { useSearchParams } from "next/navigation";
import MyDialog from "@/components/material/Dialog/MyDialog";
import Link from "next/link";

const Client = ({ questions, session }) => {
  const [qtns, setQtns] = useState([]);
  const [answers, setAnswers] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  const company_id = searchParams.get("id");

  useEffect(() => {
    setQtns(questions);
  }, [questions]);

  const handleInputChange = (index, value) => {
    setAnswers((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  const handleSubmit = async () => {
    const unansweredQuestions = qtns?.filter((_, index) => !answers[index]);
    if (unansweredQuestions.length > 0) {
      alert("Please answer all questions before submitting.");
      return;
    }

    const submissionData = qtns?.map((qtn, index) => ({
      question_id: qtn.question_id,
      company_id: company_id,
      answer_text: answers[index],
    }));

    setLoading(true); 
    try {
      const data = await _postCompetitionAnswers(submissionData, session);
      setIsDialogOpen(true); 
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 min-h-screen">
      {qtns?.map((qtn, index) => (
        <div
          key={index}
          className="ring-1 ring-[#cfcfcf] ring-offset-2 ring-offset-slate-50 my-14 p-6 rounded-lg max-w-full md:max-w-[75%] mx-auto"
        >
          <div className="mb-4">
            <p className="text-lg font-semibold text-gray-100 mb-2 text-left">
              {qtn.question_description}
            </p>
            <p className="text-md text-gray-600 text-left">
              {qtn.question_text}
            </p>
          </div>
          <div>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary"
              rows={3}
              placeholder="Type your answer here ...."
              value={answers[index] || ""}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
          </div>
        </div>
      ))}
      <div className="flex justify-end max-auto mr-[40px] md:mr-[180px] text-center mt-8">
        <button
          onClick={handleSubmit}
         className="md:w-[18%]  py-3 px-8 bg-primary font-600 text-[20px] md:text-[26px] text-white rounded-lg hover:opacity-80"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
      <MyDialog
      open={isDialogOpen}
      extended={true}
      _onClose={() => setIsDialogOpen(false)}
      width={600}
      height={200}
    >
      <div className="flex flex-col justify-between h-full">
        <p className="mt-2 text-center text-[20px] md:text-[24px] text-gray-900 font-extralight">
        Thank you! Your answers have been submitted.
        </p>
        <div className="flex justify-center">
          <Link
            href="/competitions"
            className="py-2 md:py-3 px-10 border border-primary rounded-lg bg-white text-primary font-semibold transition-all hover:bg-primary hover:text-white active:bg-primary-dark active:border-primary-dark fixed bottom-4"
          >
            Ok
          </Link>
        </div>
      </div>
    </MyDialog>
    </div>
  );
};

export default Client;
