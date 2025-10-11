import type { Course } from '../types/course';

const getDays = (course: Course): string[] => {
  const days = course.meets.match(/M|Tu|W|Th|F/g);
  return days ? days : [];
}

const toMinutes = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

const getTimes = (meets: string): [string, string] | null => {
  const times = meets.match(/(\d{1,2}:\d{2})-(\d{1,2}:\d{2})/);
  return times ? [times[1], times[2]] : null;
}

const getTimesMinutes = (meets: string): [number, number] | null => {
  const times = getTimes(meets);
  if (!times) return null;
  const [startStr, endStr] = times;
  return [toMinutes(startStr), toMinutes(endStr)];
};

const timeConflict = (course1: Course, course2: Course) => {
  const times1 = getTimesMinutes(course1.meets);
  const times2 = getTimesMinutes(course2.meets);
  if (!times1 || !times2) return false;

  const [s1, e1] = times1;
  const [s2, e2] = times2

  if (s1 < e2 && s2 < e1) {
    return true;
  }
  return false;
}

const dayConflict = (course1: Course, course2: Course) => {
  const days1 = getDays(course1);
  const days2 = getDays(course2);
  return days1.some(day => days2.includes(day));
}

const coursesConflict = (course1: Course, course2: Course) => {
  if (course1 === course2) return false;
  if (course1.term !== course2.term) return false;
  if (!dayConflict(course1, course2)) return false;
  if (!timeConflict(course1, course2)) return false;
  return true;
}

const anyConflict = (course: Course, selected: Course[]) => (
  selected.length === 0 ? false : selected.some(selectedCourse => coursesConflict(course, selectedCourse))
)


export default anyConflict;
