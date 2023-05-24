import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = () => (
  <ContentLoader
    className="pizza_block"
    speed={2}
    width={280}
    height={470}
    viewBox="0 0 280 470"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="132" cy="125" r="124" />
    <rect x="4" y="262" rx="10" ry="10" width="272" height="26" />
    <rect x="2" y="305" rx="10" ry="10" width="277" height="83" />
    <rect x="12" y="410" rx="10" ry="10" width="100" height="32" />
    <rect x="140" y="401" rx="21" ry="21" width="130" height="44" />
  </ContentLoader>
);

export default Skeleton;
