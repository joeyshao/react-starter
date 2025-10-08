import type { Course } from "../types/course";
import Modal from "./Modal";

interface CourseModalProps {
  courses: Course[];
  isOpen: boolean;
  onClose: () => void
}

const CourseModal = ({ courses, isOpen, onClose }: CourseModalProps) => (
  <Modal isOpen = { isOpen } onClose = { onClose }>
    <div> 
      <h1 className = "text-2xl font-bold mb-4"> Selected Courses </h1>
      { courses.length === 0 ? (
        <p> No courses selected. To select a course, click on any of the courses in Fall, Winter, or Spring. </p>
      ) : (
        <ul className = "list-none list-inside">
          {courses.map(( course ) => (
            <li key = { `${course.term}-${course.number}` } className = "mb-2" >
              <span className = "font-semibold"> { `${course.term} CS ${course.number}: ` } </span>
              <span> { course.title } </span>
              <br />
              <span className="text-sm text-gray-600">{course.meets}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  </Modal>
);

export default CourseModal;