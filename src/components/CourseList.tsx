import type { Course } from "../types/course";

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
        setSelected = {() => toggleCourse(courseData)}/>)
    }
  </div> )
};

interface CourseCardProps {
  course: Course;
  selected: boolean;
  setSelected: ( course: Course ) => void;
}

const CourseCard = ({ course, selected, setSelected }: CourseCardProps) => (
  <div
  onClick={() => setSelected(course)}
  className={`flex flex-col h-56 w-56 p-4 rounded-lg border-2 cursor-pointer
              ${selected ? "border-blue-600 bg-blue-50" : "border-gray-300"}`}>
    <div className="font-black text-xl">
      { `${course.term} CS ${ course.number }` }
    </div>
    <div className="flex-grow">
      { course.title }
    </div>
    <hr className = "my-2 border-gray w-full" />
    <div>
      { course.meets }
    </div>
  </div>
);

export default CourseList;