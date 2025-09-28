interface Course {
  term: string;
  number: string;
  meets: string;
  title: string;
}

interface CourseListProps {
  courses: Record<string, Course>
}

/*
const CourseList = ({courses}: CourseListProps) => (
  <ul>
    {Object.entries(courses).map(([courseLabel, course]) => 
      (<li key = {courseLabel}> {course.term} CS {course.number}: {course.title} </li>))}
  </ul>
);
*/

const CourseList = ({courses}: CourseListProps) => (
  <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-4 px-4">
    {
      Object.entries(courses).map(([courseLabel, courseData]) => <CourseCard key = {courseLabel} course = {courseData}/>)
    }
  </div>
);

interface CourseCardProps {
  course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => (
  <div className="flex flex-col items-center h-54 w-54 p-4 border-2 border-gray-400 rounded-lg">
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