import './App.css';
import React, { Component } from 'react'
import uuid from "node-uuid";
import api from "./utils/api";

class App extends Component {

  constructor(props){
      super(props);
      this.state = {
        skills: [],
        skill: "",
        color: "",
        menu: "home"
      }
    }

    addSkill = (e) => {
      e.preventDefault()
      
      api
        .createSkill({
          id: uuid.v1(),
          stat: 0,
          text: this.state.skill,
          color: 'blue',
        })
        .then((skill) => {
          api.getSkills().then((skills) => this.setState({ skills }));
          this.setState({ skill: "" })
        });
    };
  
    handleDelete = (index) => {
      api.deleteSkill(this.state.skills[index].id).then((skill) => {
        api.getSkills().then((skills) => this.setState({ skills }));
      });
    };

    handleEdit = (e, index, attr) => {
      let skills = this.state.skills
      skills[index][attr] = e.target.value
      console.log(skills)
      this.setState({ skills })
    };

    handleUpdate = (index) => {
      api
        .updateSkill({
        ...this.state.skills[index]
        })
        .then((skill) => {
          api.getSkills().then((skills) => this.setState({ skills }));
        });
    }
  
    componentDidMount() {
      api.getSkills().then((skills) => {
        console.log(`skills`,skills)
        this.setState({ skills })});
    }
  
    increaseStat = (index) => {
      let skills = this.state.skills
      skills[index].stat = skills[index].stat + 34
      // console.log(`skills[index]`,skills[index])
      api
        .updateSkill({
         ...skills[index]
        })
        .then((skill) => {
          api.getSkills().then((skills) => this.setState({ skills }));
        });
      this.setState({ skills })
    }

    currentPercent = () => {
      if(!this.state.skills.length){
        return 0
      }
      let totalSkills = this.state.skills.map(skill => skill.stat).reduce((next,cur) => next + cur)
      let currentLevel = parseInt((this.state.skills.map(skill => skill.stat).reduce((next,cur) => next + cur) / 100) + 1)
      console.log(totalSkills - ((currentLevel - 1) * 100)  )
      return ( totalSkills - ((currentLevel - 1) * 100) )
    }

