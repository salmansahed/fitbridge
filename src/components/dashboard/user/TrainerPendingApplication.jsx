import { Card, Chip } from "@heroui/react";
import {
  HiOutlineBriefcase,
  HiOutlineDocumentText,
  HiOutlineClock,
} from "react-icons/hi";

const TrainerPendingApplication = ({ applicationData }) => {
  if (!applicationData) return null;

  const { status, specialty, bio, yearsOfExperience } = applicationData;

  return (
    <Card className="max-w-xl p-8 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-700 rounded-3xl shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-start gap-4 mb-8">
        <div className="min-w-0">
          {" "}
          <div className="flex items-center gap-2 text-neutral-500 mb-2">
            <HiOutlineBriefcase className="text-xl" />
            <span className="text-xs font-bold uppercase tracking-widest">
              Application
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-black dark:text-white capitalize whitespace-nowrap">
            {specialty} Trainer
          </h1>
        </div>

        <Chip
          color="danger"
          variant="soft"
          className="font-bold uppercase tracking-widest text-[10px] px-3 shrink-0 dark:border dark:border-neutral-800"
        >
          {status}
        </Chip>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {/* Experience */}
        <div className="flex items-center gap-4 bg-neutral-100 dark:bg-neutral-800 p-4 rounded-2xl">
          <div className="p-3 bg-white dark:bg-black rounded-xl">
            <HiOutlineClock className="text-2xl text-black dark:text-white" />
          </div>
          <div>
            <h4 className="text-[10px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">
              Experience
            </h4>
            <p className="text-lg font-bold text-black dark:text-white">
              {yearsOfExperience} Years of Mastery
            </p>
          </div>
        </div>

        {/* Bio */}
        <div>
          <div className="flex items-center gap-2 text-neutral-500 mb-3">
            <HiOutlineDocumentText className="text-xl" />
            <h4 className="text-[10px] font-bold uppercase tracking-widest">
              Professional Bio
            </h4>
          </div>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-sm italic pl-4 border-l-2 border-neutral-300 dark:border-neutral-700">
            &quot;{bio}&quot;
          </p>
        </div>
      </div>
    </Card>
  );
};

export default TrainerPendingApplication;
