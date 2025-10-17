import { createFileRoute } from '@tanstack/react-router'
import Banner from '../components/Banner';
//import useJsonQuery from '../utilities/fetch';
import TermPage from '../components/TermPage';
import type { Course } from "../types/course";
import { useDataQuery } from '../utilities/firebase';

interface Schedule {
  title: string;
  courses: Record<string, Course>;
}

export const Route = createFileRoute('/')({
  component: () => {
    const [json, isLoading, error] = useDataQuery('/');
  if (error) {
    return <h1>Error loading user data: {'${error}'}</h1>
  }
  if (isLoading) {
    return <h1> Loading course data... </h1>
  }  
  if (!json) {
    return <h1> No course data found... </h1>
  }

  const schedule = json as Schedule;

  return (
    <div>
    <Banner title = { schedule.title }/>

    <br></br>

    <TermPage courses = { schedule.courses }/>
    </div>
  )
}
})