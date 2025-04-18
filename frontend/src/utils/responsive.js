export const createResponsiveConfig = (overrides = {}) => {
  console.log(overrides);
  
  return {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: overrides.superLargeDesktop ?? 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: overrides.desktop ?? 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: overrides.tablet ?? 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: overrides.mobile ?? 1,
    },
  };
};
