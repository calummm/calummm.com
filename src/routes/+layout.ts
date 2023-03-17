export const load = ({ url: url }) => {
  const currentRoute = url.pathname;

  return {
    currentRoute,
  };
};
