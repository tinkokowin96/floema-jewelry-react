//@ts-nocheck

const Button = () => (
  <svg
    className="collection__btn"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 60.96 19.25">
    <defs>
      <style>
        {` .hover-path {
            fill: none;
            stroke: rgba(255, 255, 255, 1);
            stroke-width: 0.5px;
            stroke-dasharray: 200;
            stroke-dashoffset: 200;
            transition: 0.4s linear;
          }
          .btn-path {
            fill: none;
            stroke: rgba(255, 255, 255, 0.3);
            stroke-width: 0.5px;
          }
          .button-text {
            font: 25% Dosis;
            fill: white;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            transform-origin: center;
            transition: 0.4s linear;
          }`}
      </style>
    </defs>

    <path
      transform="translate(0, 2)"
      className="hover-path"
      d="M30,.13A73.68,73.68,0,0,1,48.13,2.42C53,3.65,60.88,5.65,60.83,8c0,2.22-7,3.77-12.7,5.06a83.53,83.53,0,0,1-18.12,2A80.81,80.81,0,0,1,12.13,13c-5.55-1.3-12-2.79-12-5-.07-2.42,7.65-4.47,12-5.62A69,69,0,0,1,30,.13Z"
    />

    <path
      transform="translate(0, 2)"
      className="btn-path"
      d="M30,.13A73.68,73.68,0,0,1,48.13,2.42C53,3.65,60.88,5.65,60.83,8c0,2.22-7,3.77-12.7,5.06a83.53,83.53,0,0,1-18.12,2A80.81,80.81,0,0,1,12.13,13c-5.55-1.3-12-2.79-12-5-.07-2.42,7.65-4.47,12-5.62A69,69,0,0,1,30,.13Z"
    />

    <text
      x="50%"
      y="54%"
      className="button-text"
      dominantBaseline="middle"
      textAnchor="middle">
      Discover Collections
    </text>
  </svg>
)

export default Button
