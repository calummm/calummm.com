export const load = async ({ fetch /*, params*/ }) => {
  const response = await fetch(`/api/tags`);
  const tags = await response.json();

  return {
    tags,
  };
};
