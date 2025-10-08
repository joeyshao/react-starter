import type { Course } from "../types/course";
import { useState } from "react";
import TermSelector from "./TermSelector";
import CourseList from "./CourseList";
import toggleList from "../utilities/ToggleList";
import Button from "./Button";
import CourseModal from "./CourseModal";


interface TermPageProps {
  courses: Record<string, Course>;
}


const TermPage = ({ courses }: TermPageProps) => {
  const [term, setTerm] = useState('Fall');
  const termCourses = Object.fromEntries(Object.entries(courses).filter(([_, course]) => course.term === term))

  const [selected, setSelected] = useState<Course[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleCourse = (item: Course) => {
    setSelected(selectedCourses => toggleList(item, selectedCourses));
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