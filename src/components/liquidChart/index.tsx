import { Liquid } from "@ant-design/plots";

type Props = {
    progress: number
}

export const LiquidProgress = ({progress}: Props) => {
  const config = {
    percent: {progress},
    style: {
      outlineBorder: 15,
      outlineDistance: 8,
      waveLength: 228,
      width: 250,
      height: 250,
      // shape: () => `M56.455,25.784V0h-28.5v25.784c0,13.013,7.845,18.528,12.214,19.961v31.331c-3.32,0.193-5.768,0.854-5.768,1.636 c0,0.069,0.024,0.136,0.06,0.2c-3.607,0.546-5.973,1.453-5.973,2.479c0,1.668,6.217,3.02,13.887,3.02 c7.669,0,13.887-1.352,13.887-3.02c0-1.057-2.504-1.984-6.289-2.523c0.021-0.051,0.037-0.104,0.037-0.155 c0-0.757-2.283-1.397-5.43-1.614V45.627C49.002,44.029,56.455,38.467,56.455,25.784z M30.669,25.784V2.713H53.74v23.071 c0,14.139-10.098,17.644-11.535,17.644C40.768,43.428,30.669,39.923,30.669,25.784z`,//`M51.551,26.767v-9.974c0,0-4.936,2.545-9.262,0c-4.325-2.543-9.429,0-9.429,0v9.974c0,11.336,8.059,13.734,9.345,13.776 C43.49,40.501,51.551,38.102,51.551,26.767z`,
    },
    liquidStyle: {
      fill: "#FFC107", // Champagne color
      stroke: "#FFB300",
    },
  };  

  return <Liquid {...config} />
};


// export const LiquidProgress = ({progress}: Props) => {
//   const config = {
//     percent: {progress}, // This will control the liquid fill level
//     shape: () => `M287.303,172.216c-2.762-5.677-5.778-59.489-5.778-59.489c-0.532-14.933-0.57-30.222,0.107-41.779 c3.138-2.966,5.102-5.525,5.852-7.621c4.605-12.884,6.729-44.278-3.632-56.902c-2.246-2.741-7.221-6.385-24.398-6.385 c-1.31,0-5.197-0.04-7.092-0.04C236.3,0,231.5,3.265,229.107,6.113c-10.489,12.501-8.728,43.915-4.27,56.857 c0.728,2.109,2.664,4.692,5.77,7.693c0.55,11.639-0.137,42.064-0.137,42.064c-0.976,26.384-3.596,53.507-6.411,59.135 c-55.531,111.029-59.143,288.535-45.294,311.917c14.462,24.402,71.001,24.686,71.571,24.686c1.283,0,2.436-0.025,3.438-0.073 c1.299,0.075,2.854,0.119,4.62,0.119c2.292,0,56.315-0.271,70.653-23.877C343.164,461.417,341.573,283.889,287.303,172.216z M239.469,15.36c1.072-0.498,4.868-1.492,12.892-1.492c1.849,0,5.773,0.041,7.092,0.041c8.72,0,12.805,1.099,13.934,1.642 c5.111,7.009,4.457,30.98,1.183,42.689c-0.281,1.005-0.662,2.46-2.354,2.494c-6.606,0.129-32.072-0.179-32.072-0.179 c-2.162,0-2.447-1.19-2.713-2.213C234.354,46.497,234.288,22.306,239.469,15.36z M236.531,178.102 c4.353-8.701,7.595-65.375,7.595-65.375c0.616-13.982,0.777-27.806,0.485-38.279l22.973,0.129 c-0.409,10.436-0.406,24.208,0.046,38.15c0,0,2.868,56.827,7.13,65.587c5.218,10.737,9.92,22.131,14.149,33.958l-26.536,39.519 c-2.561-0.884-5.289-1.357-8.118-1.374c-1.69,0-3.342,0.172-4.939,0.499l-25.302-44.347 C227.837,196.694,232.001,187.159,236.531,178.102z M265.018,275.191c-0.031,5.9-4.859,10.701-10.757,10.701h-0.066 c-5.934-0.035-10.736-4.892-10.703-10.824c0.033-5.9,4.863-10.703,10.824-10.703c2.878,0.019,5.577,1.154,7.597,3.197 C263.934,269.605,265.037,272.314,265.018,275.191z M317.128,477.391c-7.193,11.843-38.677,17.172-58.733,17.172 c-1.604,0-2.994-0.041-4.122-0.113c-0.151-0.011-0.305-0.017-0.458-0.017c-0.126,0-0.252,0.004-0.378,0.012 c-0.88,0.048-1.922,0.072-3.1,0.072c-19.761,0-52.357-5.673-59.571-17.847c-8.966-15.138-8.293-147.934,27.024-252.864 l19.212,33.673c-4.562,4.459-7.418,10.659-7.458,17.51c-0.075,13.623,10.946,24.771,24.568,24.853c0.014,0,0.135,0,0.148,0l0,0 c13.542,0,24.626-11.021,24.707-24.563c0.033-5.642-1.814-10.998-5.244-15.367l20.769-30.926 C327.078,333.52,326.131,462.583,317.128,477.391z`,
//     width: 200,
//     height: 200,
//     color: '#1890FF', // You can adjust this to change the color of the liquid fill
//     // shape: 'path'
//   };

//   return <Liquid {...config} />;
// };