  render() {
    return (
      <div className="App flex flex-col">
            <div className="flex p-4">
                <div
                    className="w-24 h-24 border-4 border-gray-500 rounded-full flex justify-center items-center text-5xl leading-none text-gray-500">
                    A
                </div>
                <div className="details flex flex-col justify-center ml-4">
                    <div className="name text-lg leading-none">
                        Adrian Twarog
                    </div>
                    <div className="level text-4xl font-bold leading-none">
                        Level {this.state.skills.length && parseInt((this.state.skills.map(skill => skill.stat).reduce((next,cur) => next + cur) / 100) + 1)} 
                    </div>
                    <div className="desc text-md font-medium mt-1 text-blue-400">
                        Full Stack Programmer
                    </div>
                </div>
            </div>
            <div className="exp p-4">
                <div className="bar border-2 border-gray-500 rounded-md h-4 flex w-full">
                <div className={`bg-white rounded-md transition-all duration-500`}
                    style={{
                      width: `${this.currentPercent()}%`
                    }}
                    >
                </div>
                </div>
                <div className="flex mt-1">
                  <div className="flex text-sm text-gray-400 flex-1">
                    Experience: 
                    {this.state.skills.length && this.state.skills.map(skill => skill.stat).reduce((next,cur) => next + cur) * 10}
                  </div>
                  <div className="flex text-sm text-gray-400 flex-1 justify-end">
                    Next Level: 1000
                  </div>
                </div>
            </div>
            {this.state.menu === "home" && <>
            <div className="skills p-4">
              <div className="text-2xl font-medium">
                Skill Points: 
                {this.state.skills.length && this.state.skills.map(skill => skill.stat).reduce((next,cur) => next + cur)}
              </div>
            </div>
            <div className="border-b border-gray-600">

            </div>

            {this.state.skills.map((skill, index)=>
              <Skill 
                key={index} 
                index={index}
                onClick={this.increaseStat}
                title={skill.text} 
                points={skill.stat} 
                color={skill.color} />
            )}

            {/* <div className="border-b border-gray-600"></div>

            <div className="skills p-4">
              <div className="text-2xl text-gray-500">
                Unassigned Points: 0
              </div>
            </div> */}

            <div className="border-b border-gray-600"></div>

            </>}

            {this.state.menu === "skills" && <>

            <div className="skills p-4">
              <div className="text-2xl">
                Add Skill
              </div>
            </div>

            <form onSubmit={this.addSkill} className="p-4">
              <input type="text" name="skill" placeholder="skill" onChange={e => this.setState({ skill: e.target.value })} className="bg-gray-600 p-1 px-4 color-white border-none" />
              <input type="submit" className="bg-black text-white p-1 px-4" />
            </form>

            

            {this.state.skills.map((skill, index)=>
              <EditSkill 
                key={index} 
                index={index}
                handleDelete={this.handleDelete}
                handleEdit={this.handleEdit}
                handleUpdate={this.handleUpdate}
                title={skill.text} 
                points={skill.stat} 
                color={skill.color} />
            )}

            </>}

            <div className="mt-24"></div>

            <div className={`border-t border-gray-600 flex fixed bottom-0 left-0 right-0 bg-gray-800 text-gray-400`}>
                <div className={`flex flex-1 border-r border-gray-600 p-2 flex-col justify-items-center items-center  ${this.state.menu === "home" ? "bg-black" : ""}  text-white hover:bg-gray-600 cursor-pointer`} onClick={()=>this.setState({ menu: "home"})}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span className="text-xs">Home</span>
                </div>
                <div className={`flex flex-1 border-r border-gray-600 p-2 flex-col justify-items-center items-center  ${this.state.menu === "skills" ? "bg-black" : ""}  text-white hover:bg-gray-600 cursor-pointer`}  onClick={()=>this.setState({ menu: "skills"})}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <span className="text-xs">Skills</span>
                </div>
                <div className="flex flex-1 border-r border-gray-600 p-2 flex-col justify-items-center items-center hover:bg-gray-600 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                  </svg>
                  <span className="text-xs">Profile</span>
                </div>
            </div>


        </div>
    )
  }
}




const Skill = ({ title, points, color, onClick, index }) => 
<div className="p-4 py-2 skill flex items-center">
              <div className="font-medium w-36">{title}</div>
              <div className="bar border-2 border-gray-500 rounded-md h-4 flex w-full">
                <div 
                  className={`bg-${color}-400 rounded-md transition-all duration-500`}
                  style={{
                      width: `${points*4}%`
                    }}
                  >
                </div>
                </div>
                <div className="p-2 font-medium leading-none ml-2">
                {points}
              </div>
              <div className="p-2 bg-gray-600 select-none hover:bg-gray-500 rounded-md leading-none ml-2 cursor-pointer" onClick={()=>onClick(index)}>
                +
              </div>
            </div>



const EditSkill = ({ title, points, color, handleDelete, handleEdit, handleUpdate, index }) => 
<div className="p-4 skill items-center border-b border-gray-600 pb-2 mb-2">
              <div className="font-medium ">
              Title: <input type="text" placeholder="title" value={title} className="bg-gray-700 p-1 px-3 color-white border-none rounded-md"  onChange={e => handleEdit(e, index, 'text')} />
              </div>
              <div className="font-medium mt-2">
                Color: <input type="text" placeholder="color" value={color} className="bg-gray-700 p-1 px-3 color-white border-none rounded-md " onChange={e => handleEdit(e, index, 'color')} />
              </div>
              <div className="flex mt-2">
              <div className="p-2 bg-blue-600 select-none hover:bg-gray-500 rounded-md leading-none  cursor-pointer mr-2" onClick={()=>handleUpdate(index)}>
                Update
              </div>
              <div className="p-2 bg-red-600 select-none hover:bg-gray-500 rounded-md leading-none  cursor-pointer" onClick={()=>handleDelete(index)}>
                Delete
                </div>
                </div>
            </div>



export default App;
