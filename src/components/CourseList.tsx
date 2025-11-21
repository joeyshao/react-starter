import type { Course } from "../types/course";
import anyConflict from "../utilities/conflicts";
import { Link } from '@tanstack/react-router';
import { useIsAdmin } from "../utilities/useIsAdmin";


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
      <CourseCard key = {courseLabel} id = {courseLabel} course = {courseData} selected = { selected.includes(courseData) }
        setSelected = {() => toggleCourse(courseData)} conflict = { anyConflict(courseData, selected) }/>)
    }
  </div> )
};

interface CourseCardProps {
  id: string;
  course: Course;
  selected: boolean;
  setSelected: ( course: Course ) => void;
  conflict: boolean;
}

const CourseCard = ({ id, course, selected, setSelected, conflict }: CourseCardProps) => {
  const { isAdmin, loading } = useIsAdmin();

  return (
  <div
    onClick={() => setSelected(course)}
    className={`relative flex flex-col h-56 w-56 p-4 rounded-lg border-2 cursor-pointer
  ${conflict ? "border-red-600 bg-red-50 cursor-not-allowed hover:scale-100" : ""}
              ${selected ? "border-blue-600 bg-blue-50" : "border-gray-300"}`}>

    <div className="font-black text-xl" data-cy="course">
      {`${course.term} CS ${course.number}`}
    </div>
          
      {!loading && isAdmin && (
        <Link
          to="/courses/$id/$title/$meeting/$term/$number/edit"
          params={{
            id: id,
            title: course.title,
            meeting: course.meets,
            term: course.term,
            number: course.number,
          }}
          className="absolute top-2 right-2 text-sm text-blue-600 underline ml-3"
          onClick={(e) => e.stopPropagation()}
        >
          Edit
        </Link>
      )}
    <div className="flex-grow">
      {course.title}
    </div>
    <hr className="my-2 border-gray w-full" />
    <div>
      {course.meets}
    </div>
  </div>
  );
};

export default CourseList;