import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { VideoCarousel } from "@/components/VideoCarousel";
import { rightImg, watchImg } from "@/utils";

export const Highlights = () => {
	useGSAP(() => {
		gsap.to("#title", { opacity: 1, y: 0, duration: 1, ease: "power1.inOut" });
		gsap.to(".link", { opacity: 1, y: 0, duration: 1, ease: "power1.inOut", stagger: 0.25 });
	}, []);

	return (
		<section id="highlights" className="w-dvw overflow-hidden h-full common-padding bg-zinc">
			<div className="screen-max-width">
				<div className="mb-12 w-full md:flex items-end justify-between">
					<h1 id="title" className="section-heading">
						Get the highlights.
					</h1>
					<div className="flex flex-wrap items-end gap-5">
						<p className="link">
							Watch the film
							<img src={watchImg} alt="Watch Icon" width={15} height={15} className="ml-2" />
						</p>
						<p className="link">
							Watch the event
							<img src={rightImg} alt="Right Icon" width={10} height={10} className="ml-2" />
						</p>
					</div>
				</div>

				{/* Carousel videos */}
				<VideoCarousel />
			</div>
		</section>
	);
};
