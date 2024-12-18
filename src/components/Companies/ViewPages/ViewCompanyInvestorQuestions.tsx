import React from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import AddInvestorQuestionDialog from "../Modals/AddInvestorQuestion";

const ViewCompanyInvestorQuestions: React.FC = () => {
  const investorQuestions = [
    {
      question: "What is the company's long-term vision?",
      answers: [
        {
          userFullName: "John Doe",
          answer:
            "Our long-term vision is to become a leader in sustainable energy solutions, expanding globally and making renewable energy accessible to all.",
        },
        {
          userFullName: "Jane Smith",
          answer: "We plan to make significant advancements in green technology.",
        },
      ],
    },
    {
      question: "How does the company plan to scale operations?",
      answers: [
        {
          userFullName: "Michael Brown",
          answer:
            "We aim to scale operations through strategic partnerships, technology investments, and expanding into high-growth markets.",
        },
      ],
    },
    {
      question: "What are the biggest risks to your business?",
      answers: [
        {
          userFullName: "Emily Davis",
          answer:
            "Key risks include market competition, regulatory changes, and supply chain disruptions. We mitigate these through diversification and risk management strategies.",
        },
        {
          userFullName: "Robert Wilson",
          answer:
            "The main risk is maintaining product quality during rapid expansion.",
        },
      ],
    },
  ];

  return (
    <main className="relative w-full rounded-lg bg-white p-6 shadow-md">
      {/* Add Question Button */}
      <div className="flex justify-end mb-4">
       <AddInvestorQuestionDialog />
      </div>

      {/* Investor Questions */}
      <div className="mx-auto divide-y divide-gray-200 rounded-xl bg-gray-50">
        {investorQuestions.map((item, index) => (
          <Disclosure as="div" key={index} className="p-6">
            <Disclosure.Button className="group flex w-full items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Question Number */}
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white text-sm font-medium">
                  {index + 1}
                </span>
                {/* Question Text */}
                <span className="text-lg font-medium text-gray-800 group-hover:text-gray-600">
                  {item.question}
                </span>
              </div>
              <ChevronDownIcon className="h-5 w-5 text-gray-500 group-hover:text-gray-400 group-open:rotate-180 transition-transform" />
            </Disclosure.Button>
            <Disclosure.Panel className="mt-2">
              {/* List Group for Answers */}
              <ul className="space-y-4">
                {item.answers.map((answerItem, answerIndex) => (
                  <li key={answerIndex} className="border-b pb-4 last:border-none">
                    <p className="text-sm font-medium text-gray-700">
                      {answerItem.userFullName}
                    </p>
                    <p className="text-sm text-gray-600">{answerItem.answer}</p>
                  </li>
                ))}
              </ul>
            </Disclosure.Panel>
          </Disclosure>
        ))}
      </div>
    </main>
  );
};

export default ViewCompanyInvestorQuestions;
