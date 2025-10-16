import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { courseResolver, type Course } from '../types/course';
import Button from '../components/Button';
import FormField from '../components/FormField';

export const Route = createFileRoute('/courses/$title/$meeting/$term/$number/edit')({
  component: EditCoursePage,
});

function EditCoursePage() {
  const navigate = useNavigate();
  const { title, meeting, term, number } = Route.useParams();

  const { register, handleSubmit, formState: { errors } } = useForm<Course>({
    resolver: courseResolver,
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: { title, meets: meeting, term, number },
  });

  return (
    <div className="p-4 max-w-lg mx-auto">
      <form onSubmit={handleSubmit(() => {})} noValidate>
        <FormField name="title" label="Course Title" register={register} errors={errors} />
        <FormField name="meets" label="Meeting Times" register={register} errors={errors} />
        <FormField name="term" label="Term" register={register} errors={errors} />
        <FormField name="number" label="Number" register={register} errors={errors} />
        <button type="submit" className="invisible h-0 w-0 p-0 m-0">Hidden Submit</button>
      </form>

      <Button text="Cancel" onClick={() => navigate({ to: '/' })} />
    </div>
  );
}

export default EditCoursePage;