"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import MainLayout from "@/components/Layouts/MainLayout";
import { Loader2, ArrowRight, CheckCircle } from "lucide-react";
import { Company } from "@/hooks/useInvestmentData";
import { CompetitionQuestion } from "@/state/models/competitions";
import {
  getCompetitionQuestions,
  joinCompetition,
  submitCompetitionAnswers,
} from "@/state/services/competitions";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserCompanies } from "@/state/slices/companySlice";
import { AppDispatch } from "@/state/store";
import Stepper from "@/components/common/Stepper";
import CustomButton from "@/components/Buttons/CustomButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function JoinCompetitionPage() {
  const [step, setStep] = useState(1);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [questions, setQuestions] = useState<CompetitionQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(false);
  const questionsFetched = useRef(false);

  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: any) => state.auth);
  const { userCompanies: companies, status: companiesLoading } = useSelector(
    (state: any) => state.company,
  );

  const params = useParams();
  const router = useRouter();
  const competition_id = Number(params.competition_id);

  useEffect(() => {
    if (user?.national_id) {
      dispatch(fetchUserCompanies(user.national_id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    const fetchQuestions = async () => {
      if (competition_id) {
        try {
          setLoading(true);
          const res = await getCompetitionQuestions(competition_id);
          if (res.data) {
            setQuestions(res.data);
          }
        } catch (err) {
          toast.error("Failed to fetch competition questions.");
        } finally {
          setLoading(false);
        }
      }
    };

    if (competition_id && !questionsFetched.current) {
      questionsFetched.current = true;
      fetchQuestions();
    }
  }, [competition_id]);

  const handleCompanySelect = (company: Company) => {
    setSelectedCompany(company);
  };

  const handleNextStep = async () => {
    if (selectedCompany && user?.national_id) {
      try {
        setLoading(true);
        await joinCompetition({
          company_id: selectedCompany.company_id,
          competition_id,
          national_id: user.national_id,
        });
        // toast.success("Successfully sub");
        setLoading(false);
        setStep(2);
      } catch (err) {
        toast.error("Failed to join competition. Please try again.");
        setLoading(false);
      }
    }
  };

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmitAnswers = async () => {
    setLoading(true);
    const answerPayload = Object.entries(answers).map(
      ([question_id, answer_text]) => ({
        question_id: Number(question_id),
        company_id: selectedCompany!.company_id,
        answer_text,
      }),
    );

    try {
      await submitCompetitionAnswers(answerPayload);
      toast.success("Successfully submitted your application!");
      setTimeout(() => {
        router.push("/competitions");
      }, 2000);
    } catch (err) {
      toast.error("Failed to submit answers. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const stepperHeadings = ["Select Company", "Competition Questions"];

  return (
    <MainLayout>
      <ToastContainer />
      <main className="min-h-screen bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Stepper */}
          <Stepper currentStep={step - 1} headings={stepperHeadings} />

          {step === 1 && (
            <div className="rounded-xl bg-white p-8 shadow-lg">
              <h2 className="mb-2 text-3xl font-bold text-gray-800">
                Select Your Company
              </h2>
              <p className="mb-8 text-gray-500">
                Choose which of your companies will be entering the competition.
              </p>

              {companiesLoading === "loading" ? (
                <div className="flex items-center justify-center py-10">
                  <Loader2 className="h-8 w-8 animate-spin text-secondary" />
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {companies.map((company: Company) => (
                    <div
                      key={company.company_id}
                      onClick={() => handleCompanySelect(company)}
                      className={`cursor-pointer rounded-lg border p-4 transition-all ${selectedCompany?.company_id === company.company_id ? "border-green-500 ring-2 ring-green-500" : "border-gray-200 hover:border-gray-400"}`}
                    >
                      <h3 className="text-lg font-bold text-gray-800">
                        {company.company_name}
                      </h3>
                      <p className="text-sm text-gray-500">{company.sector}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-8 flex justify-end">
                <CustomButton
                  type="button"
                  variant="solid"
                  onClick={handleNextStep}
                  isDisabled={!selectedCompany || loading}
                  isLoading={loading}
                  icon={<ArrowRight className="ml-2 h-5 w-5" />}
                >
                  Next
                </CustomButton>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="rounded-xl bg-white p-8 shadow-lg">
              <h2 className="mb-2 text-3xl font-bold text-gray-800">
                Competition Questions
              </h2>
              <p className="mb-8 text-gray-500">
                Please answer the following questions to complete your
                application.
              </p>
              {loading ? (
                <div className="flex items-center justify-center py-10">
                  <Loader2 className="h-8 w-8 animate-spin text-secondary" />
                </div>
              ) : (
                <div className="space-y-6">
                  {questions.map((q) => (
                    <div key={q.question_id}>
                      <label
                        htmlFor={`question-${q.question_id}`}
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        {q.question_description}
                      </label>
                      <textarea
                        id={`question-${q.question_id}`}
                        rows={4}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-secondary focus:ring-secondary"
                        placeholder={q.question_text}
                        onChange={(e) =>
                          handleAnswerChange(q.question_id, e.target.value)
                        }
                      ></textarea>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-8 flex justify-end">
                <CustomButton
                  type="button"
                  variant="solid"
                  onClick={handleSubmitAnswers}
                  isDisabled={loading}
                  isLoading={loading}
                >
                  Submit Application
                </CustomButton>
              </div>
            </div>
          )}
        </div>
      </main>
    </MainLayout>
  );
}
