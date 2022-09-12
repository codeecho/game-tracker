//js
module.exports = () => {
    const rewrites = () => {
      return [
        {
          source: "/games",
          destination: "https://api.igdb.com/v4/games",
        },
      ];
    };
    return {
      rewrites,
    };
  };