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
  
    deleteSkill = (id) => {
      api.deleteSkill(id).then((skill) => {
        api.getSkills().then((skills) => this.setState({ skills }));
      });
    };
  
    editSkill = (id, text, stat) => {
      api
        .updateSkill({
          id,
          text,
          stat,
        })
        .then((skill) => {
          api.getSkills().then((skills) => this.setState({ skills }));
        });
    };
  
    componentDidMount() {
      api.getSkills().then((skills) => {
        this.setState({ skills })});
    }
  
    actions = {
      addSkill: this.addSkill,
      deleteSkill: this.deleteSkill,
      editSkill: this.editSkill,
    };

    increaseStat = (index) => {
      let skills = this.state.skills
      skills[index].stat = skills[index].stat + 5
      this.setState({ skills })
    }

    currentPercent = () => {
      if(this.state.skills){
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
                        {/* Level {parseInt((this.state.skills.map(skill => skill.stat).reduce((next,cur) => next + cur) / 100) + 1)} */}
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
                    {/* {this.state.skills.map(skill => skill.stat).reduce((next,cur) => next + cur) * 10} */}
                  </div>
                  <div className="flex text-sm text-gray-400 flex-1 justify-end">
                    Next Level: 1000
                  </div>
                </div>
            </div>
            <div className="skills p-4">
              <div className="text-2xl font-medium">
                Skill Points: 
                {/* {this.state.skills.map(skill => skill.stat).reduce((next,cur) => next + cur)} */}
              </div>
            </div>
            <div className="border-b border-gray-600">

            </div>

            {this.state.skills.map((skill, index)=>
              <Skill 
                key={index} 
                index={index}
                onClick={this.increaseStat}
                title={skill.skill} 
                points={skill.stat} 
                color={skill.color} />
            )}

            <div className="border-b border-gray-600"></div>

            <div className="skills p-4">
              <div className="text-2xl text-gray-500">
                Unassigned Points: 0
              </div>
            </div>

            <div className="border-b border-gray-600"></div>

            <div className="skills p-4">
              <div className="text-2xl text-gray-500">
                Add Skill
              </div>
            </div>

            <form onSubmit={this.addSkill} className="p-4">
              <input type="text" name="skill" placeholder="skill" onChange={e => this.setState({ skill: e.target.value })} className="bg-gray-600 p-1 px-4 color-white border-none" />
              <input type="submit" className="bg-black text-white p-1 px-4" />
            </form>


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



export default App;
