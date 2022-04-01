import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Slider, { Settings } from "react-slick";
import Image from "../../components/Image";
import "./index.scss";

type Props = {};

type ResponseImageType = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumail: string;
};

const apiUrl = "https://jsonplaceholder.typicode.com/";

const photosEndpoint = "photos";

const SliderExample = ({}: Props) => {
  const [imageData, setImageData] = useState<
    Array<ResponseImageType> | undefined
  >();
  const sliderSettings: Settings = {
    className: "center",
    dots: true,
    infinite: false,
    slidesToScroll: 1,
    slidesToShow: 3,
    // autoplay: true,
    // autoplaySpeed: 1000,
    // fade: true,
    // slidesPerRow: 2,
    afterChange: (currentSlide: number) => {
      console.log(`Current Slide After Change: `, currentSlide);
      setSlideIndex(currentSlide);
    },
  };

  const [slideIndex, setSlideIndex] = useState<number>(0);

  const sliderRef = useRef<Slider | null>(null);

  const handlePlay = useCallback(() => {
    sliderRef.current?.slickPlay();
  }, [sliderRef]);

  const handlePause = useCallback(() => {
    sliderRef.current?.slickPause();
  }, [sliderRef]);

  useEffect(() => {
    axios
      .get(apiUrl + photosEndpoint)
      .then((res) => {
        setImageData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="container">
      <div className="btn-wrapper">
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>End</button>
      </div>

      <div className="slick-btn">
        {imageData?.slice(0, 5).map((data, index) => {
          return (
            <button
              key={data.id}
              onClick={() => sliderRef.current?.slickGoTo(index)}
            >
              {index}
            </button>
          );
        })}
      </div>
      <div className="slick-to-go">
        <input
          type="range"
          min={0}
          max={5}
          value={slideIndex}
          onChange={(e) => {
            sliderRef.current?.slickGoTo(Number(e.target.value));
          }}
        />
      </div>

      <Slider ref={sliderRef} {...sliderSettings}>
        <div className="empty-slide"></div>

        {imageData &&
          imageData.slice(0, 5).map((img, index) => {
            console.log(slideIndex, index);
            if (slideIndex === index) {
              return (
                <Image className="acitve-slide" key={img.id} src={img.url} />
              );
            }
            return <Image key={img.id} src={img.url} />;
          })}
        <div className="empty-slide"></div>
      </Slider>
    </div>
  );
};

export default SliderExample;
