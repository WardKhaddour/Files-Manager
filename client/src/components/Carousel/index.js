import Slider from 'react-slick';
import './styles.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Arrow = ({ left, onClick }) => {
  return (
    <svg
      onClick={onClick}
      className={`arrow ${left ? 'arrow--left' : 'arrow--right'}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!left && <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />}
    </svg>
  );
};
const getSlidesNum = ({ rowsNum, dataLength, elementsPerSlide }) =>
  Math.min(Math.ceil(dataLength / rowsNum), Math.ceil(elementsPerSlide));

const Carousel = ({ data, SlideComponent, rows = 1, elementsPerRow = 4 }) => {
  rows = Math.min(data.length, rows);

  const settings = {
    rows,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: getSlidesNum({
      dataLength: data.length,
      rowsNum: rows,
      elementsPerSlide: elementsPerRow,
    }),
    slidesToScroll: getSlidesNum({
      dataLength: data.length,
      rowsNum: rows,
      elementsPerSlide: elementsPerRow,
    }),
    prevArrow: <Arrow left />,
    nextArrow: <Arrow />,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: getSlidesNum({
            dataLength: data.length,
            rowsNum: rows,
            elementsPerSlide: elementsPerRow - 1,
          }),
          slidesToScroll: getSlidesNum({
            dataLength: data.length,
            rowsNum: rows,
            elementsPerSlide: elementsPerRow - 1,
          }),
          rows,
        },
      },
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: getSlidesNum({
            dataLength: data.length,
            rowsNum: rows,
            elementsPerSlide: elementsPerRow - 2,
          }),
          slidesToScroll: getSlidesNum({
            dataLength: data.length,
            rowsNum: rows,
            elementsPerSlide: elementsPerRow - 2,
          }),
          rows,
        },
      },
      {
        breakpoint: 720,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          rows,
          arrows: false,
        },
      },
    ],
  };
  return (
    <div className="container">
      <Slider {...settings}>
        {data.map(entity => (
          <div className="keen-slider__slide" key={entity.id}>
            <SlideComponent {...entity} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
