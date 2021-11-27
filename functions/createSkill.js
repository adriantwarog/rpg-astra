const { getCollection } = require("./utils/astraClient");

exports.handler = async (event, context) => {
  const skills = await getCollection();
  const body = JSON.parse(event.body);

  try {
    const res = await skills.create(body.id, body);
    return {
      statusCode: 200,
      body: JSON.stringify(res),
    };
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify(e),
    };
  }
};