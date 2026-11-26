import PodiumNew from "@/components/resultsPage/podiumSection/PodiumNew";
import RaceResults from "@/components/resultsPage/raceResults/RaceResults";
export default function ResultPage() {
  return (
    <div className="flex justify-center min-w-0 px-3 py-4 gap-10 sm:px-4 sm:py-6 md:py-8 lg:px-4 lg:py-12">
      <div className="w-full min-w-0 max-w-7xl">
        <RaceResults showPodium />
      </div>
      {/* <div>
        <PodiumNew />
      </div> */}
    </div>
  );
}
