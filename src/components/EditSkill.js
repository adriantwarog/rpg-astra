import { useState } from "react";

export default function EditSkill({
  title: passedTitle,
  color: passedColor,
  handleDelete,
  handleEdit,
  handleUpdate,
  index,
  setSkills,
}) {
  const [title, setTitle] = useState(passedTitle);
  const [color, setColor] = useState(passedColor)

  function updateSkillTitle(titleText) {
    setTitle(titleText);
    setSkills((prevSkills) => {
      const newSkills = prevSkills.map((skill, idx) => {
        return idx === index ? { ...skill, text: titleText } : skill;
      });

      return newSkills;
    });
  }

  function updateSkillColor(e) {
    setColor(e.target.value)
    handleEdit(e, index, "color")
  }

  return (
    <div className="p-4 skill items-center border-b border-gray-600 pb-2 mb-2">
      <div className="font-medium ">
        Title:{" "}
        <input
          type="text"
          placeholder="title"
          value={title}
          className="bg-gray-700 p-1 px-3 color-white border-none rounded-md"
          onChange={(e) => updateSkillTitle(e.target.value)}
        />
      </div>
      <div className="font-medium mt-2">
        Color:{" "}
        <select
          className="bg-gray-700 p-1 px-3 color-white border-none rounded-md"
          value={color}
          onChange={(e) => updateSkillColor(e)}
        >
          <option value="red">red</option>
          <option value="green">green</option>
          <option value="blue">blue</option>
        </select>
      </div>
      <div className="flex mt-2">
        <div
          className="p-2 bg-blue-600 select-none hover:bg-gray-500 rounded-md leading-none  cursor-pointer mr-2"
          onClick={() => handleUpdate(index)}
        >
          Update
        </div>
        <div
          className="p-2 bg-red-600 select-none hover:bg-gray-500 rounded-md leading-none  cursor-pointer"
          onClick={() => handleDelete(index)}
        >
          Delete
        </div>
      </div>
    </div>
  );
}
