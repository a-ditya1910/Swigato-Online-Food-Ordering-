import scooter from "../../assets/scooter-man.svg"
const Delivery = () => {
    return(
        <div className="mx-auto w-full max-w-screen-xl py-16 ">
            <div className="flex justify-between items-center bg-[#feffcb] p-8 rounded-xl">
                <div>
                    <p className="capitalize text-4xl font-extrabold">doorstep delivery</p>
                    <p className="text-2xl py-4 capitalize">We will deliver your tasty food at your doorstep</p>
                </div>
                <img src={scooter} alt={scooter} className="w-[250px] relative top-14 right-20" />
            </div>
        </div>
    )
}
export default Delivery