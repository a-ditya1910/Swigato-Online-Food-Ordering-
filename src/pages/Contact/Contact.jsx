import BenefitCard from "./BenefitCard"
import PageHeader from "./PageHeader"
import WhereToVoteOutlinedIcon from '@mui/icons-material/WhereToVoteOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import QueryBuilderOutlinedIcon from '@mui/icons-material/QueryBuilderOutlined';
import foodDelivery from "../../assets/food-delivery.png"

const Contact = () => {
    return(
        <>
        <PageHeader title="Contact us"/>
        <div className="mx-auto w-full max-w-screen-xl px-4">
            <div className="flex flex-col lg:flex-row my-20 pt-8 lg:px-8 pb-8 lg:gap-16 items-center">
            <div className="shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] rounded-2xl sm:w-full lg:w-3/5 mx-auto p-8">
                <h1 className="text-center text-5xl font-extrabold pb-6">Get in touch with us</h1>
                <form action="" className="flex flex-col gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="name" className="mb-2">Name</label>
                        <input className="p-3 border rounded" type="text" name="nam" placeholder="Enter name" required/>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="mb-2">Email</label>
                        <input className="p-3 border rounded" type="email" name="email" placeholder="Enter email"required/>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="phone" className="mb-2">Comment</label>
                        <textarea className="p-3 border rounded" name="comment" rows="6" required></textarea>
                    </div>
                    <div>
                        <button className="py-3 px-8 bg-[#a40404] text-white font-semibold">Submit</button>
                    </div>
                </form>
            </div>
            <img className='sm:w-full md:w-5/12 bg-blend-lighten hover:bg-blend-darken pt-8' src={foodDelivery} alt={foodDelivery} />
        </div>
            <div className=" grid grid-cols-1 lg:grid-cols-4 py-8 gap-8 text-[black]">
                <BenefitCard icon={<WhereToVoteOutlinedIcon sx={{ fontSize: 60 }} color="error"/>} desc="Gurugram, Haryana India" />
                <BenefitCard icon={<EmailOutlinedIcon sx={{ fontSize: 60 }} color="error"/>} desc="support@swigato.com"/>
                <BenefitCard icon={<LocalPhoneOutlinedIcon sx={{ fontSize: 60 }} color="error"/>} desc="+91 7703987646"/>
                <BenefitCard icon={<QueryBuilderOutlinedIcon sx={{ fontSize: 60 }} color="error"/>} desc="Working Hours 24/7"/>
            </div>
        </div>
        </>
    )
}
export default Contact