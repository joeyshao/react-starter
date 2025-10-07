import type { Course } from "../types/course";
import { useState } from "react";
import TermSelector from "./TermSelector";
import CourseList from "./CourseList";


interface TermPageProps {
  courses: Record<string, Course>;
}


const TermPage = ({ courses }: TermPageProps) => {
  const [selected, setSelected] = useState('Fall');
  const termCourses = Object.fromEntries(Object.entries(courses).filter(([_, course]) => course.term === selected))

  return (
    <div>
      <TermSelector selected = { selected } setSelected={setSelected}/>
      <CourseList courses = { termCourses }  />
    </div>
  )

}

export default TermPage;