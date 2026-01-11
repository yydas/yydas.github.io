import { useEffect, useRef } from "react";
import mermaid from "mermaid";

interface MermaidProps {
	chart: string;
}

export default function Mermaid({ chart }: MermaidProps) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		mermaid.initialize({
			startOnLoad: true,
			theme: "dark",
			securityLevel: "loose",
		});

		if (ref.current) {
			mermaid.contentLoaded();
		}
	}, [chart]);

	return (
		<div className="mermaid my-6 flex justify-center" ref={ref}>
			{chart}
		</div>
	);
}
