 

const RadioGroups = ({ label, name, options, onChange, value }) => {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2 mt-[15px]">
          {label}
        </label>
      )}
      <div className="flex items-center gap-4">
        {options.map((option) => (
          <label key={option.value.toString()} className="flex items-center gap-2">
            <input
              type="radio"
              name={name}
              value={option.value}
              className="radio radio-success"
              checked={option.value ===  value}
              onChange={onChange}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioGroups;
