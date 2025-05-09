interface InfoCardProps {
  data: {
    ip: string;
    location: {
      city: string;
      region: string;
      postalCode: string;
      timezone: string;
    };
    isp: string;
  };
}

const InfoCard = ({ data }: InfoCardProps) => {
  return (
    <div>
      <div className=" bg-white rounded-lg  p-4 md:p-8 text-center md:text-left md:flex drop-shadow gap-10">
        {/* IP Address */}
        <div className=" grid gap-2">
          <p className=" text-[var(--Dark-gray)] font-bold text-[12px] tracking-widest">
            IP ADDRESS
          </p>
          <h1 className=" text-[var(--Ver-Dark-gray)] font-bold text-[20px] t">
            {data.ip}
          </h1>
        </div>
        <div className=" w-[2px] bg-gray-200 md:h-24 lg:h-12 hidden md:block"></div>
        {/* LOCATION */}
        <div className=" grid gap-2">
          <p className=" text-[var(--Dark-gray)] font-bold text-[12px] tracking-widest">
            LOCATION
          </p>
          <h1 className=" text-[var(--Ver-Dark-gray)] font-bold text-[20px] ">
            {`${data.location.city}, ${data.location.region} ${data.location.postalCode}`}
          </h1>
        </div>
        <div className=" w-[2px] bg-gray-200 md:h-24 lg:h-12 hidden md:block"></div>
        {/* TIME ZONE */}
        <div className=" grid gap-2">
          <p className=" text-[var(--Dark-gray)] font-bold text-[12px] tracking-widest">
            TIMEZONE
          </p>
          <h1 className=" text-[var(--Ver-Dark-gray)] font-bold text-[20px] ">
            UTC{data.location.timezone}
          </h1>
        </div>
        <div className=" w-[2px] bg-gray-200 md:h-24 lg:h-12 hidden md:block"></div>
        {/* ISP */}
        <div className=" grid gap-2">
          <p className=" text-[var(--Dark-gray)] font-bold text-[12px] tracking-widest">
            ISP
          </p>
          <h1 className=" text-[var(--Ver-Dark-gray)] font-bold text-[20px] ">
            {data.isp}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
