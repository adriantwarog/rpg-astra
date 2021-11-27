const { getCollection } = require("./utils/astraClient");

exports.handler = async (event, context) => {
  const skills = await getCollection();
  try {
    const res = await skills.find({});
    const formattedSkills = Object.keys(res.data).map((item) => res.data[item]);
    return {
      statusCode: 200,
      body: JSON.stringify(formattedSkills),
    };
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify(e),
    };
  }
};