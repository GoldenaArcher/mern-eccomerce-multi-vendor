import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { cn } from "@mern/utils";

const PageBanner = ({
  title,
  backgroundImage = "http://localhost:5000/uploads/toy_flash_sale_banner_compressed.jpg",
  breadcrumbs = [],
  height = "h-[220px]",
}) => {
  return (
    <section
      className={cn("mt-6 bg-cover bg-no-repeat relative bg-left", height)}
      style={{
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : undefined,
      }}
    >
      <div className="absolute left-0 top-0 size-full bg-[#2422228a]">
        <div className="w-[85%] sm:w-[90%] md:w-[90%] lg:w-[85%] h-full mx-auto">
          <div className="flex flex-col justify-center gap-1 items-center size-full text-white">
            <h2 className="text-3xl font-bold">{title}</h2>
            {breadcrumbs.length > 0 && (
              <div className="flex justify-center items-center gap-2 text-2xl w-full">
                {breadcrumbs.map((item, idx) => (
                  <React.Fragment key={idx}>
                    {item.href ? (
                      <Link
                        to={item.href}
                        className="hover:underline hover:text-[#ccc]"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span className="text-[#ddd]">{item.label}</span>
                    )}

                    {idx < breadcrumbs.length - 1 && (
                      <span className="pt-1">
                        <IoIosArrowForward />
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageBanner;
