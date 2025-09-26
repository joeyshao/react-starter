interface Course {
  term: string;
  number: string;
  meets: string;
  title: string;
}

interface CourseListProps {
  courses: Record<string, Course>
}

const CourseList = ({courses}: CourseListProps) => (
  <ul>
    {Object.entries(courses).map(([courseLabel, course]) => 
      (<li key = {courseLabel}> {course.term} CS {course.number}: {course.title} </li>))}
  </ul>
);

export default CourseList;