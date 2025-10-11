import type { Course } from "../types/course";
import anyConflict from "../utilities/conflicts";

interface CourseListProps {
  courses: Record<string, Course>
  selected: Course[];
  toggleCourse: ( course: Course ) => void;
}

const CourseList = ({ courses, selected, toggleCourse }: CourseListProps) => {
  return (
  <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-4 px-4">
    {
      Object.entries(courses).map(([courseLabel, courseData]) =>
      <CourseCard key = {courseLabel} course = {courseData} selected = { selected.includes(courseData) }
        setSelected = {() => toggleCourse(courseData)} conflict = { anyConflict(courseData, selected) }/>)
    }
  </div> )
};

interface CourseCardProps {
  course: Course;
  selected: boolean;
  setSelected: ( course: Course ) => void;
  conflict: boolean;
}

const CourseCard = ({ course, selected, setSelected, conflict }: CourseCardProps) => (
  <div
    onClick={() => setSelected(course)}
    className={`flex flex-col h-56 w-56 p-4 rounded-lg border-2 cursor-pointer
  ${conflict ? "border-red-600 bg-red-50 cursor-not-allowed hover:scale-100" : ""}
              ${selected ? "border-blue-600 bg-blue-50" : "border-gray-300"}`}>
                
    <div className="font-black text-xl">
      {`${course.term} CS ${course.number}`}
    </div>
    <div className="flex-grow">
      {course.title}
    </div>
    <hr className="my-2 border-gray w-full" />
    <div>
      {course.meets}
    </div>
  </div>
);

export default CourseList;