import { createFileRoute } from '@tanstack/react-router'
import Banner from '../components/Banner';
//import useJsonQuery from '../utilities/fetch';
import TermPage from '../components/TermPage';
import type { Course } from "../types/course";
import { useDataQuery } from '../utilities/firebase';

export const Route = createFileRoute('/')({
  component: () => {
    const [courses, loadingCourses, errorCourses] = useDataQuery('/courses');
    const [title, loadingTitle, errorTitle] = useDataQuery('/title');

    if (loadingCourses || loadingTitle) return <h1>Loading course data...</h1>;
    if (errorCourses || errorTitle)
      return <h1>Error loading data: {String(errorCourses || errorTitle)}</h1>;
    if (!courses) return <h1>No course data found...</h1>;

    const schedule = {
      title: title ?? 'Courses',
      courses: courses as Record<string, Course>,
    };

    return (
      <div>
        <Banner title={title as string} />
        <br />
        <TermPage courses={schedule.courses} />
      </div>
    );
  },
});