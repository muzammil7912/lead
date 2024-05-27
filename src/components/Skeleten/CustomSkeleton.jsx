import React from 'react';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function CustomSkeleton(item) {
  return (
    <Skeleton count={item} />
  )
}

export default CustomSkeleton