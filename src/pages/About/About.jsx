import PageHeader from "../Contact/PageHeader"
import Benefits from "./Benefits";
import Delivery from "./delievery";
import MostOrder from "./MostOrder";

const About = () => {
    return(
        <>
            <PageHeader title="About us"/>
            <div className="mx-auto w-full max-w-screen-xl">
                <p className="py-5 text-lg text-slate-500 text-justify lg:text-center lg:px-16 px-4">We build innovative products & solutions that deliver unparalleled convenience to urban consumers.
                    The best part? Every bit of your work at Foodbox will help elevate the lives of our users across India.
                </p>
                <Benefits />
            </div>
            <MostOrder/>
            <div className="shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] rounded-2xl sm:w-full lg:w-2/5 mx-auto p-8">
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
            <Delivery/>
        </>
    )
}

export default About