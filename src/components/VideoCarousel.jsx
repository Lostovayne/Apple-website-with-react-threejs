import { useEffect, useRef, useState } from "react";
import { hightlightsSlides } from "../constants";
import gsap from "gsap";

export const VideoCarousel = () => {
	const videoRef = useRef([]);
	const videoSpanRef = useRef([]);
	const videoDivRef = useRef([]);

	const [video, setVideo] = useState({
		isEnd: false,
		startPlay: false,
		videoId: 0,
		isLastVideo: false,
		isPlaying: false
	});

	const [loadedData, setLoadedData] = useState([]);

	const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video;

	useEffect(() => {
		if (loadedData.length > 3) {
			if (!isPlaying) {
				videoRef.current[videoId].pause();
			} else {
				startPlay && videoRef.current[videoId].play();
			}
		}
	}, [startPlay, videoId, isPlaying, loadedData]);

	useEffect(() => {
		const currentProgress = 0;
		let span = videoSpanRef.current;

		if (span[videoId]) {
			// animate the progress bar
			let anim = gsap.to(span[videoId], {
				onUpdate: () => {},
				onComplete: () => {}
			});
		}
	}, [videoId, startPlay]);

	return (
		<>
			<div className="flex items-center">
				{hightlightsSlides.map((list, i) => (
					<div className="sm:pr-20 pr-10" id="slider" key={list.id}>
						<div className="video-carousel_container">
							<div className="size-full flex-center rounded-3xl overflow-hidden bg-black">
								<video
									ref={(el) => (videoRef.current[i] = el)}
									id="video"
									playsInline
									preload="auto"
									muted
									className="object-cover size-full"
									onPlay={() => {
										setVideo((preVideo) => ({
											...preVideo,
											isPlaying: true
										}));
									}}>
									<source src={list.video} type="video/mp4" />
								</video>
							</div>

							<div className="absolute top-12 left-[5%] z-10 ">
								{list.textLists.map((text, index) => (
									<p key={index} className="text-white text-lg  md:text-2xl font-bold text-balance">
										{text}
									</p>
								))}
							</div>
						</div>
					</div>
				))}
			</div>

			<div className="relative flex-center mt-10">
				<div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur-sm rounded-full">
					{videoRef.current.map((_, i) => (
						<span
							key={i}
							ref={(el) => (videoDivRef.current[i] = el)}
							className="mx-2 size-3 bg-gray-200 rounded-full relative cursor-pointer">
							<span className="absolute size-full rounded-full" ref={(el) => (videoSpanRef.current[i] = el)} />
						</span>
					))}
				</div>
				<button></button>
			</div>
		</>
	);
};
