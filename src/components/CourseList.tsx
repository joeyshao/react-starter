import type { Course } from "../types/course";
import { useState } from "react";

interface CourseListProps {
  courses: Record<string, Course>
}

const toggleList = <T,>(x: T, lst: T[]): T[] => (
  lst.includes(x) ? lst.filter(y => y !== x) : [...lst, x]
);

const CourseList = ({courses}: CourseListProps) => {
  const [selected, setSelected] = useState<Course[]>([]);

  const toggleCourse = (item: Course) => {
    setSelected(selected => toggleList(item, selected));
  }

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
  className={`flex flex-col h-54 w-54 p-4 rounded-lg border-2 cursor-pointer
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