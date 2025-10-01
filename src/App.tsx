import Banner from './components/Banner';
import CourseList from './components/CourseList'
import useJsonQuery from './utilities/fetch';

interface Schedule {
  title: string;
  courses: Record<string, {
    term: string;
    number: string;
    meets: string;
    title: string;
  }>;
}

/*
const App = () => (
  <div>
  <Banner title = { schedule.title }/>

  <br></br>

  <CourseList courses = { schedule.courses }/>
  </div>
);
*/

const App = () => {
  const [json, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');
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

    <CourseList courses = { schedule.courses }/>
    </div>
  )
};

export default App;