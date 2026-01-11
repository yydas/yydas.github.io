import Spline from "@splinetool/react-spline";
import React, { Suspense } from "react";

const SplineViewer = ({ scene, className = "", onLoad, ...props }) => {
	return (
		<div className={`spline-container ${className}`}>
			<Suspense
				fallback={
					<div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 rounded-lg animate-pulse">
						<div className="text-center">
							<div className="w-8 h-8 mx-auto mb-2 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin" />
							<p className="text-sm text-neutral-600 dark:text-neutral-400">
								Loading 3D Scene...
							</p>
						</div>
					</div>
				}
			>
				<Spline scene={scene} onLoad={onLoad} {...props} />
			</Suspense>
		</div>
	);
};

export default SplineViewer;
