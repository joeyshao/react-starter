import type { Dispatch, SetStateAction } from "react"

interface TermSelectorProps {
  selected: string,
  setSelected: Dispatch<SetStateAction<string>>
}

const TermSelector = ({ selected, setSelected }: TermSelectorProps) => (
  <div className="flex justify-center gap-3 py-2">
    {['Fall', 'Winter', 'Spring'].map(option => (
      <div key={option}>
        <input type="radio" name={'term'} id={option} value={option}
          checked={option === selected}
          onChange={() => setSelected(option)}
        />
        <label className="ml-1 mr-1" htmlFor={option}>
          {option}
        </label>
      </div>
    ))
    }
  </div>
);

export default TermSelector;
