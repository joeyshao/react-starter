import { createFileRoute } from '@tanstack/react-router'
import { useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/courses/$title/$meeting/edit')({
  component: EditCoursePage,
});

const submit = (evt: React.FormEvent) => {
  evt.preventDefault();
}

function EditCoursePage() {
  const navigate = useNavigate();
  const { title, meeting: meets } = Route.useParams();
  return (
    <div>
      <form onSubmit={submit}>
        <label className="block">
          <p className="text-lg font-bold">Course Title</p>
          <input type="text" name="title" defaultValue = { title } 
            className={`w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-80`}
          />
        </label>

        <label className="block">
          <p className="text-lg font-bold">Meeting Times</p>
          <input type="text" name="title" defaultValue = { meets } 
            className={`w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-80`}
          />
        </label>
      </form>

      <div className="flex gap-2 mt-4">
        <button
          type="button"
          onClick={() => navigate({ to: '/' })}
          className="px-4 py-2 rounded border border-gray-400 hover:bg-gray-100"
        >
          Cancel
        </button>
      </div>
    </div>


  );
}
