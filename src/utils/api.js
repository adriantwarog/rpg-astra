const getSkills = async () => {
    const response = await fetch(`/.netlify/functions/getSkills`);
    const skills = await response.json();
    return skills.length ? skills : [];
  };
  
  const createSkill = async (skill) => {
    const response = await fetch("/.netlify/functions/createSkill", {
      body: JSON.stringify(skill),
      method: "POST",
    });
    return response.json();
  };
  
  const updateSkill = async (skill) => {
    const response = await fetch("/.netlify/functions/updateSkill", {
      body: JSON.stringify(skill),
      method: "PUT",
    });
    return response.json();
  };
  
  const deleteSkill = async (id) => {
    const response = await fetch("/.netlify/functions/deleteSkill", {
      body: JSON.stringify({ id }),
      method: "POST",
    });
    return response.json();
  };
  
  export default {
    getSkills,
    createSkill,
    deleteSkill,
    updateSkill,
  };