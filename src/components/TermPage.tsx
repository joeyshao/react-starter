import type { Course } from "../types/course";
import { useState } from "react";
import TermSelector from "./TermSelector";
import CourseList from "./CourseList";
import toggleList from "../utilities/ToggleList";
import Button from "./Button";
import CourseModal from "./CourseModal";
import anyConflict from "../utilities/conflicts";


interface TermPageProps {
  courses: Record<string, Course>;
}


const TermPage = ({ courses }: TermPageProps) => {
  const [term, setTerm] = useState('Fall');
  const termCourses = Object.fromEntries(Object.entries(courses).filter(([_, course]) => course.term === term))

  const [selected, setSelected] = useState<Course[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleCourse = (course: Course) => {
    (anyConflict(course, selected)) ? null : setSelected(toggleList(course, selected));
  }

  return (
    <div>
      <div className = "flex items-center justify-between px-4">
        <TermSelector term = { term } setTerm = { setTerm }/>
        <Button text = "Course Plan" onClick = { () => setModalOpen(true) }/>
      </div>
      <div>
        <CourseList courses = { termCourses } selected = { selected } toggleCourse = { toggleCourse }  />
      </div>
      <CourseModal courses = { selected } isOpen={ modalOpen } onClose={ () => setModalOpen(false) } />
    </div>
  )

}

export default TermPage;