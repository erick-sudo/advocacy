import { useEffect, useRef, useState } from "react";
import { usePagination } from "../hooks/usePagination";
import { ScaleButton } from "./ScaleButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

export function Pagination({
  paginationConfig: {
    paginationEndpoint,
    populationEndpoint,
    itemsPerPage = 4,
    componentName,
    dataKey = "data"
  },
  generalProps = {},
  direction = "vertical",
  selfVScroll: { vScroll, vStyle, vClasses } = {
    vScroll: false,
    vStyle: {},
    vClasses: "",
  },
  childClassName,
}) {
  const [containerRef, scrollWrapperRef, scrollDownRef] = [
    useRef(),
    useRef(),
    useRef(),
  ];
  const PaginationChild = componentName;
  const [nextPage, setNextPage] = useState(1);
  const [refresher, setRefresher] = useState(0);
  const [items, setItems] = useState([]);
  const [handlePagination] = usePagination();
  const [pagePopulation, setPagePopulation] = useState(itemsPerPage);

  const handlePageFetch = (n, s) => {
    handlePagination({
      paginationEndpoint,
      populationEndpoint,
      pageNumber: n,
      pagePopulation: s,
      errorCallback: (error) => {},
      successCallback: (res) => {
        if (Array.isArray(res) && res.length > 0) {
          setItems([...items, ...res]);
          setNextPage(n + 1);
        }
      },
    });
  };

  const triggerRefresh = () => {
    setRefresher((p) => p + 1);
  };

  // Register an event listener on the closest scrollable element
  useEffect(() => {
    const endOfScrollDetector = (e) => {
      // const [scrollTop, clientHeight, scrollHeight] =
      //   direction === "vertical"
      //     ? [e.target.scrollTop, e.target.clientHeight, e.target.scrollHeight]
      //     : [e.target.scrollLeft, e.target.clientWidth, e.target.scrollWidth];
      // if (scrollTop + clientHeight >= scrollHeight) {
      //   triggerRefresh();
      // }
    };

    const windowResizeHandler = (e) => {
      const currentNumberOfChildren = containerRef.current.children.length;
      const childW = containerRef.current.firstElementChild?.offsetWidth;
    };

    const mouseOverHandler = (e) => {
      scrollDownRef.current.style.top = (((e.clientY - scrollWrapperRef.current.getBoundingClientRect().top)/scrollWrapperRef.current.offsetHeight)*90) + "%";
    };

    scrollWrapperRef.current.addEventListener("mousemove", mouseOverHandler);

    containerRef.current
      ?.closest(direction === "vertical" ? ".scroll_y" : ".scroll_x")
      ?.addEventListener("scroll", endOfScrollDetector);

    window.addEventListener("resize", windowResizeHandler);

    return () => {
      containerRef.current
        ?.closest(direction === "vertical" ? ".scroll_y" : ".scroll_x")
        ?.removeEventListener("scroll", endOfScrollDetector);
      window.removeEventListener("resize", windowResizeHandler);
    };
  }, []);

  // Automatically fetch the next page when the page count increases
  useEffect(() => {
    handlePageFetch(nextPage, pagePopulation);
    if (direction === "vertical") {
      containerRef.current.closest(".scroll_y")?.scrollBy({
        top: 300,
        behavior: "smooth",
      });
    } else {
      scrollWrapperRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    }
  }, [refresher]);

  return (
    <div className="relative">
      {items.length > 0 && direction !== "vertical" && (
        <ScaleButton
          onClick={() => {
            scrollWrapperRef.current.scrollBy({
              left: -200,
              behavior: "smooth",
            });
          }}
          className={`absolute z-40 top-[50%] left-1 bg-gray-100 hover:bg-yellow-600 hover:text-white`}
          text={<FontAwesomeIcon icon={faArrowLeft} />}
        />
      )}
      {items.length > 0 && direction !== "vertical" && (
        <ScaleButton
          onClick={() => {
            triggerRefresh();
            scrollWrapperRef.current.scrollBy({
              left: -200,
              behavior: "smooth",
            });
          }}
          className={`absolute z-40 top-[50%] right-1 bg-gray-100 hover:bg-yellow-600 hover:text-white`}
          text={<FontAwesomeIcon icon={faArrowRight} />}
        />
      )}
      {direction === "vertical" && (
        <div
          ref={scrollDownRef}
          className="scroll_down_button absolute z-40 duration-200 right-2"
        >
          <ScaleButton
            onClick={() => {
              triggerRefresh();
            }}
            className={`bg-gray-100 hover:bg-yellow-600 hover:text-white`}
            text={<FontAwesomeIcon icon={faArrowDown} />}
          />
        </div>
      )}
      <div
        style={direction === "vertical" ? (vScroll ? vStyle : {}) : {}}
        ref={scrollWrapperRef}
        className={`${
          direction === "vertical"
            ? vScroll
              ? vClasses + " scroll_y"
              : ""
            : "scroll_x"
        }`}
      >
        <div
          ref={containerRef}
          className={`${
            direction === "vertical"
              ? "flex flex-col flex-grow w-full"
              : "flex p-4"
          }`}
        >
          {items.map((componentData, index) => {
            const dt = {[dataKey]: componentData}
            return (
              <PaginationChild
                className={`z-10 ${childClassName}`}
                {...dt}
                {...generalProps}
                key={index}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
