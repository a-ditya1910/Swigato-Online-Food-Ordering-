
const BenefitCard = (props) => {
    return (
        <div className="p-6 rounded-2xl cursor-pointer group hover:bg-gradient-to-t from-[#f28b82] to-[#ec5008] transition-colors duration-300">
            {/* Icon */}
            <span className="text-[#a40404] group-hover:text-white transition-colors duration-300">
                {props?.icon}
            </span>
            {/* Title */}
            <h2 className="capitalize text-4xl font-extrabold text-center lg:text-left py-5 pr-10 text-[#a40404] group-hover:text-white transition-colors duration-300">
                {props?.title}
            </h2>
            {/* Description */}
            <p className="pb-5 text-lg text-[black] group-hover:text-white transition-colors duration-300">
                {props?.desc}
            </p>
        </div>
    );
};

export default BenefitCard;

