import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { courseResolver, type Course } from '../types/course';
import Button from '../components/Button';
import FormField from '../components/FormField';
import { editCourse } from '../utilities/firebase';

export const Route = createFileRoute('/courses/$id/$title/$meeting/$term/$number/edit')
({
  component: EditCoursePage,
});

function EditCoursePage() {
  const navigate = useNavigate();
  const { id, title, meeting, term, number } = Route.useParams();
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Course>({
    resolver: courseResolver,
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: { title, meets: meeting, term, number },
  });

   const onSubmit = async (values: Course) => {
    const payload = {
      title: values.title.trim(),
      meets: values.meets.trim(),
      term: values.term.trim(),
      number: values.number.trim(),
    };

    try {
      await editCourse(id, payload);
      navigate({ to: '/' }); 
    } catch (err: any) {
      alert(`Failed to save changes: ${err?.message ?? err}`);
    }
  };

    return (
    <div className="p-4 max-w-lg mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormField name="title" label="Course Title" register={register} errors={errors} />
        <FormField name="meets" label="Meeting Times" register={register} errors={errors} />
        <FormField name="term" label="Term" register={register} errors={errors} />
        <FormField name="number" label="Number" register={register} errors={errors} />

        <div className="mt-4 flex gap-2">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
    focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 
    dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800
    disabled:opacity-60"
            disabled={ isSubmitting }
          >
             { isSubmitting ? 'Saving…' : 'Save changes' }
          </button>
          <Button text="Cancel" onClick={() => navigate({ to: '/' })} />
        </div>
      </form>
    </div>
  );
}

export default EditCoursePage;