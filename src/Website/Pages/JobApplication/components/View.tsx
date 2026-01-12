import React from "react";
interface Job {
  id: number;
  title: string;
  ar_title: string;
  en_title: string;
  content: string;
  type: string;
  salary: string;
  image: string;
  link: string;
  status: string;
  created_at: string;
  applicants: number;
  employee: string | null;
  location: string | null;
}

interface JobApplicationOverviewProps {
  setActiveTab: (tab: string) => void;
  job: Job;
}

const JobApplicationOverview = ({
  setActiveTab,
  job
}: JobApplicationOverviewProps) => {
  // Format salary with currency if needed
  const formattedSalary = job?.salary ? `$${job?.salary}` : "Not specified";

  // Format applicants count
  const formattedApplicants = `${job?.applicants} ${
    job?.applicants === 1 ? "applicant" : "applicants"
  }`;

  return (
    <div className="max-w-full md:max-w-[656px] w-full md:w-[80%] mx-auto bg-white border border-[#eaecf0] rounded-[12px] p-[32px] shadow-[0_0_0_0_transparent]">
      <section className="mb-8 space-y-4">
        
        <h1 className="text-[16px]  md:text-[24px] font-bold text-darkColor">
          {job?.title}
        </h1>

        <div className="main-data">
          <p
            className="text-grayColor text-[15px] font-bold whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: job?.content }}
          ></p>
        </div>

       
      </section>

      <div className="text-center mt-10">
        <button
          className="btn-main w-full mx-auto text-white px-8 py-2 rounded-md  transition-colors "
          onClick={() => setActiveTab("application")}
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobApplicationOverview;
