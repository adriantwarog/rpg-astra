import "./App.css";
import React, { useEffect, useState } from "react";
import uuid from "node-uuid";
import api from "./utils/api";
import Skill from "./components/Skill";
import EditSkill from "./components/EditSkill";

export default function App() {
  const [skills, setSkills] = useState([]);
  const [skill, setSkill] = useState("");
  const [menu, setMenu] = useState("home");

  const addSkill = (e) => {
    e.preventDefault();

    if (skill < 1) return
    console.log('blocked code')
    api
      .createSkill({
        id: uuid.v1(),
        stat: 0,
        text: skill,
        color: "blue",
      })
      .then(() => {
        api.getSkills().then((fetchedSkills) => setSkills(fetchedSkills));
        setSkill("");
      });
  };

  const handleDelete = (index) => {
    api.deleteSkill(skills[index].id).then(() => {
      api.getSkills().then((fetchedSkills) => setSkills(fetchedSkills));
    });
  };

  const handleEdit = (e, index, attr) => {
    let newSkills = skills;
    newSkills[index][attr] = e.target.value;
    console.log(newSkills);
    setSkills(newSkills);
  };

  const handleUpdate = (index) => {
    api
      .updateSkill({
        ...skills[index],
      })
      .then(() => {
        api.getSkills().then((updatedSkills) => setSkills(updatedSkills));
      });
  };

  useEffect(() => {
    api.getSkills().then((fetchedSkills) => {
      console.log(`fetchedSkills`, fetchedSkills);
      setSkills(fetchedSkills);
    });
  }, []);

  const increaseStat = (index) => {
    let newSkills = skills;
    newSkills[index].stat = newSkills[index].stat + 1;
    // console.log(`skills[index]`,skills[index])
    api
      .updateSkill({
        ...newSkills[index],
      })
      .then(() => {
        api.getSkills().then((updatedSkills) => setSkills(updatedSkills));
      });
    setSkills(newSkills);
  };

  const currentPercent = () => {
    if (!skills.length) {
      return 0;
    }
    let totalSkills = skills
      .map((skill) => skill.stat)
      .reduce((next, cur) => next + cur);
    let currentLevel = parseInt(
      skills.map((skill) => skill.stat).reduce((next, cur) => next + cur) /
        100 +
        1
    );
    console.log(totalSkills - (currentLevel - 1) * 100);
    return totalSkills - (currentLevel - 1) * 100;
  };

  return (
    <div className="App flex flex-col">
      <div className="flex p-4">
        <div className="w-24 h-24 border-4 border-gray-500 rounded-full flex justify-center items-center text-5xl leading-none text-gray-500">
          A
        </div>
        <div className="details flex flex-col justify-center ml-4">
          <div className="name text-lg leading-none">Adrian Twarog</div>
          <div className="level text-4xl font-bold leading-none">
            Level{" "}
            {skills.length &&
              parseInt(
                skills
                  .map((skill) => skill.stat)
                  .reduce((next, cur) => next + cur) /
                  100 +
                  1
              )}
          </div>
          <div className="desc text-md font-medium mt-1 text-blue-400">
            Full Stack Programmer
          </div>
        </div>
      </div>
      <div className="exp p-4">
        <div className="bar border-2 border-gray-500 rounded-md h-4 flex w-full">
          <div
            className={`bg-white rounded-md transition-all duration-500`}
            style={{
              width: `${currentPercent()}%`,
            }}
          ></div>
        </div>
        <div className="flex mt-1">
          <div className="flex text-sm text-gray-400 flex-1">
            Experience:
            {skills.length &&
              skills
                .map((skill) => skill.stat)
                .reduce((next, cur) => next + cur) * 10}
          </div>
          <div className="flex text-sm text-gray-400 flex-1 justify-end">
            Next Level: 1000
          </div>
        </div>
      </div>
      {menu === "home" && (
        <>
          <div className="skills p-4">
            <div className="text-2xl font-medium">
              Skill Points:
              {skills.length &&
                skills
                  .map((skill) => skill.stat)
                  .reduce((next, cur) => next + cur)}
            </div>
          </div>
          <div className="border-b border-gray-600"></div>

          {skills.map((skill, index) => (
            <Skill
              key={Math.random()}
              index={index}
              onClick={increaseStat}
              title={skill.text}
              points={skill.stat}
              color={skill.color}
            />
          ))}

          {/* Add Unassigned Points here */}

          <div className="border-b border-gray-600"></div>
        </>
      )}

      {menu === "skills" && (
        <>
          <div className="skills p-4">
            <div className="text-2xl">Add Skill</div>
          </div>

          <form onSubmit={addSkill} className="p-4">
            <input
              type="text"
              name="skill"
              placeholder="skill"
              onChange={(e) => setSkill(e.target.value)}
              className="bg-gray-600 p-1 px-4 color-white border-none"
            />
            <input type="submit" className="bg-black text-white p-1 px-4" />
          </form>

          {skills.map((skillData, index) => (
            <EditSkill
              key={Math.random()}
              index={index}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              handleUpdate={handleUpdate}
              title={skillData.text}
              points={skillData.stat}
              color={skillData.color}
              setSkills={setSkills}
            />
          ))}
        </>
      )}

      <div className="mt-24"></div>

      <div
        className={`border-t border-gray-600 flex fixed bottom-0 left-0 right-0 bg-gray-800 text-gray-400`}
      >
        <div
          className={`flex flex-1 border-r border-gray-600 p-2 flex-col justify-items-center items-center  ${
            menu === "home" ? "bg-black" : ""
          }  text-white hover:bg-gray-600 cursor-pointer`}
          onClick={() => setMenu("home")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          <span className="text-xs">Home</span>
        </div>
        <div
          className={`flex flex-1 border-r border-gray-600 p-2 flex-col justify-items-center items-center  ${
            menu === "skills" ? "bg-black" : ""
          }  text-white hover:bg-gray-600 cursor-pointer`}
          onClick={() => setMenu("skills")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
          <span className="text-xs">Skills</span>
        </div>
        <div className="flex flex-1 border-r border-gray-600 p-2 flex-col justify-items-center items-center hover:bg-gray-600 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
            />
          </svg>
          <span className="text-xs">Profile</span>
        </div>
      </div>
    </div>
  );
}
